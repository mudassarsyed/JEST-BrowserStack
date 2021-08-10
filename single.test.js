const func3 = require('./single');

it.concurrent('Adding 3 With 3 should give 6', async () => {

    const value = await func3.SingleTestAddition(3,4);

    expect(parseInt(value)).toBe(7);

},100000);