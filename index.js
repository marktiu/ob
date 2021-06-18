//const input = require('./sample_input.json')
const fs = require('fs')
const utils = require('./utils.js')
const ctrl = require('./controllers')

var corpBond = []
var govBond = []
var result =[]

function main() {

    // print process.argv
    inputfile = process.argv[2]
    outputfile = process.argv[3]

    if(!inputfile){
        console.log("no input")
        return
    }

    var input = JSON.parse(fs.readFileSync(inputfile))

    corpBond = ctrl.filterBonds(input.data,'corporate')
    govBond = ctrl.filterBonds(input.data, 'government')

    //build new list of results
    for(var i=0;i < corpBond.length;i++){

        if(!utils.bondValid(corpBond[i])) continue

        var output = {}
        benchmark = ctrl.findClosestBenchmark(corpBond[i],govBond)

        //take some data from the benchmark
        output.corporate_bond_id = corpBond[i].id
        output.government_bond_id = benchmark.id
        output.spread_to_benchmark = benchmark.spread_to_benchmark + " bps"

        result.push(output)
    }

    //output json to stdout
    console.log({"data": result})
}

main()
