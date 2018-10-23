import { lessons } from "../commons";

/**
 * Going through ECMA6 features from http://es6-features.org, but in TypeScript syntax.
 *
 * @author Lukasz Frankowski
 */
lessons['lesson00'] = function() {
    console.log(`------------------------------------\n- Lesson 00 - ECMA6\n------------------------------------`);

    console.log('const');
    {
        const const1 = 1;
        // const1 = 2 // Error:(13, 5) TS2540: Cannot assign to 'const1' because it is a constant or a read-only property.
    }

    console.log('\nscope with let');
    {
        let callbacks = [];
        for (let i=0; i<3; i++)
            callbacks[i] = function() {console.log(i)}; // "let" creates new scope so callback function remembers "i" value
        callbacks.forEach(item => item()); // 0 1 2
    }

    console.log('\narrow function');
    {
        let func = () => console.log('I\'m an arrow function');
        func();
    }

    console.log('\n"this" in arrow function');
    {
        let obj = {
            logMe: function () {
                // original this
                console.log(typeof this); // object

                // anonymous function doesn't preserve "this"
                let func = function () {
                    // @ts-ignore
                    console.log(typeof this); // undefined
                };
                func();

                // arrow function does preserve "this"
                func = () => console.log(typeof this); // object
                func();
            }
        };
        obj.logMe();
    }

    console.log('\ndefault parameter value');
    {
        let func = function (y = 1) {
            console.log(y);
        };
        func(); // 1
    }

    console.log('\nrest parameters');
    {
        // @ts-ignore
        let func = function (y, ...z) {
            console.log(z);
        };
        func(1, 2, 3, 4); // 2 3 4
    }

    console.log('\narray spreads');
    {
        let arr: string[] = ['B', 'C'];
        console.log(['A', ...arr]); // A B C
    }

    console.log('\nstring interpolation');
    {
        let arr: string[] = ['B', 'C'];
        console.log(`\nmy favourite array is: ${arr}`); // NOTE: uses backticks (`), not single quotes
    }

    console.log('\nraw string access');
    {
        // @ts-ignore
        function processTemplate(strings, ...values) {
            console.log('strings', strings, 'values', values);
        }
        let s: string = 'number';
        processTemplate`The ${s} is ${1}`; // this expression call ss() function agains the string template: strings [ 'The ', ' is ', '' ] values [ 'number', 1 ]
    }

    console.log('\nbinary, octal, hex number');
    {
        console.log(0b0001111); // bin (15)
        console.log(0o213023); // octal (71187)
        console.log(0x98ABF); // hex (625343)
    }

    console.log('\nproperty shorthand');
    {
        let n = 1, arr: string[] = ['B', 'C'];
        let x = {a: arr, n};
        console.log(x); // { a: [ 'B', 'C' ], n: 1 }
    }

    console.log('\ncomputed property names');
    {
        let propName = 'myProp';
        let obj = {[propName]: 1};
        console.log(obj); // { myProp: 1 }
    }

    console.log('\nmethod properties');
    {
        let obj = {
            // @ts-ignore
            method(y) {
                console.log(y);
            }
        };
        obj.method(1); // 1
    }

    console.log('\ndestructuring array'); // (converting array items to local variables)
    {
        let arr: string[] = ['B', 'C'];
        let [a, b, c = 'DEFAULT'] = arr;
        console.log(a, b, c); // B C DEFAULT
    }

    console.log('\ndestructuring object'); // (converting object properties to local variables)
    {
        let {a, b, c = 'DEFAULT'} = {
            a: 'B',
            b: 'C'
        };
        console.log(a, b, c); // B C DEFAULT

        // with new variable names
        let {a: a1, b: b1} = {
            a: 'B',
            b: 'C'
        };
        console.log(a1, b1); // B C

        // with nested properties mapping
        let {a: {b: d}} = {
            a: {
                b: 'X'
            }
        };
        console.log(d); // X

        // creating object from variables
        console.log({a, b}); // { a: 'B', b: 'C' }
    }

    console.log('\ndestructuring array into function params');
    {
        // @ts-ignore
        let func = function ([p1, p2]) {
            console.log(p1, p2);
        };
        func(['A', 'B']); // A B
    }

    console.log('\ndestructuring object into function params');
    {
        // @ts-ignore
        let func = function ({p1, p2}) {
            console.log(p1, p2);
        };
        func({p1: 'A', p2: 'B'}); // A B
    }

    // Classes are the same as typescript (see l05-classes.ts for: class definition, class inheritance, super class access, static members,
    // getter setter). The difference is no private/protected/readonly members.

    console.log('\nsymbols'); // a way to add properties to existing objects without interfering with their original properties
    {
        let obj: any = {
            prop1: 'val1',
            prop2: 'val2'
        };
        const myProp = Symbol('myProp'); // this is unique symbol regardless its name
        console.log(myProp == Symbol('myProp')); // false
        const myGlobalProp = Symbol.for('my.global.prop'); // this is global shared symbol accessible from registry by unique name
        console.log(myGlobalProp == Symbol.for('my.global.prop')); // true
        obj[myProp] = 'SECRET'; // assigning symbol property to the object
        console.log(obj); // visible in debugger: { prop1: 'val1', prop2: 'val2', [Symbol(myProp)]: 'SECRET' }
        console.log(obj[myProp]); // accessible in code: secret
        console.log(JSON.stringify(obj)); // not added to json output: {"prop1":"val1","prop2":"val2"}
        console.log(Object.keys(obj)); // not visible in object keys: [ 'prop1', 'prop2' ]
        console.log(Object.getOwnPropertyNames(obj)); // not visible in object properties: [ 'prop1', 'prop2' ]
        console.log(Object.getOwnPropertySymbols(obj)); // visible in object symbols: [ Symbol(myProp) ]
    }

    console.log('\niterator');
    // iterator = object implementing next() method returning {done: boolean, value: any}
    // iterable = object returning iterator in [Symbol.iterator]() method
    // NOTE: in typescript iteration only works with "downlevelIteration" compiler flag turned on
    {
        let iterable = {
            props: [1, 2, 3],

            [Symbol.iterator]() {
                let i = -1;
                return {
                    props: this.props,
                    next() {
                        return i++ < this.props.length - 1 ? {done: false, value: this.props[i]} : {done: true};
                    }
                }
            }
        };
        for (let i of iterable) // of = syntax for iteration
            console.log(i); // 1 2 3
    }

    console.log('\ngenerator'); // new keyword "yield": then exits immediately with value and restarts for each iterator.next() call
    {
        // @ts-ignore
        function* gen(start) { // * = generator function
            yield start;
            start += 1;
            yield start;
        }
        let x = gen(2);
        console.log(typeof x.next); // function: first call returns iterator object with next() method
        console.log(x.next()); // yielding first "start" value (2): { value: 2, done: false }
        console.log(x.next()); // yielding second "start" value (3): { value: 3, done: false }
        console.log(x.next()); // no more values (done): { value: undefined, done: true }
        // you can use generator to fill array spread
        console.log([...gen(5)]); // [5, 6]

    }

    console.log('\niterable with generator'); // semantically the same as the iterable from the first example
    {
        let iterable = {
            props: [1, 2, 3],

            // @ts-ignore
            * [Symbol.iterator]() { // * = generator function
                let i = 0;
                while (i < this.props.length) {
                    yield this.props[i++]; // we don't create anonymous function here, so object properties are accessible under "this"
                }
            }
        };
        for (let i of iterable)
            console.log(i); // 1 2 3
    }

    console.log('\nset');
    {
        let set = new Set();
        set.add("x").add("x").add("y");
        console.log(set); // Set { 'x', 'y' }
    }

    console.log('\nmap');
    {
        let map = new Map();
        map.set("x", "X").set("x", "X").set("y", "Y");
        console.log(map); // Map { 'x' => 'X', 'y' => 'Y' }
        // proper iteration using spread
        for (let [key, val] of map.entries())
            console.log(key, '=', val); // x=X y=Y
    }

    console.log('\nweak set'); // automatically removes entries when the last reference is gone
    {
        let weakSet = new WeakSet();
        let obj: any = {my: 'object'};
        weakSet.add(obj);
        console.log(weakSet.has(obj)); // true
        obj = null; // droping reference
        console.log(weakSet.has(obj)); // false
    }

    console.log('\nweak map'); // automatically removes entries when the last reference is gone
    {
        let weakMap = new WeakMap();
        let obj = {my: 'object2'};
        weakMap.set(obj, "some additional properties"); // keys of weak map needs to be an object, so it's only useful to keep somewhere
                                                        // additional object properties
        console.log(weakMap.has(obj)); // true
        obj = null; // drop reference
        console.log(weakMap.has(obj)); // false
    }

    console.log('\ntyped array'); // allows to create byte buffer and manipulate it as eg. Int16, Int32, UInt16, UInt32 etc
    {
        let buf = new ArrayBuffer(4); // 16-bytes buffer
        let view = new Uint16Array(buf); // view used on buffer to manipulate it as 16-bit ints
        view[0] = 1;
        view[1] = 1;
        let byteView = new Uint8Array(buf); // lets check what can be seen in this buffer using 8-bits view
        for (let j of byteView)
            console.log(j); // 1 0 1 0
    }

    console.log('\nnew object methods');
    {
        let o1 = {a: 'A'};
        let o2 = {b: 'B'};
        console.log(Object.assign({}, o1, o2)); // { a: 'A', b: 'B' }
    }

    console.log('\nnew array methods');
    {
        let x: number[] = [4, 3, 2, 1];
        console.log(x.find(it => it<3)); // 2, because first found element <3 is 2
        console.log(x.findIndex(it => it<2)); // 3, because first foundd element <2 is 1 which has index 3
        console.log(x.find((it, idx) => idx>2)); // 1, because first index>2 is 3 and element with index 1 is 1
    }

    console.log('\nnew string methods');
    {
        let s = "world";
        console.log("hello ".repeat(3)); // hello hello hello
        console.log(s.startsWith('w')); // true
        console.log(s.endsWith('d')); // true
        console.log(s.includes('orl')); // true
    }

    console.log('\nnew number methods');
    {
        console.log(Number.isNaN(NaN), Number.isNaN(1)); // true false
        console.log(Number.isInteger(1), Number.isInteger(1.1)); // true false
        console.log(Number.isFinite(1), Number.isFinite(Infinity)); // true false
    }

    console.log('\nepsilon check'); // allows to compare floating point operation
    {
        console.log(0.1 + 0.2); // 0.30000000000000004
        console.log(0.1 + 0.2 === 0.3); // false
        console.log(0.1 + 0.2 - 0.3 < Number.EPSILON); // true, this is the proper syntax of (0.1 + 0.2 === 0.3) using epsilon
    }

    console.log('\nproxy');
    {
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
        p.someMethod(); // trapping ... call
    }

    console.log('\ni18n');
    {
        let list: string[] = ['b', 'ą', 'k'];
        console.log('\nSort without i18n', list.sort()); // b k ą
        console.log('Sort without pl i18n', list.sort(new Intl.Collator("pl").compare)); // ą b k: OK
        console.log('Number format', new Intl.NumberFormat("pl").format(1293818923.22)); // 1,293,818,923.22: OK
        console.log('Currency format', new Intl.NumberFormat("pl-PL", {style: 'currency', currency: "PLN"})
            .format(1293818923.22)); // PLN 1,293,818,923.22: with default currencyDisplay: "symbol"
        console.log('Currency format', new Intl.NumberFormat("pl-PL", {style: 'currency', currency: "PLN", currencyDisplay: "name"})
            .format(1293818923.22)); // 1,293,818,923.22 PLN: with currencyDisplay: "name"
        console.log('Date/time format', new Intl.DateTimeFormat("pl").format(new Date("2015-03-12"))); // 2015-3-12
        console.log('Date/time format', new Intl.DateTimeFormat("pl", {month: "2-digit", day: "2-digit", year: "numeric"})
            .format(new Date("2015-03-12"))); // 2015-03-12
    }

    console.log('\npromise');
    {
        let buildPromise: () => Promise<any> = function() {
            return new Promise((resolve, reject) => setTimeout(() => {
                console.log('executed');
                resolve();
            }, 100))
        };

        buildPromise()
            .then(() => console.log('then')) // executed ... then
            .then(() => {

                console.log("\ncombining promises");
                Promise.all([buildPromise(), buildPromise()])
                    .then(() => console.log('then')); // executed ... executed ... then

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