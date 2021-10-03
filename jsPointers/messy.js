var bob = 10
setVar("bob",100)
console.log(readVar("bob"))

function setVar(vName, number) {
    eval(`${vName} = ${number}`)
}

function readVar(vName) {
    return eval(vName)
}