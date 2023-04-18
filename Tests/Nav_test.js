const {By, Key, Builder, until} = require("selenium-webdriver");
require("chromedriver");

async function test_case(){
  let driver = await new Builder().forBrowser("chrome").build();

  await driver.get("http://localhost:3000/");

  const originalWindow = await driver.getWindowHandle();

  // await driver.findElement(By.name("name")).sendKeys("site running", Key.RETURN);

  await driver.findElement(By.className("scroll__down")).click();

  if (await driver.getCurrentUrl() === "http://localhost:3000/#contact") {
    console.log("successScroll");
    } else {
      console.log("FailureScroll");
    }

  await driver.findElement(By.name("about")).click();

  if (await driver.getCurrentUrl() === "http://localhost:3000/#about") {
    console.log("success1");
    } else {
      console.log("Failure1");
    }

  await driver.findElement(By.name("home")).click();
  
  if (await driver.getCurrentUrl() === "http://localhost:3000/#") {
    console.log("success2");
    } else {
      console.log("Failure2");
    }

  await driver.findElement(By.name("experience")).click();
  
  if (await driver.getCurrentUrl() === "http://localhost:3000/#experience") {
    console.log("success3");
    } else {
      console.log("Failure3");
    }

  await driver.findElement(By.name("portfolio")).click();
  
  if (await driver.getCurrentUrl() === "http://localhost:3000/#portfolio") {
    console.log("success4");
    } else {
      console.log("Failure4");
    }

  await driver.findElement(By.name("contact")).click();
  
  if (await driver.getCurrentUrl() === "http://localhost:3000/#contact") {
    console.log("success5");
    } else {
      console.log("Failure5");
    }

  await driver.findElement(By.name("linkedIn")).click();

  await driver.wait(
    async () => (await driver.getAllWindowHandles()).length === 2,
    10000
  );

  const windows = await driver.getAllWindowHandles();
  windows.forEach(async handle => {
    if (handle !== originalWindow) {
      await driver.switchTo().window(handle);
    }
  });

setInterval(async function link() {
  if (await driver.getCurrentUrl() === "https://www.linkedin.com/in/maxwellalvord/?original_referer=http%3A%2F%2Flocalhost%3A3000%2F") {
    console.log("successLink");
  } else {
    console.log("FailureLink");
  }
}, 5000);
 

  setInterval(() => {
    driver.quit();
  }, 6000);
}

test_case();