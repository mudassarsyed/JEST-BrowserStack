const func = require('./parallel');

it.concurrent('Adding 3 With 3 should give 6', async () => {

    const value = await func.add(3,4);

    expect(parseInt(value)).toBe(7);

},100000);


it.concurrent('Subtracting 1 from 3 should give 2', async () => {

    const value = await func.subtract(3,1);

    expect(parseInt(value)).toBe(2);

},100000);


it.concurrent(' 4 times 4 should give 16', async () => {

    const value = await func.multiply(4,4);

    expect(parseInt(value)).toBe(16);

},100000);


it.concurrent('6 divided by 3 should give 2', async () => {

    const value = await func.divide(6,3);

    expect(parseInt(value)).toBe(2);

},100000);

