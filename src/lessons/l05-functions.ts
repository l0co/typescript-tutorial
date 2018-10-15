import { lessons } from "../commons";

/**
 * Functions: https://www.typescriptlang.org/docs/handbook/functions.html
 *
 * @author Lukasz Frankowski
 */
lessons['lesson05'] = function() {
    console.log(`------------------------------------\n- Lesson 05 - functions\n------------------------------------`);

    console.log('named function'); // can't be defined inside {} blocks when es5 is a target for the compiler
    function namedFunc(x: number): number {
        return x*x;
    }
    console.log(namedFunc(2)); // 4

    console.log('\nanonymous function');
    {
        let anonymousFunction: Function = function (x: number): number { // of general "Function" type
            return x * x;
        };
        console.log(anonymousFunction(2)); // 4
        console.log(anonymousFunction('xx')); // NaN: general Function type doesn't control input arguments

        // anonymous function of function type of concrete arguments and return type
        let anonymousFunction2: (x: number) => number = function(x: number): number { // of (x: number) => number type
            return x*x;
        };
        console.log(anonymousFunction2(2)); // 4
        // console.log('From unnamed function', anonymousFunction2('xx')); // Error:(26, 61) TS2345: Argument of type '"xx"' is not assignable to parameter of type 'number'.

        // remember, we always can name (x: number) => number function type with functional interface (see l03-interfaces)
        interface FunctionGettingNumberAndReturningNumber {
            (x: number): number
        }
        let anonymousFunction3: FunctionGettingNumberAndReturningNumber = anonymousFunction2; // types are compatible

        // inferring function type
        let anonymousFunction4 = function(x: number): number {
            return x*x;
        };
        // anonymousFunction4 = 1; // Error:(32, 5) TS2322: Type '1' is not assignable to type '(x: number) => number'.

        // inferring function type from arrow function
        let anonymousFunction5 = (x: number) => {
            return x*x;
        }
        // anonymousFunction5 = 1; // Error:(48, 9) TS2322: Type '1' is not assignable to type '(x: number) => number'.
    }

    console.log('\noptional and default parameter');
    {
        let optionalAndDefaultArgFunc = function (x: string = 'X', y?: string) {
            return `x=${x}, y=${y}`;
        };

        console.log(optionalAndDefaultArgFunc()); // x=X, y=undefined
        console.log(optionalAndDefaultArgFunc('A')); // x=A, y=undefined
        console.log(optionalAndDefaultArgFunc('A', 'B')); // x=A, y=B}
    }
    
    console.log('\nunknown arguments support');
    {
        let unknownArgFunc = function(x: string, ...y: any[]) {
            return `x=${x}, y=${y}`;
        };

        console.log(unknownArgFunc('X')); // x=X, y=
        console.log(unknownArgFunc('X', 'Y')); // x=X, y=Y
        console.log(unknownArgFunc('X', 'Y', 1)); // x=X, y=Y,1

    }

    console.log('\nfunction types');
    {
        // standrd function type with arguments and return type
        let fun1: (x: number) => number;
        // fun1 = function(x: number) {return "1"}; // Error:(78, 9) TS2322: Type '(x: number) => string' is not assignable to type '(x: number) => number'.
        // fun1 = function(x: string) {return 1}; // Error:(79, 9) TS2322: Type '(x: string) => number' is not assignable to type '(x: number) => number'.
        fun1 = function(x: number) {return x};

        // constuctor function type
        class Person {
            constructor(public x: number) {}
        }
        let fun2: new(x: number) => Person; // "new" keyword makes it constructor definition
        // fun2 = function(x: number) {return x}; // Error:(84, 9) TS2322: Type '(x: number) => number' is not assignable to type 'new (x: number) => number'.
        fun2 = Person // constructor assignment
    }

};