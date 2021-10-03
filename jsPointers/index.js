setup()

//example 1
var bob = 10
setVar({bob}, 20)

//An example using the library
var nico = [1,2,3]
firstTo0({nico})
console.log(nico)

//And now notice how you would need to do it conventionaly
nico = [1,2,3]
nico = firstTo0Normal(nico) //needs to copy the return value
console.log(nico)

function setVar(myVar, toValue) {
    globalExports = {toValue} //You need to export any private variables like this
    setByRef(myVar, myVar => {myVar += toValue}) /*
        (pointer,function) where the function must be...
        param => {do something}
        The parameter can be anything but there must be no parenthesis
    */
    console.log(atRef(myVar)) //Use this in order to get the value of it
}

function firstTo0(myArr) {
    console.log(myArr)
    setByRef(myArr, myArr => {myArr[0] = 0})
}

function firstTo0Normal(myArr) {
    myArr[0] = 0
    return myArr
}


//library


function checkPointer(v) {
    if (Object.keys(v).length == 1) {
        try {
            //eval(Object.keys(v)[0])
            if(Object.values(v)[0] == eval(Object.keys(v)[0])) {
                return true
            }
        } catch (e) { }
    }
    return false
}

function setByRef(pointer, setter) {
    if(checkPointer(pointer)) {
        var pName = Object.keys(pointer)[0]
        var par = setter.toString().slice(0,setter.toString().indexOf(" "))
        var re = new RegExp(par, 'g');
        var func = setter.toString().slice(setter.toString().indexOf("{") + 1, -1).replace(re, pName)
        //console.log(func)
        Object.keys(globalExports).forEach((el,ind) => {
            var find = el;
            var re = new RegExp(find, 'g');
            func = func.replace(re, Object.values(globalExports)[ind])
        })
        //console.log(func)
        eval(func)
    } else {
        throw new Error(`${pointer} is not a pointer`)
    }
}

function atRef(pointer) {
    return eval(Object.keys(pointer)[0])
}

function setup(){
    globalThis.globalExports = {}
}