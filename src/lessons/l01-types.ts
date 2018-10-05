import { lessons } from "../commons";
import {CONNREFUSED} from "dns";

/**
 * Basic Types: https://www.typescriptlang.org/docs/handbook/basic-types.html
 *
 * @author Lukasz Frankowski
 */
lessons['lesson01'] = function() {
    console.log(`------------------------------------\n- Lesson 01 - types\n------------------------------------`);

    console.log('\nboolean type');
    {
        let boolVal: boolean = false;
        console.log(boolVal); // false
    }

    console.log('\nnumber type');
    {
        let numberVal: number = 11;
        console.log(numberVal); // 11
        numberVal /= 3;
        console.log("number/3", numberVal); // 3.6666666666666665 (everythig is floating point)
    }

    console.log('\nstring type');
    {
        let stringVal: string = "test";
        console.log(stringVal); // test
        stringVal = `template string with value embedded: ${stringVal}`; // string templates using backticks (`), not single quotes
        console.log(stringVal); // template string with value embedded: test
    }

    console.log('\ntype inferring');
    {
        let text = 'text';
        // text = 12; // Error:(107, 5) TS2322: Type '12' is not assignable to type 'string'.
    }

    console.log('\narray type');
    {
        let arr1: number[] = [1, 2, 3]; // [ 1, 2, 3 ]
        console.log(arr1);
        let arr2: number[] = []; // []: empty array
        console.log(arr2);
        let arr3: Array<number> = [4, 5, 6]; // [ 4, 5, 6 ]: using generic Array type
        console.log(arr3);
    }

    console.log('\ntuple type');
    {
        // tuple is an array with known length and known type for each element
        let tupleVal: [string, number] = ['two', 2];
        console.log("tuple", tupleVal);
    }

    console.log('\nenum type');
    {
        enum Color {RED, GREEN, BLUE} // same as {RED=0, GREEN=1, BLUE=2}
        let enumVal: Color = Color.RED;
        console.log(enumVal); // 0

        // getting the enum name
        let enumName: string = Color[enumVal]; // or Color[0] because RED=0
        console.log("enum name", enumName); // RED
    }

    console.log('\nany type');
    {
        // any type can contain anything (Object equivalent in java)
        let anyVal: any = 4;
        console.log(anyVal); // 4
        console.log(anyVal.toFixed()); // 4: calls Number.toFixed(), but compiler doesn't check that

        // calling not existing method on any object is possible
        anyVal = 'text';
        console.log(anyVal); // text
        try {
            console.log(anyVal.toFixed()); // causes error, because String doesn't have toFixed() method, but compiler doesn't check that
        } catch (e) {
            console.log(e.message); // anyVal_1.toFixed is not a function
        }
    }

    console.log('\nvoid type');
    {
        // void cannot have any value, besides undefined or null
        let voidVal: void;
        console.log(voidVal); // undefined
        voidVal = null; // possible
        console.log(voidVal); // null
        
        // voidVal = '1'; // rejected by the compiler

        // void is useful in functions with no return value
        let voidFunc = function(): void {
        }
    }

    console.log('\nnull type');
    {
        // null type cannot have any value, besides undefined or null (same as void)
        let nullVal: null;
        console.log(nullVal); // undefined

        nullVal = null;
        console.log(nullVal); // null

        // nullVal = '1'; // rejected by the compiler

        // null type is useful to mark nullable function params
        let nullFunc = function(a: number | null): void {
            console.log(a);
        };
        nullFunc(1); // 1
        nullFunc(null); // null
    }

    console.log('\nundefined type');
    {
        // undefined type cannot have any value, besides undefined or null (same as void and null)
        let undefinedVal: undefined;
        console.log('undefined', undefinedVal); // undefined

        undefinedVal = null;
        console.log('undefined', undefinedVal); // null
        
        // undefinedVal = '1'; // rejeCted by the compiler

        // it looks undefined type is not useful for anything
    }

    console.log('\nnever type');
    {
        // never type cannot have undefined value only
        let neverVal: never;
        console.log('never', neverVal); // undefined
        
        // neverVal = null; // rejected by the compiler
        
        // useful in functions which never returns
        let neverFunc = function(): never {
            throw new Error('Test error');
        }
    }

    console.log('\nobject type');
    {
        // object type allows to assign any object type but no primitive
        let objectFunc = function(o: object): void {
            console.log('object func', o);
        };
        objectFunc(null);
        objectFunc({prop: 'val'});
        // objectFunc(4); // rejected by the compiler
    }

    console.log('\ncasting');
    {
        let anyVal: any = "text";
        console.log((<string> anyVal).length); // using diamond operator <>
        console.log((anyVal as string).length); // using "as" keyword
    }

    console.log('\ndeclaring ad-hoc type');
    {
        // type of object with exact properties
        type MyType = {a: number; b?: string} // b is optional
        // let myObj: MyType = {a: 'text'} // Error:(168, 30) TS2322: Type 'string' is not assignable to type 'number'.
        let myObj: MyType = {a: 1};
        myObj = {a: 2, b: 'text'};
        // myObj = {a: 2, b: 'text', x: 1}; // Error:(171, 35) TS2322: Type '{ a: number; b: string; x: number; }' is not assignable to type 'MyType'.
                                            // Object literal may only specify known properties, and 'x' does not exist in type 'MyType'.

        // type of object with required properties, but the rest is any
        type MyType2 = {a: number; b?: string, [s: string]: any}
        let myObj2 = {a: 1, b: 'text', x: 1};
    }

};