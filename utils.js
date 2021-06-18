function sanitize(str) { 
    return str.replace(/[^\d.-]/g, '') 
}

function bondValid(bond){
    //add more sanity checking if necessary
    return bond.yield !== null
}

module.exports = {
    sanitize: sanitize,
    bondValid: bondValid
}