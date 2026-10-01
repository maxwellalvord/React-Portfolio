// End-to-end smoke test of the production build, run in headless Chrome.
//
//   npm run build && npm run test:e2e
//
// Serves ./build with the same headers firebase.json deploys (so CSP violations fail the run)
// and stubs EmailJS so no real email is ever sent. Set CHROME_PATH if Chrome lives elsewhere.
const fs = require('fs')
const http = require('http')
const path = require('path')
const puppeteer = require('puppeteer-core')
const firebase = require('../firebase.json')

const BUILD = path.join(__dirname, '..', 'build')
const PORT = 5055
const BASE = `http://localhost:${PORT}/`
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'

const results = []
const check = (name, ok, detail = '') => {
  results.push({ name, ok })
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail && !ok ? '  — ' + detail : ''}`)
}
const sleep = (ms) => new Promise(r => setTimeout(r, ms))

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.pdf': 'application/pdf', '.txt': 'text/plain'
}

// Minimal static server that applies firebase.json's header rules ("**" and "/prefix/**" sources).
const serve = (req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, BASE).pathname)
  let file = path.join(BUILD, urlPath)
  if (!file.startsWith(BUILD)) { res.writeHead(403); return res.end() }
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(BUILD, 'index.html')

  for (const { source, headers } of firebase.hosting.headers) {
    const prefix = source.replace(/\*\*$/, '')
    if (urlPath.startsWith(prefix)) headers.forEach(({ key, value }) => res.setHeader(key, value))
  }
  res.setHeader('Content-Type', MIME[path.extname(file).toLowerCase()] || 'application/octet-stream')
  fs.createReadStream(file).pipe(res)
}

;(async () => {
  const server = http.createServer(serve)
  await new Promise(r => server.listen(PORT, r))
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true })
  let emailMode = 'ok'
  let emailCalls = 0
  let expectErrors = false

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 900 })
    const consoleErrors = []
    const failedRequests = []
    page.on('console', m => { if (m.type() === 'error' && !expectErrors) consoleErrors.push(m.text()) })
    page.on('pageerror', e => consoleErrors.push(e.message))
    page.on('response', r => { if (r.status() >= 400 && r.url().startsWith(BASE)) failedRequests.push(`${r.status()} ${r.url()}`) })
    await page.evaluateOnNewDocument(() => {
      window.__cspViolations = []
      document.addEventListener('securitypolicyviolation', e => window.__cspViolations.push(`${e.violatedDirective}: ${e.blockedURI}`))
    })

    // Never send a real email: stub EmailJS.
    await page.setRequestInterception(true)
    page.on('request', req => {
      if (req.url().includes('api.emailjs.com')) {
        emailCalls++
        return req.respond({
          status: emailMode === 'ok' ? 200 : 500,
          contentType: 'text/plain',
          body: emailMode === 'ok' ? 'OK' : 'fail',
          headers: { 'access-control-allow-origin': '*' }
        })
      }
      req.continue()
    })

    const res = await page.goto(BASE, { waitUntil: 'networkidle0' })
    check('Security headers served', !!res.headers()['content-security-policy'] && res.headers()['x-content-type-options'] === 'nosniff')

    // Sections render
    const ids = ['about', 'experience', 'portfolio', 'process', 'homelab', 'contact']
    const missing = await page.evaluate(ids => ids.filter(id => !document.getElementById(id)), ids)
    check('All sections render', missing.length === 0, missing.join(','))
    const headings = await page.$$eval('section > h2', hs => hs.map(h => h.textContent))
    check('Section headings render', ['About Me', 'My Experience', 'Portfolio', 'How I Work', 'My Homelab', 'Contact Me'].every(h => headings.includes(h)), headings.join(', '))
    const skills = await page.$$eval('.experience__details', els => els.length)
    check('All 33 skills render', skills === 33, `found ${skills}`)

    // Typewriter animates
    // Sample across more than one pause (2s) so a fully typed word can't fool the check.
    const seen = new Set()
    for (let i = 0; i < 12; i++) {
      seen.add(await page.$eval('.typewriter', el => el.textContent))
      await sleep(250)
    }
    check('Typewriter text changes', seen.size > 1, [...seen].join(' / '))

    // Images load
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)) }
      window.scrollTo(0, 0)
    })
    await sleep(500)
    const brokenImgs = await page.$$eval('img', imgs => imgs.filter(i => i.complete && i.naturalWidth === 0).map(i => i.src))
    check('No broken images', brokenImgs.length === 0, brokenImgs.join(', '))

    // Nav: hash, scroll position, active link
    const navState = (n) => page.evaluate(n => ({
      hash: location.hash,
      y: Math.round(window.scrollY),
      target: n === 'home' ? 0 : Math.min(document.getElementById(n).offsetTop, document.documentElement.scrollHeight - innerHeight),
      active: document.querySelector('nav a.active')?.getAttribute('name')
    }), n)
    for (const name of ['about', 'experience', 'portfolio', 'process', 'contact', 'home']) {
      await page.click(`nav a[name="${name}"]`)
      await sleep(1100)
      const s = await navState(name)
      const expectHash = name === 'home' ? '' : `#${name}`
      check(`Nav "${name}" scrolls, sets hash and highlights`, s.hash === expectHash && Math.abs(s.y - s.target) < 5 && s.active === name, JSON.stringify(s))
    }

    // Rapid clicks: the last click wins, no tug-of-war between animations
    await page.click('nav a[name="contact"]')
    await sleep(150)
    await page.click('nav a[name="about"]')
    await sleep(1300)
    const rapid = await navState('about')
    check('Rapid nav clicks land on the last target', Math.abs(rapid.y - rapid.target) < 5 && rapid.active === 'about', JSON.stringify(rapid))

    // Manual scrolling updates the highlighted link
    await page.evaluate(() => window.scrollTo(0, document.getElementById('portfolio').offsetTop + 50))
    await sleep(300)
    const spy = await page.$eval('nav a.active', a => a.getAttribute('name'))
    check('Manual scroll updates active nav link', spy === 'portfolio', `active=${spy}`)

    // Case study dialog
    await page.evaluate(() => document.getElementById('portfolio').scrollIntoView())
    await sleep(800)
    const csButtons = await page.$$('#portfolio button.btn')
    check('Case Study buttons present', csButtons.length === 4, `found ${csButtons.length}`)
    await csButtons[0].click()
    await page.waitForSelector('[role="dialog"]', { timeout: 3000 })
    const dlg = await page.evaluate(() => ({
      focused: document.activeElement?.getAttribute('aria-label'),
      overflow: document.body.style.overflow,
      labelled: !!document.getElementById(document.querySelector('[role=dialog]').getAttribute('aria-labelledby'))
    }))
    check('Dialog opens, focuses close, locks scroll, is labelled', dlg.focused === 'Close case study' && dlg.overflow === 'hidden' && dlg.labelled, JSON.stringify(dlg))

    let escaped = false
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press('Tab')
      if (!(await page.evaluate(() => !!document.activeElement.closest('[role=dialog]')))) escaped = true
    }
    for (let i = 0; i < 8; i++) {
      await page.keyboard.down('Shift'); await page.keyboard.press('Tab'); await page.keyboard.up('Shift')
      if (!(await page.evaluate(() => !!document.activeElement.closest('[role=dialog]')))) escaped = true
    }
    check('Tab / Shift+Tab focus stays inside dialog', !escaped)

    await page.keyboard.press('Escape')
    await sleep(600)
    const closed = await page.evaluate(() => ({
      gone: !document.querySelector('[role="dialog"]'),
      overflow: document.body.style.overflow,
      focusText: document.activeElement?.textContent
    }))
    check('Escape closes dialog, restores scroll and focus', closed.gone && closed.overflow === '' && closed.focusText === 'Case Study', JSON.stringify(closed))

    await csButtons[1].click()
    await page.waitForSelector('[role="dialog"]')
    await sleep(400)
    await page.mouse.click(5, 450)
    await sleep(600)
    check('Backdrop click closes dialog', !(await page.$('[role="dialog"]')))

    // Links
    const unsafe = await page.$$eval('a[target="_blank"]', as => as.filter(a => !/noopener/.test(a.rel)).map(a => a.href))
    check('All target=_blank links have noopener', unsafe.length === 0, unsafe.join(', '))
    const socials = await page.$$eval('a[aria-label="LinkedIn"], a[aria-label="GitHub"]', as => as.map(a => a.href))
    check('Social links resolve from shared data', socials.length >= 4 && socials.every(h => h.startsWith('https://')), socials.join(', '))
    const cvHref = await page.$eval('a[download]', a => a.href)
    const cvType = await page.evaluate(async u => (await fetch(u)).headers.get('content-type'), cvHref)
    check('Resume PDF link resolves', /pdf/.test(cvType || ''), `${cvHref} (${cvType})`)

    // Contact form
    await page.evaluate(() => document.getElementById('contact').scrollIntoView())
    await page.click('#contact button[type=submit]')
    await sleep(200)
    check('Empty form blocked by validation', emailCalls === 0)

    const fill = async () => {
      await page.$eval('#contact form', f => f.reset())
      await page.type('input[name=name]', 'E2E Test')
      await page.type('input[name=email]', 'e2e@example.com')
      await page.type('textarea[name=message]', 'Automated test, stubbed, not sent.')
    }
    const statusText = () => page.$eval('.contact__status', el => el.textContent)

    const hpVisible = await page.$eval('input[name=website]', el => { const r = el.getBoundingClientRect(); return r.right > 0 && r.width > 1 })
    check('Honeypot field is hidden', !hpVisible)
    await fill()
    await page.$eval('input[name=website]', el => { el.value = 'spam.example' })
    await page.click('#contact button[type=submit]')
    await sleep(300)
    check('Honeypot submission is dropped silently', emailCalls === 0 && /Thanks/.test(await statusText()), `calls=${emailCalls}`)

    await fill()
    await page.click('#contact button[type=submit]')
    await page.waitForFunction(() => /Thanks/.test(document.querySelector('.contact__status').textContent), { timeout: 5000 }).catch(() => {})
    const okState = await page.evaluate(() => ({ msg: document.querySelector('.contact__status').textContent, nameVal: document.querySelector('input[name=name]').value }))
    check('Form success: sends once, shows thanks, resets', emailCalls === 1 && /Thanks/.test(okState.msg) && okState.nameVal === '', JSON.stringify({ ...okState, emailCalls }))

    emailMode = 'fail'
    expectErrors = true
    await fill()
    await page.click('#contact button[type=submit]')
    await page.waitForFunction(() => /Sorry/.test(document.querySelector('.contact__status').textContent), { timeout: 5000 }).catch(() => {})
    const errState = await page.evaluate(() => ({ msg: document.querySelector('.contact__status').textContent, nameVal: document.querySelector('input[name=name]').value, disabled: document.querySelector('#contact button[type=submit]').disabled }))
    check('Form error: shows error, keeps input, re-enables button', /Sorry/.test(errState.msg) && errState.nameVal === 'E2E Test' && !errState.disabled, JSON.stringify(errState))
    await sleep(200)
    expectErrors = false

    const csp = await page.evaluate(() => window.__cspViolations)
    check('No CSP violations', csp.length === 0, csp.join(' | '))

    // Mobile layout
    await page.setViewport({ width: 375, height: 800 })
    await page.goto(BASE, { waitUntil: 'networkidle0' })
    await sleep(800)
    const overflow = await page.evaluate(() => ({ scrollW: document.documentElement.scrollWidth, w: document.documentElement.clientWidth }))
    check('No horizontal scroll at 375px', overflow.scrollW <= overflow.w, JSON.stringify(overflow))

    // Reduced motion
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
    await page.goto(BASE, { waitUntil: 'networkidle0' })
    await sleep(300)
    const word = await page.$eval('.typewriter', el => el.textContent.replace('|', ''))
    check('Reduced motion: typewriter shows whole words', ['Fullstack Developer', 'Systems Engineer', 'AI Workflow Builder', 'Problem Solver'].includes(word), `"${word}"`)
    await page.click('nav a[name="contact"]')
    await sleep(100)
    const jumped = await navState('contact')
    check('Reduced motion: nav jumps without animating', Math.abs(jumped.y - jumped.target) < 5, JSON.stringify(jumped))

    const csp2 = await page.evaluate(() => window.__cspViolations)
    check('No CSP violations (reload)', csp2.length === 0, csp2.join(' | '))
    check('No unexpected console/page errors', consoleErrors.length === 0, consoleErrors.slice(0, 5).join(' | '))
    check('No failed local requests', failedRequests.length === 0, failedRequests.join(', '))
  } catch (e) {
    check('Test run crashed', false, e.stack)
  } finally {
    await browser.close()
    server.close()
    const failed = results.filter(r => !r.ok).length
    console.log(`\n${results.length - failed}/${results.length} passed`)
    process.exit(failed ? 1 : 0)
  }
})()
