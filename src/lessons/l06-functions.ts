import { lessons } from "./commons";

lessons['lesson06'] = function() {
    console.log(`------------------------------------\n- Lesson 06 - functions\n------------------------------------`);

    // named function as in JS
    function namedFunc(x: number): number {
        return x*x;
    }
    console.log();
    console.log('From named function', namedFunc(2));

    // anonymous function as in JS (of type Function)
    let anonymousFunction: Function = function(x: number): number {
        return x*x;
    };
    console.log();
    console.log('From unnamed function', anonymousFunction(2));
    console.log('From unnamed function', anonymousFunction('xx')); // anonymous function doesn't control input arguments (returns: From unnamed function NaN)

    // anonymous function of function type of concrete arguments and return type
    let anonymousFunction2: (x: number) => number = function(x: number): number {
        return x*x;
    };
    console.log('From unnamed function', anonymousFunction2(2));
    // console.log('From unnamed function', anonymousFunction2('xx')); // Error:(26, 61) TS2345: Argument of type '"xx"' is not assignable to parameter of type 'number'.

    // inferring function type
    let anonymousFunction3 = function(x: number): number {
        return x*x;
    };
    // anonymousFunction3 = 1; // Error:(32, 5) TS2322: Type '1' is not assignable to type '(x: number) => number'.

    // optional and default parameter
    function optionalAndDefaultArgFunc(x: string = 'X', y?: string) {
        return `x=${x}, y=${y}`;
    }
    console.log();
    console.log('optional and default argument', optionalAndDefaultArgFunc()); // x=X, y=undefined
    console.log('optional and default argument', optionalAndDefaultArgFunc('A')); // x=A, y=undefined
    console.log('optional and default argument', optionalAndDefaultArgFunc('A', 'B')); // x=A, y=B

    // unknown arguments support
    function unknownArgFunc(x: string, ...y: any[]) {
        return `x=${x}, y=${y}`;
    }
    console.log();
    console.log('unknown arguments', unknownArgFunc('X')); // x=X, y=
    console.log('unknown arguments', unknownArgFunc('X', 'Y')); // x=X, y=Y
    console.log('unknown arguments', unknownArgFunc('X', 'Y', 1)); // x=X, y=Y,1

    // this in functions (ECMA6 syntax - subset of typescript)
    let createFuncObj = {
        x: 'I\'m X from the original object',

        createFunc1: function() {
            return function() {
                // because anonymous function captures "this" from the context where it's invoked
                // "this" in this context doesn't refer the original createFunc object, so the typescript rejects following reference
                // if "noImplicitThis" compilation flag is set to true:
                // return this.x; // Error:(57, 24) TS2683: 'this' implicitly has type 'any' because it does not have a type annotation.

                // we can supress this with @ts-ignore to show the example usage
                // @ts-ignore
                return this.x;
            };
        },

        createFunc2: function() {
            return () => {
                // on the other hand arrow function from ECMA6 preserves "this" from the context where is created, not invoked
                return this.x;
            }
        }

    };
    console.log();
    // console.log("X in anonymous function", createFuncObj.createFunc1()()); // TypeError: Cannot read property 'x' of undefined
    console.log("X in anonymous arrow function:", createFuncObj.createFunc2()()); // X in anonymous arrow function: I'm X from the original object
    let createFuncObj2 = {
        x: 'I\'m X from the external object',
        func: createFuncObj.createFunc1()
    };
    console.log("X in anonymous function:", createFuncObj2.func()); // X in anonymous function: I'm X from the external object

    // overloads
    class Overload {
        func(x: number): string; // adding empty declarations
        func(x: string): string; // ...
        func(x: any): any { // we restrict in/out types for the generic "any" function
            if (typeof x == 'string')
                return 'string';
            else
                return 'number';
        }
    }
    let overload = new Overload();
    console.log();
    console.log('overloaded', overload.func(1));
    console.log('overloaded', overload.func('axc'));
    // console.log('overloaded boolean', overload.func(true)); // Error:(100, 53) TS2345: Argument of type 'true' is not assignable to parameter of type 'string'.

};