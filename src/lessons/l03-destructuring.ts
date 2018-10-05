import { lessons } from "../commons";

lessons['lesson03'] = function() {
    console.log(`------------------------------------\n- Lesson 03 - destructuring and spreads\n------------------------------------`);

    /**********************************************************************************************************
     * destructuring = assigning array/object params to the variables
     **********************************************************************************************************/

    // example for arrays
    let arr: number[] = [1, 2];
    let [a, b] = arr;
    console.log('a =', a, 'b =', b); // a=1, b=2

    // default values for non-existing elements
    let [a3, b3, c3 = 'three'] = arr;
    console.log('a3 =', a3, 'b3 =', b3, 'c3 =', c3); // a3=1, b3=2, c3=three

    // example for tuples
    let tup: [string, number] = ['hello', 10];
    let [a1, b1] = tup;
    console.log('a1 =', a1, 'b1 =', b1); // a=hello, b=10

    // example for objects
    let obj = {prop1: 'val1', prop2: 2};
    let {prop1, prop2} = obj;
    console.log('prop1 =', prop1, 'prop2 =', prop2); // prop1=val1, prop2=2

    // example for objects with property rename
    let {prop1: a2, prop2: b2} = obj;
    console.log('a2 =', a2, 'b2 =', b2); // a2=val1, b2=2

    // examples for functions + default values

    // bind from typed object
    type C = {a: string, b: number};
    function f1({a, b}: C) {
        console.log('f1 args', a, b);
    }
    f1({a: 'text', b: 11}); // text 11

    // bind from typed object with optional properties
    type D = {a: string, b?: number};
    function f2({a, b=1}: D) {
        console.log('f2 args', a, b);
    }
    f2({a: 'text', b: 11}); // text 11
    f2({a: 'text'}); // text 1

    // bind from any object - needs to have default values for all arguments
    function f3({a=0, b=1} = {}) {
        console.log('f3 args', a, b);
    }
    f3(); // this gives default param {} for function f3: 0 1
    f3({}); // 0 1
    f3({a: 2, b: 3}); // 2 3

    /**********************************************************************************************************
     * spreads
     **********************************************************************************************************/

    // arrays
    let arr1 = [1, 2];
    let arr2 = [3, 4];
    console.log('arrays spread', [0, ...arr1, ...arr2]); // [ 0, 1, 2, 3, 4 ]

    // objects
    let obj1 = {a: 'A', b: 'B'};
    console.log('object spread', {c: 'C', ...obj1}); // add new element: { c: 'C', a: 'A', b: 'B' }
    console.log('object spread', {...obj1, a: 'A2'}); // override element: { a: 'A2', b: 'B' }

};