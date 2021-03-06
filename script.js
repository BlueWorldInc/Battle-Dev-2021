const fs = require('fs');
const {performance} = require('perf_hooks');

let data = "";

let perfCleanBag = 0;
let perfCalcSum = 0;
let perfGetMaxFromBag = 0;
let perfAddToBag = 0;


fs.readFile('./Exercice-5/sample-5/input3.txt', 'utf8', (error, r) => {
    if (error) {
        console.error(error);
        return;
    }
    data = r;
    let start = performance.now();
    for (let i = 0; i < 1; i++) {
        main();
    }
    let end = performance.now();
    console.log(`Call to main() took ${(end - start).toFixed(2)} milliseconds.`);
    console.log(`Call to cleanBag() took ${(perfCleanBag).toFixed(2)} milliseconds.`);
    console.log(`Call to calcSum() took ${(perfCalcSum).toFixed(2)} milliseconds.`);
    console.log(`Call to getMaxFromBag() took ${(perfGetMaxFromBag).toFixed(2)} milliseconds.`);
    console.log(`Call to addToBag() took ${(perfAddToBag).toFixed(2)} milliseconds.`);
});

function main() {
    let N = parseInt(data.split('\n')[0].split(' ')[0]);
    let A = parseInt(data.split('\n')[0].split(' ')[1]);
    let C = parseInt(data.split('\n')[0].split(' ')[2]);
    let AC = A + C;
    let line = data.split('\n')[1].split(' ').map(e => parseInt(e));
    let len = line.length;
    line.push(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    let totalSum = line.reduce((a, b) => a + b);

    let bag = initBag();
    let sum = calcSum(line, A, 0);

    // Second Algo
    for (let i = 0; i < N; i++) {

        let t0 = performance.now();
        bag = cleanBag(bag, i);
        let t1 = performance.now();
        perfCleanBag += (t1 - t0);

        t0 = performance.now();

        if (i > 0 && (i + A - 1) < len) {
            sum = adjustSum(sum, line[i-1], line[i+A-1]);
        } else if (i > 0 && (i + A - 1) > len) {
            sum = adjustSum(sum, line[i-1], 0);
        }
        t1 = performance.now();
        perfCalcSum += (t1 - t0);

        t0 = performance.now();
        nb = sum + getMaxFromBag(bag, i);
        t1 = performance.now();
        perfGetMaxFromBag += (t1 - t0);

        t0 = performance.now();
        bag = addToBag(bag, nb, i + AC - 1);
        t1 = performance.now();
        perfAddToBag += (t1 - t0);

    }

    let result = totalSum - getMaxFromBag(bag, N + AC);

    console.log(result);

    // First Algo
    // let protectSum = 0;
    // let bag = initBagFirstAlgo(AC);

    // for (let i = 0; i < N; i++) {
    //     let currentIndex = i;
    //     let currentSum = calcSum(line, A, currentIndex, bag);
    //     // console.log(i, currentSum);
    //     if (superiorToNexts(line, A, currentIndex, C, currentSum, bag)) {
    //         protectSum += currentSum;
    //         i += A + C;
    //     } else {
    //         if (currentIndex >= AC) {
    //             bag = manageBag(bag, AC, line[currentIndex - AC]);
    //         }
    //     }
    //     // console.log(i, protectSum);
    // }
    // // console.log(totalSum - 249);
}

// function superiorToNexts(line, A, currentIndex, C, currentSum, bag) {
//     let b = bag.slice();
//     currentIndex++;
//     for (let i = 0; i < (A + C); i++) {
//         if (currentIndex >= (A + C)) {
//             b = manageBag(b, (A + C), line[currentIndex - (A + C)]);
//         }
//         if (currentSum < (calcSum(line, A, currentIndex + i, b))) {
//             return false;
//         }
//     }
//     return true;
// }

// function calcSum(line, A, currentIndex, bag) {
//     let sum = 0 + Math.max(...bag);
//     for (let i = currentIndex; i < A + currentIndex; i++) {
//         sum += isNaN(line[i])?0:line[i];
//     }

//     // console.log("debug", currentIndex + "/" + (currentIndex + A + 7) + " - " + sum);
//     // console.log(line.slice(currentIndex, A + currentIndex).join(''));

//     return sum;
// }

// function initBagFirstAlgo(AC) {
//     let bag = [];
//     for (let i = 0; i < AC; i++) {
//         bag.push(0);
//     }
//     return bag;
// }

// function manageBag(bag, AC, enter) {
//     let input = bag.shift() + enter;
//     if (input > Math.max(...bag)) {
//         bag.push(input);
//     } else {
//         bag.push(0);
//     }
//     return bag;
// }

function initBag() {
    let bag = [{nb:0, ind:0}];
    return bag;
}

function cleanBag(bag, index) {
    maxIndex = -1;
    for (let i = 0; i < bag.length; i++) {
        if (bag[i].ind >= index) {
            break;
        }
        maxIndex = bag[i].ind;
    }
    bag = bag.filter(e => e.ind >= maxIndex);
    return bag;
}

function addToBag(bag, number, index) {
    let bagMaxNumber = 0;
    for (let i = 0; i < bag.length; i++) {
        if (bag[i].nb > bagMaxNumber) {
            bagMaxNumber = bag[i].nb;
            if (bagMaxNumber >= number) {
                return bag;
            }
        }
    }
    bag.push({nb: number, ind: index});
    return bag;
}

function getMaxFromBag(bag, index) {
    let bagMaxNumber = 0;
    for (let i = 0; i < bag.length; i++) {
        if (bag[i].nb > bagMaxNumber && bag[i].ind < index) {
            bagMaxNumber = bag[i].nb;
        }
    }
    return bagMaxNumber;
}

function calcSum(line, A, currentIndex) {
    let sum = 0;
    for (let i = currentIndex; i < A + currentIndex; i++) {
        sum += isNaN(line[i])?0:line[i];
    }
    return sum;
}

function adjustSum(sum, output, input) {
    sum = sum + input - output;
    return sum;
}

// /*******
//  * Read input from STDIN
//  * Use: console.log()  to output your result.
//  * Use: console.error() to output debug information into STDERR
//  * ***/

//  var input = [];
//  let bag = [{nb:0, ind:0}];
 
//  readline_object.on("line", (value) => { //Read input values
//      input.push(value);
//  })
//  //Call ContestResponse when all inputs are read
//  readline_object.on("close", ContestResponse); 
 
 
//  function ContestResponse() {
//      main(input);
//  }
 
//  function main(data) {
 
//      let N = parseInt(data[0].split(' ')[0]);
//      let A = parseInt(data[0].split(' ')[1]);
//      let C = parseInt(data[0].split(' ')[2]);
//      let AC = A + C;
//      let line = data[1].split(' ').map(e => parseInt(e));
//      line.push(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
//      let totalSum = line.reduce((a, b) => a + b);
 
//      // Second Algo
//      for (let i = 0; i < N; i++) {
//          cleanBag(i);
//          let nb = calcSum(line, A, i) + getMaxFromBag(i);
//          addToBag(nb, i + AC - 1);
//      }
 
//      let result = totalSum - getMaxFromBag(N + AC);
 
//      console.log(result);
 
//  }
 
//  function cleanBag(index) {
//      maxIndex = -1;
//      for (let i = 0; i < bag.length; i++) {
//          if (bag[i].ind >= index) {
//              break;
//          }
//          maxIndex = bag[i].ind;
//      }
//      bag = bag.filter(e => e.ind >= maxIndex);
//  }
 
//  function addToBag(number, index) {
//      let bagMaxNumber = 0;
//      for (let i = 0; i < bag.length; i++) {
//          if (bag[i].nb > bagMaxNumber) {
//              bagMaxNumber = bag[i].nb;
//              if (bagMaxNumber >= number) {
//                  return;
//              }
//          }
//      }
//      bag.push({nb: number, ind: index});
//  }
 
//  function getMaxFromBag(index) {
//      let bagMaxNumber = 0;
//      for (let i = 0; i < bag.length; i++) {
//          if (bag[i].nb > bagMaxNumber && bag[i].ind < index) {
//              bagMaxNumber = bag[i].nb;
//          }
//      }
//      return bagMaxNumber;
//  }
 
//  function calcSum(line, A, currentIndex) {
//      let sum = 0;
//      for (let i = currentIndex; i < A + currentIndex; i++) {
//          sum += line[i];
//      }
//      return sum;
//  }