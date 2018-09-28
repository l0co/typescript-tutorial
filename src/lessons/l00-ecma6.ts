import { lessons } from "./commons";

lessons['lesson00'] = function() {
    console.log(`------------------------------------\n- Lesson 00 - ECMA6\n------------------------------------`);

    // constants
    const const1 = 1;

    // local variable + closure scope
    console.log('Let scope');
    let callbacks = [];
    for (let i=0; i<3; i++)
        callbacks[i] = function() {console.log(i)};
    callbacks.forEach(item => item());

    // arrow function
    let x: any = () => console.log('\nI\'m an arrow function');
    x();

    // this in arrow function
    console.log('This in arrow funcction');
    x = {
        logMe: function() {
            // original this
            console.log(this);

            // anonymous function doesn't preserve "this"
            let y: any = function() {
                // @ts-ignore
                console.log(this);
            };
            y();

            // arrow function does preserve "this"
            y = () => console.log(this);
            y();
        }
    };
    x.logMe();

    // default parameters values
    x = function(y = 1) {
        console.log('\nDefault parameter:', y);
    };
    x();

    // rest parameters
    // @ts-ignore
    x = function(y, ...z) {
        console.log('\nRest parameters:', z);
    };
    x(1,2,3,4);

    // array spreads
    let a: string[] = ['B', 'C'];
    console.log('\nArray spread:', ['A', ...a]);

    // string interpolation
    console.log(`\nInterpolated array: ${a}`);

    // raw string access
    // @ts-ignore
    function ss(strings, ...values) {
        console.log('strings', strings, 'values', values);
    }
    let s: string = 'number';
    ss`The ${s} is ${1}`; // this expression call ss() function agains the string template: strings [ 'The ', ' is ', '' ] values [ 'number', 1 ]

    // binary, octal, hex number
    let n: number = 0b0001111; // bin
    n = 0o213023; // octal
    n = 0x98ABF; // hex

    // property shorthand
    x = {a,n};
    console.log('\nProperty shorthand:', x); // { a: [ 'B', 'C' ], n: 625343 }

    // computed property names
    x = {[s]: 1};
    console.log('\nComputed property names:', x); // { number: 1 }

    // method properties
    x = {
        // @ts-ignore
        method(y) {
            console.log('\nMethod property:', y);
        }
    };
    x.method(1);

    // destructuring array
    let [a1, a2, a3 = 'DEFAULT'] = a;
    console.log('\nDestructuring array:', a1, a2, a3); // B C DEFAULT

    // destructuring object
    let {b1, b2, b3 = 'DEFAULT'} = {
        b1: 'B',
        b2: 'C'
    };
    console.log('\nDestructuring object: ', b1, b2, b3); // B C DEFAULT

    // destructuring object - rename props
    let {b1: c1, b2: c2} = {
        b1: 'B',
        b2: 'C'
    };
    console.log('\nDestructuring object with renamed props: ', c1, c2); // B C

    // destructuring object - nested properties mapping
    let {b1: {c1: d3}} = {
        b1: {
            c1: 'X'
        }
    };
    console.log('\nDestructuring object with renamed props: ', d3); // X

    // destructuring array into function params
    // @ts-ignore
    x = function([p1, p2]) {
        console.log('\nDestructuring array into function params:', p1, p2);
    };
    x(['A', 'B']); // A B

    // destructuring object into function params
    // @ts-ignore
    x = function({p1, p2}) {
        console.log('\nDestructuring array into function params:', p1, p2);
    };
    x({p1: 'A', p2: 'B'}); // A B

};

// import/export examples

// @ts-ignore
export function exportedFunc(x) {}
export let exportedVariable = 1;

// import examples

// import * as ecma from "..."
// ecma.exportedFunc(ecma.exportedVariable)

// import {exportedFunc, exportedVariable} from "..."
// exportedFunc(exportedVariable)

// default import/export example

// @ts-ignore
export default (x) => {}

// import someFunc from "..."
// someFunc(1)