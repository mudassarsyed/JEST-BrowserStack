const {Builder, By, Key, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');

async function add(x, y) {

        //Getting WebDriver Instance Through DriverFactory Function
        let driver = await driverfactory("Addition Test");

        //Going To Google
        await driver.get('http://www.google.com/ncr');

        //Locate SearchBar, Type Calculator And Click ENTER
        await driver.findElement(By.name('q')).sendKeys('calculator', Key.RETURN);

        //Pass 1st Parameter in Calculator and Click it
        let num1 =  await driver.findElement(By.xpath("//*[text()="+String(x)+"]"))
        //await num1.click();
        
        
        const actions = await driver.actions();
        await actions.click(num1);
        //*/

        //Find add Button and Click on it
        let addition =  await driver.findElement(By.xpath('//*[@id="rso"]/div[1]/div/div/div[1]/div/div/div[3]/div/table[2]/tbody/tr[5]/td[4]/div/div'));
        await addition.click();

        //Pass 2nd Parameter in Calculator and Click it
        let num2 =  await driver.findElement(By.xpath("//*[text()="+String(y)+"]"))
        await num2.click();

        //Click on equals button
        let equals = await driver.findElement(By.xpath('//*[@id="rso"]/div[1]/div/div/div[1]/div/div/div[3]/div/table[2]/tbody/tr[5]/td[3]/div/div'));
        await equals.click();

        //Fetch Result that is Generated
        let result = await (await driver.findElement(By.id('cwos'))).getText();

        
        await teardown(driver,"Addition");
        return result; 

}



async function subtract(x, y) {

        //Getting WebDriver Instance Through DriverFactory Function
        let driver = await driverfactory("Subtraction Test");

        //Going To Google
        await driver.get('http://www.google.com/ncr');

        //Locate SearchBar, Type Calculator And Click ENTER
        await driver.findElement(By.name('q')).sendKeys('calculator', Key.RETURN);

        //Pass 1st Parameter in Calculator and Click it
        let num1 =  await driver.findElement(By.xpath("//*[text()="+String(x)+"]"))
        await num1.click();

        //Find Subtract Button and Click on it
        let subtract =  await driver.findElement(By.xpath('//*[@id="rso"]/div[1]/div/div/div[1]/div/div/div[3]/div/table[2]/tbody/tr[4]/td[4]/div/div'));
        await subtract.click();

        //Pass 2nd Parameter in Calculator and Click it
        let num2 =  await driver.findElement(By.xpath("//*[text()="+String(y)+"]"))
        await num2.click();

        //Click on equals button
        let equals = await driver.findElement(By.xpath('//*[@id="rso"]/div[1]/div/div/div[1]/div/div/div[3]/div/table[2]/tbody/tr[5]/td[3]/div/div'));
        await equals.click();

        //Fetch Result that is Generated
        let result = await (await driver.findElement(By.id('cwos'))).getText();

        await teardown(driver,"Subtraction");
        return result; 

}


async function multiply(x, y) {

        //Getting WebDriver Instance Through DriverFactory Function
        let driver = await driverfactory("Multiplication Test");

        //Going To Google
        await driver.get('http://www.google.com/ncr');

        //Locate SearchBar, Type Calculator And Click ENTER
        await driver.findElement(By.name('q')).sendKeys('calculator', Key.RETURN); 

        //Pass 1st Parameter in Calculator and Click it
        let num1 =  await driver.findElement(By.xpath("//*[text()="+String(x)+"]"))
        await num1.click();

        //Find Multiply Button and Click on it
        let multiply =  await driver.findElement(By.xpath('//*[@id="rso"]/div[1]/div/div/div[1]/div/div/div[3]/div/table[2]/tbody/tr[3]/td[4]/div/div'));
        await multiply.click();

        //Pass 2nd Parameter in Calculator and Click it
        let num2 =  await driver.findElement(By.xpath("//*[text()="+String(y)+"]"))
        await num2.click();

        //Click on equals button
        let equals = await driver.findElement(By.xpath('//*[@id="rso"]/div[1]/div/div/div[1]/div/div/div[3]/div/table[2]/tbody/tr[5]/td[3]/div/div'));
        await equals.click();

        //Fetch Result that is Generated
        let result = await (await driver.findElement(By.id('cwos'))).getText();

        await teardown(driver,"Multiplication");
        return result; 

}


async function divide(x, y) {

        //Getting WebDriver Instance Through DriverFactory Function
        let driver = await driverfactory("Division Test");

        //Going To Google
        await driver.get('http://www.google.com/ncr');

        //Locate SearchBar, Type Calculator And Click ENTER
        await driver.findElement(By.name('q')).sendKeys('calculator', Key.RETURN);

        //Pass 1st Parameter in Calculator and Click it
        let num1 =  await driver.findElement(By.xpath("//*[text()="+String(x)+"]"))
        await num1.click();

        //Find Divide Button and Click on it
        let divide =  await driver.findElement(By.xpath('//*[@id="rso"]/div[1]/div/div/div[1]/div/div/div[3]/div/table[2]/tbody/tr[2]/td[4]/div/div'));
        await divide.click();

        //Pass 2nd Parameter in Calculator and Click it
        let num2 =  await driver.findElement(By.xpath("//*[text()="+String(y)+"]"))
        await num2.click();

        //Click on equals button
        let equals = await driver.findElement(By.xpath('//*[@id="rso"]/div[1]/div/div/div[1]/div/div/div[3]/div/table[2]/tbody/tr[5]/td[3]/div/div'));
        await equals.click();

        //Fetch Result that is Generated
        let result = await (await driver.findElement(By.id('cwos'))).getText();

        await teardown(driver, "Division"); 
        return result; 


}


async function driverfactory(x) {

    const capabilities = {
        'os' : 'Windows',
        'browserName' : 'Chrome',
        'name': x, // test name
        'build': 'JEST+SELENIUM' // CI/CD job or build name
       }
         let driver = new webdriver.Builder()
           .usingServer('http://BROWSERSTACK_USERNAME:BROWSERSTACK_ACCESSKEY@hub-cloud.browserstack.com/wd/hub')
           .withCapabilities(capabilities)
           .build();
       return driver;

}


async function teardown(driver,reason){

    let teststatus = reason + " was successful"
    await driver.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason":"'+teststatus+'"}}'
      );

    driver.quit();

}


module.exports = {
    subtract,
    multiply,
    add,
    divide
}
