import { lessons } from "./commons";

lessons['lesson04'] = function() {
    console.log(`------------------------------------\n- Lesson 04 - interfaces\n------------------------------------`);

    // ad hoc interface
    function print1(obj: {label: string}) {
        console.log('Hello from', obj.label);
    }
    print1({label: 'ad-hoc interface'});

    // declared interface
    interface Labelled {
        label: string,
        subLabel?: string // optional
    }
    function print2(obj: Labelled) {
        console.log('Hello from', obj.label);
    }
    print2({label: 'ad-hoc interface, again'});

    // readonly fields
    interface WithReadonly {
        readonly x: number;
    }
    let withReadonly: WithReadonly = {x: 5};
    // withReadonly.x = 6; // compiler rejects this

    // once declared property as interface cannot easily introduce new field
    interface Intr1 {
        x: number;
    }
    let intr1: Intr1 = {x: 4};
    // let intr1: Intr1 = {x: 4, y: 5}; // compiler rejects this
    interface Intr2 extends Intr1 {
        [propName: string]: any // this interface can have any arbitrary number of properties
    }
    let intr2: Intr2 = {x: 4, y: 5}; // now it can have y prop

    // functional interfaces - same as java, interface representing only one function
    // this is only a way to name a concrete function type - here the function of '(text: string): void' declaration gets the name 'LogFunc'
    // instead, in every place you want to use it, you'd need to type full '(text: string): void'
    interface LogFunc {
        (text: string): void;
    }
    let log: LogFunc = function(text: string) { // function fulfilling the contract can be assigned
        console.log(text);
    };
    log('Hello from functional interface');
    // you cannot implement functional intrerface
    // class LogFuncImpl implements LogFunc {} // Error:(50, 11) TS2420: Class 'LogFuncImpl' incorrectly implements interface 'LogFunc'.
                                               // Type 'LogFuncImpl' provides no match for the signature '(text: string): void'.

    // functional interface with additional properties
    interface LogFuncWithProps extends LogFunc {
        x: number
    }
    let logWithProps: LogFuncWithProps = <LogFuncWithProps>function(text: string) { // diamond <> forces type even if it doesn't have all required props
        console.log(text);
    };
    logWithProps.x = 1;
    // logWithProps.a = 1; // rejected by the compiler

    // functional interfaces of constructor
    class SomeBuiltClass {
    }
    interface SomeBuilder {
        new(x: number): SomeBuiltClass;
    }
    let builderFunc1: SomeBuilder = SomeBuiltClass;
    let builtObject: SomeBuiltClass = new builderFunc1(1); // this is a fuckup - SomeBuiltClass doesn't have such constructor, but is allowed
    console.log('build object', builtObject);

    // indexable types
    // with number
    interface MyStringArray {
        [key: number]: string; // can also be readonly
    }
    let myStringArray: MyStringArray = ['a', 'b', 'c'];
    console.log('Indexable array item:', myStringArray[0]);
    // with string
    interface MyMap {
        [key: string]: string; // can also be readonly
    }
    let myMap: MyMap = {'a': 'A', 'b': 'B'};
    console.log('Indexable map item:', myMap['a']);

    // interfaces with methods + implementing in classes
    interface Intr3 {
        prop: string;
        setProp(s: string): void;
    }
    let intr3AdHoc: Intr3 = {
        prop: 'A',
        setProp(s: string) {
            this.prop = s;
        }
    };
    class Intr3Impl implements Intr3 {
        prop: string;
        setProp(s: string): void {
            this.prop = s;
        }
    }

    // constructor interface: construct signatures in interfaces are not implementable in classes; they're only for defining existing JS
    // APIs that define a 'new'-able function, see https://stackoverflow.com/a/13408029
    interface Intr4 {
        new (x: number): Intr4;
    }
    // compiler rejects this
    // class Intr4Impl implements Intr4 {
    //     constructor (x: number) {
    //     }
    // }
    // the proper usage is only in builder function
    function buildIntr4(ctor: Intr4, x: number): Intr4 {
        return new ctor(x);
    }

    // creating ad-hoc implementation of interface with no properties (forced type with diamond <>)
    interface Intr5 {
        x: number
    }
    let intr5Impl: Intr5 = <Intr5>{};
    console.log("Ad-hoc empty implementation of interface", intr5Impl);

};