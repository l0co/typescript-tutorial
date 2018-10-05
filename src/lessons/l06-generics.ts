import { lessons } from "../commons";

/**
 * @author Lukasz Frankowski
 */
lessons['lesson06'] = function() {
    console.log(`------------------------------------\n- Lesson 06 - generics\n------------------------------------`);

    // for plain function
    function genericFunc<T>(t: T): T {
        console.log('type of t is:', typeof t);
        return t;
    }
    // with usage of generics
    genericFunc<string>('xxx');
    // genericFunc<string>(1); // Error:(15, 25) TS2345: Argument of type '1' is not assignable to parameter of type 'string'.
    // inferring generic type
    let s1: string = genericFunc('xxx');
    // let i1: number = genericFunc('xxx'); // Error:(16, 9) TS2322: Type '"xxx"' is not assignable to type 'number'.

    // assigning generic function to variable
    let f1: <U>(u: U) => U = genericFunc;

    // generic interface
    interface GenericInterface<T> {
        t: T;
        getT(): T 
    }

    // generic class
    class GenericClass<T> {
        t: T;
        getT(): T {
            return this.t;
        }
    }

    // generic extending concrete type
    class GenericClass2<T extends number> {
        sqrt(t: T): number {
            return t*t;
        }
    }

    // using generics in functional interfaces of constructor
    function create<T>(c: {new(x: number): T; }, x: number): T {
        return new c(x);
    }
    class SomeCreateableClass {}
    class AnotherCreateableClass {}
    // this is another fuckup of constructor type check because none of these class implement (x: number) constructor
    console.log();
    console.log('create some class', create(SomeCreateableClass, 1)); // create some class SomeCreateableClass {}
    console.log('created another class', create(AnotherCreateableClass, 1)); // created another class AnotherCreateableClass {}
    // but if they implement, the constructor will be called
    class SomeCreateableClass2 {
        x: number;

        constructor(x: number) {
            this.x = x;
        }
    }
    class AnotherCreateableClass2 extends SomeCreateableClass2 {}
    console.log();
    console.log('create some class 2', create(SomeCreateableClass2, 1)); // create some class 2 SomeCreateableClass2 { x: 1 }
    console.log('created another class 2', create(AnotherCreateableClass2, 1)); // created another class 2 AnotherCreateableClass2 { x: 1 }


};