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

    // classes - same as typescript (class definition, class inheritance, super class access, static members, getter setter)
    // no private/protected/readonly members

    // symbol - a way to add properties to existing objects without interferring with their original properties
    x = {
        prop1: 'val1',
        prop2: 'val2'
    };
    const myProp = Symbol('myProp'); // this is unique symbol regardless its name
    const myGlobalProp = Symbol.for('my.global.prop'); // this is global shared symbol accessible from registry by unique name
    x[myProp] = 'SECRET';
    console.log('\nObject with symbol:',
        x, // VISIBLE IN DEBUGGER: { prop1: 'val1', prop2: 'val2', [Symbol(myProp)]: 'SECRET' }
        x[myProp], // ACCESSIBLE IN CODE: SECRET
        JSON.stringify(x), // NOT ADDED TO JSON OUTPUT: {"prop1":"val1","prop2":"val2"}
        Object.keys(x), // NOT VISIBLE IN OBJECT KEYS: [ 'prop1', 'prop2' ]
        Object.getOwnPropertyNames(x), // NOT VISIBLE IN OBJECT PROPERTIES: [ 'prop1', 'prop2' ]
        Object.getOwnPropertySymbols(x)); // VISIBLE IN OBJECT SYMBOLS: [ Symbol(myProp) ]

    // iterator: object implementing next() method returning {done: boolean, value: any}
    // interable: object returning iterator in [Symbol.iterator]() method
    // in typescript iteration only works with "downlevelIteration" compiler flag turned on
    console.log('\nIterator');
    x = {
        props: [1, 2, 3],

        [Symbol.iterator]() {
            let i = -1;
            return {
                props: this.props,
                next() {
                    return i++ < this.props.length-1 ? {done: false, value: this.props[i]} : {done: true};
                }
            }
        }
    };
    for (let y of x) {
        console.log(y);
    }

    // generator: yield exists immediately with value until next next() execution is called
    // @ts-ignore
    function* gen(start) {
        console.log("Yielding start (1)", start);
        yield start;

        start += 1;
        console.log("Yielding start (2)", start);
        yield start;

        console.log("Thanks for using this generator");
    }
    x = gen(2);
    console.log('\nGenerator', x);
    console.log(x.next()); // Yielding start (1) 2: { value: 2, done: false }
    console.log(x.next()); // Yielding start (2) 3: { value: 3, done: false }
    console.log(x.next()); // Thanks for using this generator: { value: undefined, done: true }

    // iterable using generator (sematically same as the one two examples above)
    console.log('\nIteratable generator');
    x = {
        props: [1, 2, 3],

        // @ts-ignore
        *[Symbol.iterator]() {
            let i = 0;
            while (i < this.props.length) {
                yield this.props[i++];
            }
        }
    };
    for (let y of x) {
        console.log(y);
    }

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