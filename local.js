const {Builder, By, Key, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const browserstack = require('browserstack-local');


async function local() {

  // Creates an instance of Local
  const bs_local = new browserstack.Local()

  // You can also set an environment variable - "BROWSERSTACK_ACCESS_KEY".
  const bs_local_args = { key: 'BROWSERSTACK_ACCESSKEY' }

  // Starts the Local instance with the required arguments
  bs_local.start(bs_local_args, function () {
    console.log('Started BrowserStackLocal')
  })
        
  await sleep(5000);

  let driver = await driverfactory1('Local Test')

  await driver.get('http://localhost:3000/');

  await sleep(10000);

  
  await teardown(driver, 'Local Test', bs_local)
  // Your test code goes here, from creating the driver instance till the end, i.e. driver.quit
  // Stop the Local instance after your test run is completed, i.e after driver.quit
  /*
  await driver.quit()

  bs_local.stop(function () {
    console.log('Stopped BrowserStackLocal')
  });
  */
    
}

async function driverfactory1(x) {

    const capabilities = {
        'os' : 'Windows',
        'browserName' : 'Chrome',
        'name': x, // test name
        'build': 'JEST+SELENIUM', // CI/CD job or build name
        'browserstack.local': 'true'
       }
    let driver = new webdriver.Builder()
        .usingServer('http://BROWSERSTACK_USERNAME:BROWSERSTACK_ACCESSKEY@hub-cloud.browserstack.com/wd/hub')
        .withCapabilities(capabilities)
        .build();
    return driver;

}


async function teardown(driver,reason,bs_local){

  let teststatus = reason + " was successful"
  await driver.executeScript(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason":"'+teststatus+'"}}'
    );

  await driver.quit();
  await bs_local.stop(function () {
  });

}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}  

module.exports = {
    local
}