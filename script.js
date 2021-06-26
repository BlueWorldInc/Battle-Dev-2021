const fs = require('fs');

let data = "";
fs.readFile('./Exercice-5/sample-5/input3.txt', 'utf8', (error, r) => {
    if (error) {
        console.error(error);
        return;
    }
    data = r;
    main();
});

function main() {
    let N = parseInt(data.split('\n')[0].split(' ')[0]);
    let A = parseInt(data.split('\n')[0].split(' ')[1]);
    let C = parseInt(data.split('\n')[0].split(' ')[2]);
    let AC = A + C;
    let line = data.split('\n')[1].split(' ').map(e => parseInt(e));
    line.push(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    let totalSum = line.reduce((a, b) => a + b);

    let bag = initBag();

    // Second Algo
    for (let i = 0; i < N; i++) {
        bag = cleanBag(bag, i);
        let nb = calcSum(line, A, i) + getMaxFromBag(bag, i);
        bag = addToBag(bag, nb, i + AC - 1);
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