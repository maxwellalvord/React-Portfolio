import { useState, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

const useTypewriter = (words, typingSpeed = 75, deletingSpeed = 40, pauseTime = 2000) => {
  const reduceMotion = useReducedMotion()
  const [displayed, setDisplayed] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const word = words[wordIdx % words.length]

    // Reduced motion: show whole words and swap them, with no per-letter animation.
    if (reduceMotion) {
      setDisplayed(word)
      const t = setTimeout(() => setWordIdx(i => i + 1), pauseTime + 1000)
      return () => clearTimeout(t)
    }

    if (phase === 'typing') {
      if (displayed.length < word.length) {
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), typingSpeed)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('deleting'), pauseTime)
        return () => clearTimeout(t)
      }
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deletingSpeed)
        return () => clearTimeout(t)
      } else {
        setWordIdx(i => i + 1)
        setPhase('typing')
      }
    }
  }, [displayed, phase, wordIdx, words, typingSpeed, deletingSpeed, pauseTime, reduceMotion])

  return displayed
}

export default useTypewriter
