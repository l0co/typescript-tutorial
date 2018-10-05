import { lessons } from "../commons";

/**
 * Interfaces: https://www.typescriptlang.org/docs/handbook/interfaces.html
 *
 * @author Lukasz Frankowski
 */
lessons['lesson03'] = function() {
    console.log(`------------------------------------\n- Lesson 03 - interfaces\n------------------------------------`);

    console.log('\nad hoc interface');
    {
        let print = function(obj: {label: string}) { // {label: string} = ad-hoc interface type
            console.log('Hello from', obj.label);
        };
        print({label: 'text'});
    }

    console.log('\ndeclared interface');
    {
        interface Labelled {
            label: string,
            subLabel?: string // optional
        }
        let print = function(obj: Labelled) {
            console.log('Hello from', obj.label);
        };
        print({label: 'text'});
    }

    console.log('\nreadonly field');
    {
        interface WithReadonly {
            readonly x: number;
        }
        let withReadonly: WithReadonly = {x: 5};
        // withReadonly.x = 6; // Error:(35, 22) TS2540: Cannot assign to 'x' because it is a constant or a read-only property.
    }

    console.log('\nadding fields to existing objects');
    {
        // object implementing once declared interface cannot easily introduce new field
        interface Intr1 {
            x: number;
        }
        let intr1: Intr1 = {x: 4};
        // let intr2: Intr1 = {x: 4, y: 5}; // Error:(45, 35) TS2322: Type '{ x: number; y: number; }' is not assignable to type 'Intr1'.
                                            // Object literal may only specify known properties, and 'y' does not exist in type 'Intr1'.

        // this interface can have any arbitrary number of properties
        interface Intr2 extends Intr1 {
            [propName: string]: any // this is indexable type, described further in this chapter
        }
        let intr2: Intr2 = {x: 4, y: 5};
    }

    console.log('\nfunctional interfaces');
    {

        // functional interfaces - same as java, interfaces representing only one function
        // this is only a way to name a concrete function type - here the function of '(text: string): void' gets the type name 'LogFunc'
        // instead, in every place you want to use it, you'd need to type full '(text: string): void'
        
        interface LogFunc {
            (text: string): void;
        }
        let log: LogFunc = function(text: string) { // function fulfilling the contract can be assigned
            console.log(text);
        };
        log('hello from functional interface');

        // you cannot implement functional interfaces in classes
        // class LogFuncImpl implements LogFunc {} // Error:(50, 11) TS2420: Class 'LogFuncImpl' incorrectly implements interface 'LogFunc'.

        // functional interface with additional properties
        interface LogFuncWithProps extends LogFunc {
            x: number
        }
        let logWithProps: LogFuncWithProps = <LogFuncWithProps>function(text: string) { // diamond <> forces type even if it doesn't have all required props
            console.log(text);
        };
        logWithProps.x = 1;
        // logWithProps.a = 1; // Error:(81, 22) TS2339: Property 'a' does not exist on type 'LogFuncWithProps'.

        // functional interfaces of constructor
        class SomeBuiltClass {
            constructor(x: number) {
                console.log('constructing');
            }
        }
        // this interface represents constructor with some arguments
        interface SomeBuilderIntr {
            new(x: number): any;
        }
        // this builder function is able to build anby class fulfilling constrcutor contract
        let build = function(constructor: SomeBuilderIntr): any {
            return new constructor(1); // usage of constructor interface with "new" keyword
        };
        console.log(build(SomeBuiltClass)); // constructing ... SomeBuiltClass {}
    }

    console.log('\nindexable interfaces');
    {
        // with number
        interface MyStringArray {
            [key: number]: string; // can also be readonly
        }
        let myStringArray: MyStringArray = ['a', 'b', 'c'];
        console.log(myStringArray[0]); // a: accessing indexed item with []

        // with string
        interface MyMap {
            [key: string]: string; // can also be readonly
        }
        let myMap: MyMap = {'a': 'A', 'b': 'B'};
        console.log(myMap['a']); // A: accessing indexed item with []
    }

    console.log('\nimplementing interfaces');
    {
        interface Intr3 {
            prop: string;
            setProp(s: string): void;
        }

        // ad-hoc object
        let intr3AdHoc: Intr3 = {
            prop: 'A',
            setProp(s: string) {
                this.prop = s;
            }
        };

        // class
        class Intr3Impl implements Intr3 {
            prop: string;
            setProp(s: string): void {
                this.prop = s;
            }
        }
    }

};