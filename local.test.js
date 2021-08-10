const funct = require('./local');

it.concurrent('Should Check If Localhost:45454 is working', async () => {

    await funct.local();
    
},100000);