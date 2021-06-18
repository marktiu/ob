const input = require('./sample_input.json')
const utils = require('./utils.js')

var corpBond = []
var govBond = []
var result =[]

function main() {

    // print process.argv
    process.argv.forEach((val, index) => {
        console.log(`${index}: ${val}`);
    });


    corpBond = filterBonds(input.data,'corporate')
    govBond = filterBonds(input.data, 'government')

    //build new list of results
    for(var i=0;i < corpBond.length;i++){

        if(!utils.bondValid(corpBond[i])) continue

        var output = {}
        benchmark = findClosestBenchmark(corpBond[i],govBond)

        //take some data from the benchmark
        output.corporate_bond_id = corpBond[i].id
        output.government_bond_id = benchmark.id
        output.spread_to_benchmark = benchmark.spread_to_benchmark + " bps"

        result.push({"data": output})
    }

    console.log(result)
}

function filterBonds(lstBonds,type){

    var newList = []

    for(var i=0; i < lstBonds.length;i++) {
        
        if(lstBonds[i].type === type){
            //sanitize input, drop any character
            lstBonds[i].tenor = utils.sanitize(lstBonds[i].tenor)

            newList.push(lstBonds[i])
        }
    }

    return newList
}

//find closes corporate bond to it's gov bond benchmark
function findClosestBenchmark(bond,lstBonds){

    let closest = lstBonds[0]
    closest.spread_to_benchmark = calculateSpread(bond,lstBonds[0])
    closest.gov_bond = lstBonds[0].id

    for(i=0;i<lstBonds.length;i++) {
        //compare who has shortest term, take the one w/ the shorter term
        if(Math.abs(bond.tenor - lstBonds[i].tenor) <= Math.abs(bond.tenor - closest.tenor)) {
            //pick the one that has greater outstanding if the tenors are equal
            if(closest.amount_outstanding < lstBonds[i].amount_outstanding) {
                closest = lstBonds[i]
                closest.gov_bond = lstBonds[i].id
                closest.spread_to_benchmark = calculateSpread(bond,closest)    
            }
        }

    }

    return closest
}

function calculateSpread(corpBond,govBond) {
    return Math.ceil((parseFloat(corpBond.yield) - parseFloat(govBond.yield)) * 100)
}

main()