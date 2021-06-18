const testdata = require('./sample_input.json')
const utils = require('./utils.js')
const ctrl = require('./controllers.js')

const base = 
    {
        "id": "c1",
        "type": "corporate",
        "tenor": "10.3",
        "yield": "5.30",
        "amount_outstanding": 1200000
    }


const expected = {
"amount_outstanding": 2500000, 
"gov_bond": "g1", 
"id": "g1", 
"spread_to_benchmark": 160, 
"tenor": "9.4", 
"type": "government", 
"yield": "3.70"}

const bond_list = [
            {
                "id": "g1",
                "type": "government",
                "tenor": "9.4",
                "yield": "3.70",
                "amount_outstanding": 2500000
            },
            {
                "id": "g2",
                "type": "government",
                "tenor": "12.0",
                "yield": "4.80",
                "amount_outstanding": 1750000
            }
        ]

test('happy path bond data',()=>{
    expect(ctrl.findClosestBenchmark(base,bond_list) ).toStrictEqual(expected)
})