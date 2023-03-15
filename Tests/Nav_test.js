const {By, Key, Builder} = require("selenium-webdriver");
require("chromedriver");

async function test_case(){
  let driver = await new Builder().forBrowser("chrome").build();

  await driver.get("http://localhost:3000/");

  // await driver.findElement(By.name("name")).sendKeys("site running", Key.RETURN);

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

  setInterval(() => {
    driver.quit();
  }, 100000);
}

test_case();