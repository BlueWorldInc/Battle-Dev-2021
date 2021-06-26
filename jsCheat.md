# Common operations on Arrays


## Create an Array
```js
    let fruits = ['Apple', 'Banana']
    console.log(fruits.length)
    // 2
```
## Access an Array item using the index position
```js
    let first = fruits[0]
    // Apple
    let last = fruits[fruits.length - 1]
    // Banana
```
## Loop over an Array
```js
    fruits.forEach(function(item, index, array) {
        console.log(item, index)
    })
    // Apple 0
    // Banana 1
```
## Add an item to the end of an Array
```js
    let newLength = fruits.push('Orange')
    // ["Apple", "Banana", "Orange"]
```
## Remove an item from the end of an Array
```js
    let last = fruits.pop() // remove Orange (from the end)
    // ["Apple", "Banana"]
```
## Remove an item from the beginning of an Array
```js
    let first = fruits.shift() // remove Apple from the front
    // ["Banana"]
```
## Add an item to the beginning of an Array
```js
    let newLength = fruits.unshift('Strawberry') // add to the front
    // ["Strawberry", "Banana"]
```
## Find the index of an item in the Array
```js
    fruits.push('Mango')
    // ["Strawberry", "Banana", "Mango"]

    let pos = fruits.indexOf('Banana')
    // 1
```
## Remove an item by index position
```js
    let removedItem = fruits.splice(pos, 1) // this is how to remove an item

    // ["Strawberry", "Mango"]
```
## Remove items from an index position
```js
    let vegetables = ['Cabbage', 'Turnip', 'Radish', 'Carrot']
    console.log(vegetables)
    // ["Cabbage", "Turnip", "Radish", "Carrot"]

    let pos = 1
    let n = 2

    let removedItems = vegetables.splice(pos, n)
    // this is how to remove items, n defines the number of items to be removed,
    // starting at the index position specified by pos and progressing toward the end of array.

    console.log(vegetables)
    // ["Cabbage", "Carrot"] (the original array is changed)

    console.log(removedItems)
    // ["Turnip", "Radish"]
```
## Copy an Array
```js
    let shallowCopy = fruits.slice() // this is how to make a copy
    // ["Strawberry", "Mango"]
```
## Subarray
```js
    const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

    console.log(animals.slice(2));
    // expected output: Array ["camel", "duck", "elephant"]

    console.log(animals.slice(2, 4));
    // expected output: Array ["camel", "duck"]

    console.log(animals.slice(1, 5));
    // expected output: Array ["bison", "camel", "duck", "elephant"]

    console.log(animals.slice(-2));
    // expected output: Array ["duck", "elephant"]

    console.log(animals.slice(2, -1));
    // expected output: Array ["camel", "duck"]

```
## Print an output in one line using console.log()


#### You could just use the spread operator ...

```js
    var array = ['a', 'b', 'c'];
    console.log(...array);
```

## Filter an Array

#### The filter() method creates a new array with all elements that pass the test implemented by the provided function.

```js
    const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

    const result = words.filter(word => word.length > 6);

    console.log(result);
    // expected output: Array ["exuberant", "destruction", "present"]
```