import { lessons } from "../commons";

/**
 * Generics: https://www.typescriptlang.org/docs/handbook/generics.html
 *
 * @author Lukasz Frankowski
 */
lessons['lesson06'] = function() {
    console.log(`------------------------------------\n- Lesson 06 - generics\n------------------------------------`);

    console.log('generics in functions');
    {
        let genericFunc = function<T>(t: T): T {
            console.log('type of t is:', typeof t);
            return t;
        };

        // with usage of generics
        genericFunc<string>('xxx');
        // genericFunc<string>(1); // Error:(15, 25) TS2345: Argument of type '1' is not assignable to parameter of type 'string'.
        
        // inferring generic type
        let s1: string = genericFunc('xxx');
        // let i1: number = genericFunc('xxx'); // Error:(16, 9) TS2322: Type '"xxx"' is not assignable to type 'number'.

        // assigning generic function to variable
        let f1: <U>(u: U) => U = genericFunc;

        // defining generic function with arrow function
        genericFunc = <T>(t: T) => t;
    }

    console.log('\ngeneric interface');
    {
        interface GenericInterface<T> {
            t: T;
            getT(): T
        }
    }

    console.log('\ngeneric class');
    {
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
    }

};