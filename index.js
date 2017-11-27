'use strict';

// YOU KNOW WHAT TO DO //
//copy all the functions you make in underpants in here, but use function instead of 
//then add documentation, as seen in the each documentation below:

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 * @return {undefined} Has no return value
 */
// function each(collection, action) {
//     if(Array.isArray(collection)) {
//         for(var i = 0; i < collection.length; i++) {
//             action(collection[i], i, collection);
//         }
//     } else {
//         for (var key in collection) {
//             action(collection[key], key, collection);
//         }
//     }
// }
// module.exports.each = each;//do this for all functions from underpants


/*
identity: returns exactly what is passed in as an argument

@param: {anything} anything: literally anything
@return: the same thing that was passed in for the parameter
*/
function identity(anything){
    return anything;
}

module.exports.identity = identity;


/*
typeOf: takes anything and returns its type in a string

@param: {anything} anything: literally takes anything
@return: string containing the type of the argument passed into the parameter
*/
function typeOf(anything){
    if(Array.isArray(anything)){
        return "array";
    }else if(anything instanceof Date){
        return "date";
    }else if(anything === null){
        return "null";
    }else{
        return (typeof anything)
    }
}

module.exports.typeOf = typeOf;


/*
first: takes an array and a number, returns a new array with the first <number> elements from the <array> parameter. 
If no number is givin or is not a number, returns the first element of the <array> parameter. If <number> is greater than length of <array>, returns the entire <array>

@param: {array} array: the array to loop over and take elements from
@param: {number} number: amount of elements considered from param <array>
@return: {array}: array containing the first <number> of elements from param <array>
*/
function first(array, number){
     if(!Array.isArray(array)){
        return [];
    }
    if(number === undefined || isNaN(number)){
        return array[0];
    }
    if(number > array.length){
        return array;
    }else if(number > 0){
        let newArray = [];
        for(let i = 0; i < number; i++){
            newArray.push(array[i]);
        }
        return newArray;
    }else{
        return [];
    }
    
}

module.exports.first = first;


/*
last: function designed to take the last <number> of elements from a given <array> and return them in a new array. 
Returns last element of <array> if <number> is not given or is not a number
Returns the entire <array> if if <number> exceeds the length of <array>

@param: {array} array: array to loop over and take elmeents from
@param: {number} number: number of elements from end of <array> in interest
@return: {array}: array containing last parameter <number> of elements from parameter <array>
*/
function last(array, number){
    var newArray = [];
    if(!Array.isArray(array)){
        return [];
    }
    if(number === undefined || isNaN(number)){
        return array[array.length - 1];
    }
    if(number > array.length){
        return array;
    }else if(number > 0){
        for(let i = array.length - (number); i < array.length; i++){
            newArray.push(array[i]);
        }
        return newArray;
    }else{
        return [];
    }
}

module.exports.last = last;


/*
each: loops over a given array and performs a given action on each of them

@param: {array or object} collection: collection to be looped over
@param {function} action: action to be perfomred on each element or value of <collection>
@return: none
*/
function each(collection, action){
    if(Array.isArray(collection)){
        for(let i = 0; i < collection.length; i++){
            action(collection[i], i, collection);
        }
    }else if(typeof collection === "object" && collection !== null && !(collection instanceof Date)){
        for(let key in collection){
            action(collection[key], key, collection);
        }
    }
}

module.exports.each = each;


/*
indexOf uses each to loop over each elmeent of an array in search of a given value. 
If found, it returns the first address of the value in the array. If not found, returns -1

@param: {array} array: array to loop over
@param: {any type} value: value to compare each element to in <array>
@return {number} index of first element in <array> that matches <value> or -1 if not found
*/
function indexOf(array, value){
    //below I used a for loop as per NEW instructions given to me
    for(let i = 0; i < array.length; i++){
        if(array[i] === value){
            return i;
        }
    }
    return -1;
    //below I used HOF as per OLD instructions that were originall given me
    // var indexHolder = [];
    // each(array, function(element, i, collection){
    //     if(element === value){
    //         indexHolder.push(i);
    //     }
    // })
    // if(indexHolder.length === 0){
    //     return -1;
    // }else{
    //     return indexHolder[0];
    // }
}

module.exports.indexOf = indexOf;


/*
filter: uses each to loop over a given array, performing a given action on each. 
These manipulated elements are added to a new array which is returned after all elements are looped over

@param: {array} array : array that looped over
@param {function} test: function applied to each element of <array>
@return {array: array containing all elements in parameter <array> that return true in <test>
*/
function filter(array, test){
    var newArray = [];
    
    each(array, function(element, i, collection){
        if(test(element, i, collection)){
            newArray.push(element);
        }
    }
        )
    // for(let i = 0; i < array.length; i++){
    //     if(action(array[i], i, array)){
    //         newArray.push(array[i]);
    //     }
    // }
    return newArray;
}
module.exports.filter = filter;


/*
reject: uses filter to return array of all elmeents in a given array that do not return true in a given function

@param: {array} array: the array to loop over
@param: {function} test: function called on each element that returns true or false 
@return: {array} array containing all elements in {array} that return false in {test}
*/
function reject(array, test){
    return(filter(array, function(value, i, array){
        if(!test(value, i, array)){
            return true;
        }
    }));
}

module.exports.reject = reject;


/*
partition: loops through a given array and performs a test on each element. Returns an array of two arrays. 
The first array contains all elements from given <array> for which <test> returns true.
The second array contains all elements from given <array> fro whcih <test> returns false.

@param: {array} array: array to loop over
@param: {function} test: test to perform on each elmenet of <array>, returns boolean value
@return: {array}: array of arrays, the first contianing values from <array> for which <test> returns true, the second contianing all other elemnts from <array>
*/
function partition(array, test){
    var arrTrue = [];
    var arrFalse = [];
    var arrFinal = [];
    each(array, function(element, i, collection){
        if(test(element)){
            arrTrue.push(element);
        }else{
            arrFalse.push(element);
        }
    })
    arrFinal.push(arrTrue, arrFalse);
    return arrFinal;
}

module.exports.partition = partition;


/*
unique: uses each and indexOf to loop over an array and save each unique element to a new array, and return it

@param: {array} array: the array to loop through
@return: {array} array containing every unique elmenet in <array>
*/
function unique(array){
    var uniqueArray = [];
    each(array, function(element, i, collection){
        if(i === indexOf(collection, element)){
            uniqueArray.push(element);
        }
    })
    return uniqueArray;
}

module.exports.unique = unique;


/*
map: loops over a given array, mutating each element using a given function and returns a new array with all the mutated elements

@param: {array or object} collection: collection to be looped over
@param: {function} action: action to mutate element of <collection>
@return: {array}: array containing each of the elments from parameter <array> mutated by parameter <action>
*/
function map(collection, action){
    var newArray = [];
    each(collection, function(value, access, collec){//consider renaming element and i
        newArray.push(action(value, access, collec));
    })
    return newArray;
}

module.exports.map = map;



/*
pluck: takes an array of objects and a property, returns a list of the values associated with the property from each object

@param: {array of objects} array: the array to iterate through
@param: {string} prop: the key to look for in each object
@return: {array}: array of values associeated with the <prop> of each object in the <array>
*/
function pluck(array, prop){
     return map(array, function(value, access, array){
        if(value.hasOwnProperty(prop)){
            return value[prop];
        }
    })
}

module.exports.pluck = pluck;


/*
contains: takes an array and a value, returns true if the <array> contains the <value> or false otherwise

@param: {array} array: array to iterate through
@param: {any type} value: value to check for in <array>
@return: {boolean}: true if <value> found in <array>, false otherwise
*/
function contains(array, value){
    return (indexOf(array, value) !== -1 ? true : false);
};

module.exports.contains = contains;


/*
every: takes a collection and an actions, returns true if actions returns true for every member of <collection>, returns false otherwise

@param: {array or object} coll: collection to iterate through
@param: {function} action: actions to test each member of <coll>
@return: {boolean}: true if action is true for every member of coll, false otherwise
*/
function every(coll, action){
    var myBool;
    if(typeof action === "function"){
        each(coll, function(value, address, collection){
            if(!action(value, address, collection)){
                myBool = false;
            }
        })
    }
    if(action === undefined){
        each(coll, function(value, address, collection){
            if(!value){
                myBool = false;
            }
        })
    }
    
    if(myBool === undefined){
        myBool = true;
    }
    return myBool;
    
}

module.exports.every = every;


/*
some: takes a collection and an actions, returns true if actions returns true for any member of <collection>, returns false otherwise

@param: {array or object} coll: collection to iterate through
@param: {function} action: actions to test each member of <coll>
@return: {boolean}: true if action is true for any member of coll, false otherwise

*/
function some(coll, action){
    var bool;
    if(typeof action === "function"){
          each(coll, function(value, address, coll){
            if(action(value, address, coll)){
                bool = true;
            }
        });
    }else{
        each(coll, function(value, address, coll){
            if(value){
                bool = true;
            }
        })
    }
  
    if(bool === undefined){
        bool = false;
    }
    return bool;
}

module.exports.some = some;


/*
reduce: takes an array, action, and seed. It iterates through the array calling the action, which reduces the collection in some way

@param: {array} array: collection to iterate through
@param: {function} action: action to reduce array, called on each element
@param: {many possible data types} seed: optional start point for reduce
@return: {many possible data types}, returned from the final call of <action> upon completion of the iteration
*/
var reduce = (coll, action, seed) => {
    each(coll, (e, i, a) => seed = seed !== undefined  ? action(seed, e, i, a) : e);
    return seed;
  
}

module.exports.reduce = reduce;


/*
extend: takes unspecified number of arguments, adds all properties from all objects to the first object using nested each calls

@param: {object} object: takes unspecified number objects, returns undefined if no arguments are given
@return: {object} the first object with all of the key values from every other object added to it
*/
function extend(objOne, objTwo){
     var args = Array.prototype.slice.call(arguments);
    var mainObj = args[0];
    args.splice(0, 1);
    each(args, function(obj, address, args){
        each(obj, function(newVal, newAddress, obj){
          mainObj[newAddress] = newVal;
        })
    })
    return mainObj;
}

module.exports.extend = extend;
return;

