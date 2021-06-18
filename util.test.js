const utils = require('./utils.js')

test('no chars',()=>{
    expect(utils.sanitize("123")).toBe("123")
})