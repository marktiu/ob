// business logic

const utils = require('./utils.js')

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
function findClosestBenchmark(bond,lstBonds) {

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

module.exports = { 
    calculateSpread,
    findClosestBenchmark,
    filterBonds
}
