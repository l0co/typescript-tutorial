import { lessons } from "./commons";

lessons['lesson01'] = function() {
    console.log(`------------------------------------\n- Lesson 01 - types\n------------------------------------`);

    // inferring
    let text = 'text';
    // text = 12; // Error:(107, 5) TS2322: Type '12' is not assignable to type 'string'.

    // boolean
    let boolVal: boolean = false;
    console.log("boolean", boolVal);

    // number
    let numberVal: number = 11;
    console.log("number", numberVal);
    numberVal /= 3;
    console.log("number/3", numberVal); // 3.6666666666666665

    // string
    let stringVal: string = "test";
    console.log("string", stringVal);
    stringVal = `template stringt with value embedded: ${boolVal}`;
    console.log("string", stringVal);

    // arrays
    let arrayVal1: number[] = [1, 2, 3];
    console.log("array", arrayVal1);
    let arrayVal2: number[] = []; // empty array
    console.log("array", arrayVal2);
    let arrayVal3: Array<number> = [4, 5, 6]; // using generic Array type
    console.log("array", arrayVal3);

    // tuple
    let tupleVal: [string, number] = ['two', 2];
    console.log("tuple", tupleVal);

    // enum
    enum Color {RED, GREEN, BLUE} // same as {RED=0, GREEN=1, BLUE=2}
    let enumVal: Color = Color.RED;
    console.log("enum", enumVal); // 0
    let enumName: string = Color[enumVal]; // or Color[0] because RED=0
    console.log("enum name", enumName); // RED

    // any
    let anyVal: any = 4;
    console.log("any", anyVal);
    console.log("any", anyVal.toFixed()); // calls Number.toFixed(), but compiler doesn't check that
    anyVal = 'text';
    console.log("any", anyVal);
    try {
        console.log("any", anyVal.toFixed()); // causes error, because String doesn't have toFixed() method, but compiler doesn't check that
    } catch (e) {
        console.log(e.message);
    }

    // void
    let voidVal: void;
    console.log('void', voidVal); // undefined
    voidVal = null; // possible
    console.log('void', null);
    // voidVal = '1'; // rejected by the compiler
    // useful in functions with no return value
    function voidFunc(): void {
    }

    // null
    let nullVal: null;
    console.log('null', nullVal); // undefined
    nullVal = null;
    console.log('null', nullVal); // null
    // nullVal = '1'; // rejected by the compiler
    // useful to mark nullable function params
    function nullFunc(a: number | null): void {
        console.log('null func', a);
    }
    nullFunc(1);
    nullFunc(null);

    // undefined
    let undefinedVal: undefined;
    console.log('undefined', undefinedVal); // undefined
    undefinedVal = null;
    console.log('undefined', undefinedVal); // null
    // undefinedVal = '1'; // rejested by the compiler

    // never
    let neverVal: never;
    console.log('never', neverVal); // undefined
    // neverVal = null; // rejected by the compiler
    // useful in functions which never returns
    function neverFunc(): never {
        throw new Error('Test error');
    }

    // object - allows to assign any object type but no primite
    function objectFunc(o: object): void {
        console.log('object func', o);
    }
    objectFunc(null);
    objectFunc({prop: 'val'});
    // objectFunc(4); // rejected by the compiler

    // casting
    anyVal = "text";
    console.log("any as string - length", (<string> anyVal).length);
    console.log("any as string - length", (anyVal as string).length);

};