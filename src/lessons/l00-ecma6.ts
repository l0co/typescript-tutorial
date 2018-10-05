import { lessons } from "../commons";

/**
 * ECMA6 features: http://es6-features.org
 *
 * @author Lukasz Frankowski
 */
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
    // iterable: object returning iterator in [Symbol.iterator]() method
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

    // you can use generator to fill spread
    console.log('\bArray generated with generator spread', [...gen(5)]); // [5, 6]

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

    // set
    x = new Set();
    x.add("x").add("x").add("y");
    console.log('\nSet:', x.values());

    // map
    x = new Map();
    x.set("x", "X").set("x", "X").set("y", "Y");
    console.log('\nMap:', x.entries());
    // proper iteration using spread
    for (let [key, val] of x.entries())
        console.log(key, val);

    // weak data structures
    x = new WeakSet();
    let x1: any = {my: 'object'};
    x.add(x1);
    console.log('\nWeak set with reference:', x.has(x1));
    x1 = null; // drop reference
    console.log('Weak set without reference:', x.has(x1));

    x = new WeakMap();
    x1 = {my: 'object2'};
    x.set(x1, "some additional properties");
    console.log('Weak map with reference:', x.has(x1));
    x1 = null; // drop reference
    console.log('Weak map without reference:', x.has(x1));

    // typed array
    {
        let buf = new ArrayBuffer(4); // 16-bytes buffer
        let view = new Uint16Array(buf); // view to manipulate ArrayBuffer as 16-bit ints
        view[0] = 1;
        view[1] = 1;
        let byteView = new Uint8Array(buf); // lets check what can be seen in this buffer using 8-bits view
        console.log('\nViewing bytes of 16-bit unsigned int array:');
        for (let j of byteView)
            console.log(j);
    }

    // properties assignment
    {
        let o1 = {a: 'A'};
        let o2 = {b: 'B'};
        console.log("\nProperties assignment:", Object.assign({}, o1, o2));
    }

    // array search
    {
        let x: number[] = [4, 3, 2, 1];
        console.log("\nArray find:", x.find(it => it<3));
        console.log("Array find index:", x.findIndex(it => it<2));
        console.log("Array find by index:", x.find((it, idx) => idx>2));
    }

    // string new methods
    {
        let s = "world";
        console.log('\nString repeat:', "hello ".repeat(3));
        console.log('String starts with:', s.startsWith('w'));
        console.log('String ends with:', s.endsWith('d'));
        console.log('String includes:', s.includes('orl'));
    }

    // number new methods
    {
        console.log('\nIs NaN:', Number.isNaN(NaN), Number.isNaN(1));
        console.log('Is integer:', Number.isInteger(1), Number.isInteger(1.1));
        console.log('Is finite:', Number.isFinite(1), Number.isFinite(Infinity));
    }

    // epsilon check
    {
        console.log('\nNumber without epsilon:', 0.1 + 0.2);
        console.log('Check without epsilon:', 0.1 + 0.2 === 0.3);
        console.log('Check without epsilon:', 0.1 + 0.2 - 0.3 < Number.EPSILON); // this is the proper expression of above one
    }

    // proxy
    {
        console.log('\nProxy');
        let x = {
            someMethod() {
                console.log('some method call');
            }
        };
        let p = new Proxy(x, {
            get(target: { someMethod(): void }, p: PropertyKey, receiver: any): any {
                console.log('trapping method/property access');
                return target.someMethod;
            }
        });
        p.someMethod();
    }

    // i18n
    {
        let list: string[] = ['b', 'ą', 'k'];
        console.log('\nSort without i18n', list.sort()); // b k ą
        console.log('Sort without pl i18n', list.sort(new Intl.Collator("pl").compare)); // ą b k
        console.log('Number format', new Intl.NumberFormat("pl").format(1293818923.22));
        console.log('Currency format', new Intl.NumberFormat("pl-PL", {style: 'currency', currency: "PLN"})
            .format(1293818923.22));
        console.log('Date/time format', new Intl.DateTimeFormat("pl").format(new Date("2015-03-12")));
    }

    // promise
    {
        let buildPromise: () => Promise<any> = function() {
            return new Promise((resolve, reject) => setTimeout(() => {
                console.log('executed');
                resolve();
            }, 100))
        };

        console.log("\nPromise");
        buildPromise().then(() => console.log('then')).then(() => {

            console.log("\nCombining promises");
            Promise.all([buildPromise(), buildPromise()]).then(() => console.log('then'));

        });

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