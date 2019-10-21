// Type JavaScript here and click "Run Code" or press Ctrl + s
console.log('Hello, world!');


// ##########################
// # Higher-Order Functions #
// ##########################


// Challenge 1
// Create a function addTwo that accepts one input and adds 2 to it.
const addTwo = (num) => num + 2
  // To check if you've completed this function, uncomment these console.logs!
  console.log(addTwo(3));
  console.log(addTwo(10));

// Challenge 2
// Create a function addS that accepts one input and adds an "s" to it.
  const addS = (word) => [...word, 's'].join('')
  // Uncomment these to check your work
  console.log(addS('pizza'));
  console.log(addS('bagel'));

/* Challenge 3
Create a function called map that takes two inputs:
1 an array of numbers (a list of numbers)
2 a 'callback' function - a function that is applied to each element of the
 array (inside of the function 'map')
Have map return a new array filled with numbers that are the result of using the 'callback' function on each element of the input array.
 */
const map = (array, callback) => {
  let arr = []
  for(let i = 0; i <array.length; i++) {
    arr.push(callback(array[i]))
  }
  return arr
};
console.log(map([1, 2, 3], addTwo));


// Challenge 4
// The function forEach takes an array and a callback, and runs the callback on each element of the array. forEach does not return anything.
const forEach = (array, callback) => {
  const arr =[]
  for(let i = 0; i <array.length; i++) {
    arr.push(callback(array[i]))
  }
  console.log(arr )
};
// See for yourself if your forEach works!
forEach(['pizza', 'salmon', 'bagel'], addS);


// Challenge 5
// For this challenge, you're going to rebuild map as mapWith. This time you're going to use forEach inside of mapWith instead of using a for loop.
const mapWith = (array, callback) => {
  const arr = []
  array.forEach((elm) => arr.push(callback(elm)))
  return arr
};
console.log(mapWith([10, 20, 30], addTwo))

/*  Challenge 6
The function reduce takes an array and reduces the elements to a single value.
For example it can sum all the numbers, multiply them, or any operation that you can put into a function.
Here's how it works. The function has an "accumulator value" which starts as the initialValue and accumulates the output of each loop.
The array is iterated over, passing the accumulator and the next array element as arguments to the callback.
The callback's return value becomes the new accumulator value.
The next loop executes with this new accumulator value.
In the example above, the accumulator begins at 0. add(0,4) is called.
The accumulator's value is now 4. Then add(4, 1) to make it 5.
Finally add(5, 3) brings it to 8, which is returned.
 */

const reduce = (array, callback, initialValue) => {
  for(let i = 0; i<array.length; i ++) {
    initialValue = callback(initialValue, array[i])
  }
  return initialValue
};
const add = (a, b) => a+b
console.log(reduce([10, 20, 30], add, 0)) // should log: 60

// Challenge 7
// Construct a function intersection that compares input arrays and returns a new array with elements found in all of the inputs. BONUS: Use reduce!
const intersection = (arrays) => arrays.reduce((acc, curr) => {
  let count = 0
  for(let i = 0; i < curr.length; i++) {
    for(let j = 0; j < arrays.length; j++) {
      for(let x = 0; x < arrays[j].length; x++) {
        if(curr[i] === arrays[j][x]) count ++
      }
    }
    if(count === 3 && !acc.includes(curr[i])) acc.push(curr[i])
    count = 0
  }
  return acc
}, [])
console.log(intersection([[5, 10, 15, 20], [15, 88, 1, 5, 7], [1, 10, 15, 5, 20]]));
// should log: [5, 15]

/* Challenge 8
 Construct a function union that compares input arrays and returns a new
  array that contains all elements.
  If there are duplicate elements, only add it once to the new array.
  Preserve the order of the elements starting from the first element of the first input array. BONUS: Use reduce!
 */

const union = (arrays) => arrays.reduce((acc, curr) => {
  for(let i = 0; i < curr.length; i++) {
    for(let j = 0; j < arrays.length; j++) {
      for(let x = 0; x < arrays[j].length; x++) {
        if(!acc.includes(curr[i])) acc.push(curr[i])
      }
    }
  }
  return acc
}, [])

console.log(union([[5, 10, 15], [15, 88, 1, 5, 7], [100, 15, 10, 1, 5]]));
// should log: [5, 10, 15, 88, 1, 7, 100]

/* Challenge 9
Construct a function objOfMatches that accepts two arrays and a callback.
objOfMatches will build an object and return it.
To build the object, objOfMatches will test each element of the first array using
the callback to see if the output matches the corresponding element (by index) of the second array.
If there is a match, the element from the first array becomes a key in an object,
and the element from the second array becomes the corresponding value.
 */
const objOfMatches = (array1, array2, callback) => array1.reduce((acc, curr) => {
  for(let i =0; i <array2.length; i++) {
    if(callback(curr) === array2[i]) acc[curr] = array2[i]
  }
  return acc
}, {})
console.log(objOfMatches(['hi', 'howdy', 'bye', 'later', 'hello'], ['HI', 'Howdy', 'BYE', 'LATER', 'hello'], (str) => str.toUpperCase()));
// should log: { hi: 'HI', bye: 'BYE', later: 'LATER' }

/* Challenge 10
Construct a function multiMap that will accept two arrays: an array of values and an array of callbacks.
multiMap will return an object whose keys match the elements in the array of values.
The corresponding values that are assigned to the keys will be arrays consisting of outputs from the array of callbacks,
where the input to each callback is the key.
 */
const multiMap = (arrVals, arrCallbacks) => arrVals.reduce((acc, curr) => {
  acc[curr] = arrCallbacks.reduce((acc2, curr2) => {
    acc2.push(curr2(curr))
    return acc2
  }, [])
  return acc
}, {})
console.log(multiMap(['catfood', 'glue', 'beer'],
  [(str) => str.toUpperCase(), (str) => str[0].toUpperCase() + str.slice(1).toLowerCase(), (str) => str + str]));
// should log: { catfood: ['CATFOOD', 'Catfood', 'catfoodcatfood'], glue: ['GLUE', 'Glue', 'glueglue'], beer: ['BEER', 'Beer', 'beerbeer'] }

/* Challenge 11
Create a function commutative that accepts two callbacks and a value.
commutative will return a boolean indicating if the passing the value into the first function,
and then passing the resulting output into the second function,
yields the same output as the same operation with the order of the functions reversed
(passing the value into the second function, and then passing the output into the first function).
 */
const commutative = (func1, func2, value) => (func2(func1(value)) === func1(func2(value)))

// /*** Uncomment these to check your work! ***/
const multBy3 = n => n * 3;
const divBy4 = n => n / 4;
const subtract5 = n => n - 5;
console.log(commutative(multBy3, divBy4, 11)); // should log: true
console.log(commutative(multBy3, subtract5, 10)); // should log: false
console.log(commutative(divBy4, subtract5, 48)); // should log: false

/* Challenge 12
Create a function objFilter that accepts an object and a callback.
objFilter should make a new object, and then iterate through the passed-in object,
using each key as input for the callback.
If the output from the callback is equal to the corresponding value, then that key-value pair is copied into the new object.
objFilter will return this new object.
 */
const objFilter = (obj, callback) => {
  const newObj = {}
  for(let key in obj) {
    if(callback(key) === obj[key])
      newObj[key] = obj[key]
  }
  return newObj
};
// /*** Uncomment these to check your work! ***/
const startingObj = {};
startingObj[6] = 3;
startingObj[2] = 1;
startingObj[12] = 4;
const half = n => n / 2;
console.log(objFilter(startingObj, half)); // should log: { 2: 1, 6: 3 }

/* Challenge 13
Create a function rating that accepts an array (of functions) and a value.
All the functions in the array will return true or false.
rating should return the percentage of functions from the array that return true when the value is used as input.
 */
const rating = (arrOfFuncs, value) => arrOfFuncs.reduce((acc, curr) => {
  if(!curr(value)) acc = acc - (acc/arrOfFuncs.length)
  return acc
}, 100)
// /*** Uncomment these to check your work! ***/
const isEven = n => n % 2 === 0;
const greaterThanFour = n => n > 4;
const isSquare = n => Math.sqrt(n) % 1 === 0;
const hasSix = n => n.toString().includes('6');
const checks = [isEven, greaterThanFour, isSquare, hasSix];
console.log(rating(checks, 64)); // should log: 100
console.log(rating(checks, 66)); // should log: 75

/* Challenge 14
Create a function pipe that accepts an array (of functions) and a value.
pipe should input the value into the first function in the array,
and then use the output from that function as input for the second function,
and then use the output from that function as input for the third function, and so forth,
until we have an output from the last function in the array. pipe should return the final output.
 */
const pipe = (arrOfFuncs, value) => arrOfFuncs.reduce((acc, curr) => {
  acc = curr(acc)
  return acc
}, value)
// /*** Uncomment these to check your work! ***/
const capitalize = str => str.toUpperCase();
const addLowerCase = str => str + str.toLowerCase();
const repeat = str => str + str;
const capAddlowRepeat = [capitalize, addLowerCase, repeat];
console.log(pipe(capAddlowRepeat, 'cat')); // should log: 'CATcatCATcat'

/*  Challenge 15
Create a function highestFunc that accepts an object (which will contain functions) and a subject (which is any value).
highestFunc should return the key of the object whose associated value
(which will be a function) returns the largest number, when the subject is given as input.
 */
const highestFunc = (objOfFuncs, subject) => {
  let result = 0
  let method
  for(let key in objOfFuncs ) {
    if(objOfFuncs[key](subject) > result) {
      result = objOfFuncs[key](subject)
      method = key
    }
  }
  return method
};
// /*** Uncomment these to check your work! ***/
const groupOfFuncs = {};
groupOfFuncs.double = n => n * 2;
groupOfFuncs.addTen = n => n + 10;
groupOfFuncs.inverse = n => n * -1;
console.log(highestFunc(groupOfFuncs, 5)); // should log: 'addTen'
console.log(highestFunc(groupOfFuncs, 11)); // should log: 'double'
console.log(highestFunc(groupOfFuncs, -20)); // should log: 'inverse'

// ###########
// # Closure #
// ###########

// Challenge 1
// Create a function createFunction that creates and returns a function. When that created function is called, it should print "hello".
const createFunction = () => {
  const hello = () => {console.log('hello')}
  return hello
};
const function1 = createFunction();
function1();

// Challenge 2
//Create a function createFunctionPrinter that accepts one input and returns a function.
// When that created function is called, it should print out the input that was used when the function was created.
const createFunctionPrinter = (input) => {
  const print = () => {console.log(input)}
  return print
};
const printSample = createFunctionPrinter('sample');
printSample();
const printHello = createFunctionPrinter('hello');
printHello();


// Challenge 3
// Examine the code for the outer function.
// Notice that we are returning a function and that function is using variables that are outside of its scope.
// Uncomment those lines of code. Try to deduce the output before executing.
const outer = () => {
  let counter = 0; // this variable is outside incrementCounter's scope
  const incrementCounter = () => {
    counter++;
    console.log('counter', counter);
  }
  return incrementCounter;
};
const willCounter = outer();
const jasCounter = outer();
willCounter(); //1
willCounter(); //2
willCounter(); //3

jasCounter(); //1
willCounter(); //4


// Challenge 4
// Now we are going to create a function addByX that returns a function that will add an input by x.
const addByX = (x) => {
  const add = (num) => {
    return x + num
  }
  return add
};
const addByTwo = addByX(2);
// now call addByTwo with an input of 1
console.log(addByTwo(1))
// now call addByTwo with an input of 2
console.log(addByTwo(2))
const addByThree = addByX(3);
console.log(addByThree(1)); //should return 4
console.log(addByThree(2)); //should return 5
const addByFour = addByX(4);
console.log(addByFour(4)); //should return 8
console.log(addByFour(10)); //should return 14

/* Challenge 5
  Write a function once that accepts a callback as input and returns a function.
  When the returned function is called the first time, it should call the callback and return that output.
  If it is called any additional times, instead of calling the callback again it will simply return the output value from the first time it was called.
 */
const once = (func) => {
  let count = 0
  let firstResult
  const runFunc = (input) => {
    count++
    if(count === 1) {
      firstResult = func(input)
      return func(input)
    } else {
      return firstResult
    }
  }
  return runFunc
};

const onceFunc = once(addByTwo);
// UNCOMMENT THESE TO TEST YOUR WORK!
console.log(onceFunc(4));  //should log 6
console.log(onceFunc(10));  //should log 6
console.log(onceFunc(9001));  //should log 6


// Challenge 6
// Write a function after that takes the number of times the callback needs
// to be called before being executed as the first parameter and the callback as the second parameter.
const after = (count, func) => {
  let counter = 0
  const inner = () => {
    counter++
    if(counter === count) {
      return func()
    }
  }
  return inner
};
const called = () => console.log('hello');
const afterCalled = after(3, called);

afterCalled(); // -> nothing is printed
afterCalled(); // -> nothing is printed
afterCalled(); // -> 'hello' is printed

// Challenge 7
// Write a function delay that accepts a callback as the first parameter and
// the wait in milliseconds before allowing the callback to be invoked as the second parameter.
// Any additional arguments after wait are provided to func when it is invoked. HINT: research setTimeout();
const delay = (func, wait) => {
  const later = setTimeout(() => {
    return func()
  }, wait)
  return later
};

const sayHi = () => console.log('Hi!!!')
const sayHiLater = delay(sayHi, 2000)

/* Challenge 8
  Create a function russianRoulette that accepts a number (let us call it n),
  and returns a function. The returned function will take no arguments,
  and will return the string 'click' the first n - 1 number of times it is invoked.
  On the very next invocation (the nth invocation), the returned function will return the string 'bang'.
  On every invocation after that, the returned function returns the string 'reload to play again'.
 */
const russianRoulette = (num) => {
  let counter = 1
  const innerFunc = () => {
    if( counter > num) {
      return 'reload to play again'
    } else {
      counter++
      if(counter < num) return 'click'
      if(counter === num) return 'bang'
    }
  }
  return innerFunc
};
// /*** Uncomment these to check your work! ***/
const play = russianRoulette(3);
console.log(play()); // should log: 'click'
console.log(play()); // should log: 'click'
console.log(play()); // should log: 'bang'
console.log(play()); // should log: 'reload to play again'
console.log(play()); // should log: 'reload to play again'

/* Challenge 9
  Create a function average that accepts no arguments, and returns a function
  (that will accept either a number as its lone argument, or no arguments at all).
  When the returned function is invoked with a number, the output should be
  average of all the numbers have ever been passed into that function
  (duplicate numbers count just like any other number).
  When the returned function is invoked with no arguments, the current average is outputted.
  If the returned function is invoked with no arguments before any numbers are passed in, then it should return 0.
 */
const average = () => {
  let numList = []
  const calc = (arr) => arr.reduce((acc, val) => {
    acc = acc + val
    return acc
  }, 0)

  const innerFunc = (num) => {
    if(!num && numList.length === 0) return 0
    if(num) numList.push(num)
    return calc(numList) / numList.length
  }
  return innerFunc
};

// /*** Uncomment these to check your work! ***/
const avgSoFar = average();
console.log(avgSoFar()); // should log: 0
console.log(avgSoFar(4)); // should log: 4
console.log(avgSoFar(8)); // should log: 6
console.log(avgSoFar()); // should log: 6
console.log(avgSoFar(12)); // should log: 8
console.log(avgSoFar()); // should log: 8

/* Challenge 10
  Create a function makeFuncTester that accepts an array (of two-element sub-arrays),
  and returns a function (that will accept a callback).
  The returned function should return true if the first elements (of each sub-array)
  being passed into the callback all yield the corresponding second elements (of the same sub-array).
  Otherwise, the returned function should return false.
 */
const makeFuncTester = (arrOfTests) => {
  const innerFunc = (func) => {
    for(let i = 0; i < arrOfTests.length; i++) {
      if(func(arrOfTests[i][0]) === arrOfTests[i][1]) return true
      return false
    }
  }
  return innerFunc
};

// /*** Uncomment these to check your work! ***/
const capLastTestCases = [];
capLastTestCases.push(['hello', 'hellO']);
capLastTestCases.push(['goodbye', 'goodbyE']);
capLastTestCases.push(['howdy', 'howdY']);
const shouldCapitalizeLast = makeFuncTester(capLastTestCases);
const capLastAttempt1 = str => str.toUpperCase();
const capLastAttempt2 = str => str.slice(0, -1) + str.slice(-1).toUpperCase();
console.log(shouldCapitalizeLast(capLastAttempt1)); // should log: false
console.log(shouldCapitalizeLast(capLastAttempt2)); // should log: true

/* Challenge 11
  Create a function makeHistory that accepts a number (which will serve as a limit),
  and returns a function (that will accept a string).
  The returned function will save a history of the most recent "limit"
  number of strings passed into the returned function (one per invocation only).
  Every time a string is passed into the function, the function should return
  that same string with the word 'done' after it (separated by a space).
  However, if the string 'undo' is passed into the function,
  then the function should delete the last action saved in the history,
  and return that delted string with the word 'undone' after (separated by a space).
  If 'undo' is passed into the function and the function's history is empty,
  then the function should return the string 'nothing to undo'.
 */
const makeHistory = (limit) => {
  let history = []
  const innerFunc = (string) => {
    if(string === 'undo') {
      if(history.length === 0) return 'nothing to undo'
      const last = history.pop()
      return `${last} undone`
    }
    if(history.length < limit && string !== 'undo' ) {
      history.push(string)
    }
    return `${string} done`
  }
  return innerFunc
};

// /*** Uncomment these to check your work! ***/
const myActions = makeHistory(2);
console.log(myActions('jump')); // should log: 'jump done'
console.log(myActions('undo')); // should log: 'jump undone'
console.log(myActions('walk')); // should log: 'walk done'
console.log(myActions('code')); // should log: 'code done'
console.log(myActions('pose')); // should log: 'pose done'
console.log(myActions('undo')); // should log: 'pose undone'
console.log(myActions('undo')); // should log: 'code undone'
console.log(myActions('undo')); // should log: 'nothing to undo'


// Challenge 12
/*
Inspect the commented out test cases carefully if you need help to understand these instructions.
Create a function blackjack that accepts an array (which will contain numbers ranging from 1 through 11), and returns a DEALER function.
The DEALER function will take two arguments (both numbers), and then return yet ANOTHER function, which we will call the PLAYER function.
On the FIRST invocation of the PLAYER function, it will return the sum of the two numbers passed into the DEALER function.
On the SECOND invocation of the PLAYER function, it will return either:
the first number in the array that was passed into blackjack PLUS the sum of the two numbers passed in as arguments into the DEALER function,
IF that sum is 21 or below, OR
the string 'bust' if that sum is over 21.
If it is 'bust', then every invocation of the PLAYER function AFTER THAT will return the string 'you are done!'
(but unlike 'bust', the 'you are done!' output will NOT use a number in the array).
If it is NOT 'bust', then the next invocation of the PLAYER function will return either:
the most recent sum plus the next number in the array (a new sum) if that new sum is 21 or less, OR
the string 'bust' if the new sum is over 21.
And again, if it is 'bust', then every subsequent invocation of the PLAYER function will return the string 'you are done!'.
Otherwise, it can continue on to give the next sum with the next number in the array, and so forth.
You may assume that the given array is long enough to give a 'bust' before running out of numbers.
BONUS: Implement blackjack so the DEALER function can return more PLAYER functions
that will each continue to take the next number in the array after the previous PLAYER function left off.
You will just need to make sure the array has enough numbers for all the PLAYER functions.
 */
const blackjack = (array) => {
  const dealer = (num1, num2) => {
    let playerCall = 0
    let hand
    const player = () => {
      if(hand >= 21) return 'you are done!'
      hand = (playerCall === 0) ? num1 + num2 : hand + array.shift()
      playerCall++
      return (hand > 21)? 'bust' : hand
    }
    return player
  }
  return dealer
};

// /*** DEALER ***/
const deal = blackjack([2, 6, 1, 7, 11, 4, 6, 3, 9, 8, 9, 3, 10, 4, 5, 3, 7, 4, 9, 6, 10, 11]);
// /*** PLAYER 1 ***/
const i_like_to_live_dangerously = deal(4, 5);
console.log(i_like_to_live_dangerously()); // should log: 9
console.log(i_like_to_live_dangerously()); // should log: 11
console.log(i_like_to_live_dangerously()); // should log: 17
console.log(i_like_to_live_dangerously()); // should log: 18
console.log(i_like_to_live_dangerously()); // should log: 'bust'
console.log(i_like_to_live_dangerously()); // should log: 'you are done!'
console.log(i_like_to_live_dangerously()); // should log: 'you are done!'
// /*** PLAYER 2 ***/
const i_TOO_like_to_live_dangerously = deal(2, 2);
console.log(i_TOO_like_to_live_dangerously()); // should log: 4
console.log(i_TOO_like_to_live_dangerously()); // should log: 15
console.log(i_TOO_like_to_live_dangerously()); // should log: 19
console.log(i_TOO_like_to_live_dangerously()); // should log: 'bust'
console.log(i_TOO_like_to_live_dangerously()); // should log: 'you are done!
console.log(i_TOO_like_to_live_dangerously()); // should log: 'you are done!
// /*** PLAYER 3 ***/
const i_ALSO_like_to_live_dangerously = deal(3, 7);
console.log(i_ALSO_like_to_live_dangerously()); // should log: 10
console.log(i_ALSO_like_to_live_dangerously()); // should log: 13
console.log(i_ALSO_like_to_live_dangerously()); // should log: 'bust'
console.log(i_ALSO_like_to_live_dangerously()); // should log: 'you are done!
console.log(i_ALSO_like_to_live_dangerously()); // should log: 'you are done!

// ##########################
// # Extension Challenges   #
// ##########################

/* Challenge 1
  Create a function functionValidator that accepts an array of functions and two different values
  (let's call them input and output).
  This function should return a new array containing *only* the functions from the original array that,
  when invoked with input, return the value output. Use reduce!
 */
const functionValidator = (funcArr, input, output) => {

}

// const addFive = num => num + 5;
// const multiplyByTwo = num => num * 2;
// const subtractOne = num => num - 1;
// const fnArr = [addFive, multiplyByTwo, subtractOne];

// console.log(functionValidator(fnArr, 5, 10)) // should log [num => num + 5, num => num * 2]


// Challenge 2
/*
Create a function allClear that accepts an array of evaluator functions (each returning a boolean value),
and a single value. Using reduce, return a single boolean value indicating whether the value
 "passes" every single one of the evaluator functions (i.e. returns true).
 */
const allClear = (funcArr, value) => {

}

// const isOdd = num => num % 2 === 1;
// const isPositive = num => num > 0;
// const multipleOfFive = num => num % 5 === 0;
// const numFnArr = [isOdd, isPositive, multipleOfFive];
// console.log(allClear(numFnArr, 25)) // should log true
// console.log(allClear(numFnArr, -25)) // should log false


// Challenge 3
/*
Write a function numSelectString that accepts an array of numbers and returns a string.
This function should use filter, sort, and reduce to return a string containing only the odd numbers from the array,
separated by commas, in ascending order.
 */
const numSelectString = (numArr) => {

}

// const nums = [17, 34, 3, 12]
// console.log(numSelectString(nums)) // should log "3, 17"

// Challenge 4
// Write a function movieSelector that accepts an array of objects
// containing movie information (id, title, and score).
// Chain together invocations of map, filter AND reduce to return an array containing only movies with a score greater than 5.
// The titles should be all uppercase strings.
const movieSelector = (moviesArr) => {

}

// const movies = [ { id: 1, title: "Pan's Labyrinth", score: 9 }, { id: 37, title: "Manos: The Hands of Fate", score: 2 }, { title: "Air Bud", score: 5 }, { title: "Hackers", score: 7 } ]
// console.log(movieSelector(movies)) // should log [ "PAN'S LABYRINTH", "HACKERS" ]



// Challenge 5
//Create a function curriedAddThreeNums that adds three numbers together when run thrice in succession as follows:
const curriedAddThreeNums = (num1) => {

}

// console.log(curriedAddThreeNums(3)(-1)(1)); // should log 3


// Challenge 6
/*
Use partial application with your previously-defined curriedAddThreeNums
to create a new function curriedAddTwoNumsToFive that when run twice in succession, adds two numbers to five as follows:
 */
// const curriedAddTwoNumsToFive = ?

// console.log(curriedAddTwoNumsToFive(6)(7)) // should log 18






