import { lessons } from "../commons";

/**
 * Variable Declarations: https://www.typescriptlang.org/docs/handbook/variable-declarations.html
 *
 * @author Lukasz Frankowski
 */
lessons['lesson02'] = function() {
    console.log(`------------------------------------\n- Lesson 02 - variable declarations\n------------------------------------`);

    console.log('var');
    {
        // var is the same as in javascript (declaration of variable in whole current function scope)
        let varTest =function(): void {
            // noinspection ConstantIfStatementJS
            if (true) {
                var a: number = 2;
            }

            console.log(a);
        };
        varTest(); // 2

        // var reuses current scope, what can be visible in loops
        let arr: (() => void)[] = [];
        // noinspection ES6ConvertVarToLetConst
        for (var i = 0; i<3; i++)
            // noinspection JSReferencingMutableVariableFromClosure
            arr.push(() => console.log(i));
        for (let func of arr)
            func(); // 3 3 3, because "i" after loop is equal to 3

    }

    console.log('\nlet');
    {
        // let is local to current block scope ({})

        let x: number = 100;
        
        let letTest = function(): void {
            // noinspection ConstantIfStatementJS
            if (true) {
                let a: number = 200;
            }

            // console.log(a); // not compilable
            console.log(x); // closures still work
        };
        
        letTest();

        // const is "let" with not possible changes
        const y: number = 1;
        // y = 2; // rejected by the compiler

        // let creates new scope each time, what can be visible in loops (same as in l00-ecma6.ts)
        let arr: (() => void)[] = [];
        for (let i = 0; i<3; i++)
            arr.push(() => console.log(i));
        for (let func of arr)
            func(); // 0 1 2

    }

    console.log('\ndestructuring tuples');
    {
        let tup: [string, number] = ['hello', 10];
        let [a1, b1] = tup;
        console.log('a1 =', a1, 'b1 =', b1); // a=hello, b=10
    }

};