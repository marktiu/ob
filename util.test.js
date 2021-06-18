const utils = require('./utils.js')

test('same output',()=>{
    expect(utils.sanitize("123")).toBe("123")
})

test('no chars filtered',()=>{
    expect(utils.sanitize("123a")).toBe("123")
})

test('special chars filtered',()=>{
    expect(utils.sanitize("123#")).toBe("123")
})

test('special chars & alpha filtered',()=>{
    expect(utils.sanitize("123#")).toBe("123")
})