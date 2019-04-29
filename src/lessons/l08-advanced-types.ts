import { lessons } from "../commons";

/**
 * Advanced Types: https://www.typescriptlang.org/docs/handbook/advanced-types.html
 *
 * @author Lukasz Frankowski
 */
lessons['lesson08'] = function() {
    console.log(`------------------------------------\n- Lesson 08 - advanced types\n------------------------------------`);

    console.log('\nintersection types');
    {
        interface I1 {
            job1(): void
        }
        interface I2 {
            job2(): void
        }

        let x: I1 & I2; // x needs to have both characteristics

        x = {
            job1(): void {
                console.log("job1");
            },

            job2(): void {
                console.log("job2");
            }
        };

        x.job1(); // job1
        x.job2(); // job2

        // you can name new intersection type with type alias
        type I1I2Intersection = I1 & I2;
    }

    console.log('\nunion types');
    {
        let typeOf = function(x: string | number): string {
            return typeof x;
        };

        console.log(typeOf('text'));
        console.log(typeOf(1));
        // console.log(typeOf(true)); // Error:(39, 28) TS2345: Argument of type 'true' is not assignable to parameter of type 'string | number'.

        // you can name new union type with type alias
        type StringOrNumber = string | number;

        // you can even use string and number literals as union types
        type Animation = "fade-in" | "fade-out";
        type SchoolClass = 1 | 2 | 3;
    }

    console.log('\ntype guards');
    {
        let isString = function(x: any): x is string { // this function returns boolean ...
            return typeof x === "string";
        };

        let x: Object = 'text';
        // console.log(x.length); // Error:(49, 23) TS2339: Property 'length' does not exist on type 'Object'.
        if (isString(x)) { // after execution of isString(), because of "x is string" return type, in this block x is silently cast to string
            console.log(x.length); // 4:
        }
    }

    console.log('\nnullable types');
    {
        let x: string;
        x = null; // this is only possible without strictNullChecks compiler flag turned on

        let y: string | null; // with strictNullChecks flag turned on you need to expicite mark variable as nullable with union type
        y = null;
    }

    console.log('\npolymorphic "this" types');
    {
        class Vehicle {
            addWheels(): this { // this method returns here "this" which is the Vehicle, but for Car subclass "this" will be of Car type
                console.log("adding wheels");
                return this;
            }
        }

        class Car extends Vehicle {
            addEngine(): this {
                console.log("adding engine");
                return this;
            }
        }

        new Car()
            .addWheels() // adding wheels:      note, that because of polymorphic "this" returned from this method
            .addEngine(); // adding engine:     we can continue here, using Car instance methods
    }

    console.log('\nkeyof and mapped types');
    {
        interface Person {
            name: string,
            lastName: string,
            age: number
        }

        let consumeProperties = function(prop: 'name' | 'lastName' | 'age') {};
        let y: keyof Person; // keyof is union type of strings representing property names of given interface/class
        consumeProperties(y);

        let z: Person['name']; // and this type "type of name property of Person interace/class" (string)
        // z = 1; // Error:(117, 9) TS2322: Type '1' is not assignable to type 'string'.

        {
            // this can be useful to create new type, which is equivalent to exisisting one but for example with all properties optional or readonly
            type OptionalPerson = {                     // == interface OptionalPerson {
                [P in keyof Person]?: Person[P]         //      name?: string,
            }                                           //      lastName?: string }

            type ReadonlyPerson = {                     // == interface OptionalPerson {
                readonly [P in keyof Person]: Person[P] //      readonly name: string,
            }                                           //      readonly lastName: string }
        }

        // these types are already included in type script
        type OptionalPerson = Partial<Person>; // same as OptionalPerson above
        type ReadonlyPerson = Readonly<Person>; // same as ReadonlyPerson above

        // there are also other mapped types available
        type RequiredPerson = Required<Person>; // makes all Person fields required
        type PickyPerson = Pick<Person, "name" | "age"> // allows to pick only some properties of Person
    }

    console.log('\nconditional types');
    {
        type NumberOfBoolean<T> = T extends string ? number : boolean

        type X = NumberOfBoolean<string>;
        let x: X = 1;
        // x = false; // Error:(141, 9) TS2322: Type 'false' is not assignable to type 'number'.

        type Y = NumberOfBoolean<number>;
        let y: Y = false;
        // y = 1; // Error:(145, 9) TS2322: Type '1' is not assignable to type 'boolean'.

        type Z = NumberOfBoolean<"a" | 1>;  // here it gets: number | boolean, because for union types like: "a" | 1
        let z: Z = 1;                       // it iterates over all element of the union and creates new union as result
        z = true;

        // this means: for all union elements of T and all union elements of U check if T extends U, and if it so do not add the value to
        // the resulting type (never), otherwise add it - in the result we will have the union type of all types in T not included in U
        type MyExclude<T, U> = T extends U ? never : T;
        type TMyExcluded = MyExclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
        let myExcluded: TMyExcluded = "b";
        // myExcluded = "a"; // Error:(156, 9) TS2322: Type '"a"' is not assignable to type '"b" | "d"'.

        // in conditional type you can also infer type from the condition
        type MyReturnValue<T> = T extends (...args: any[]) => infer R ? R : any
        type MyFunctionReturnType = MyReturnValue<(x: number, y: string) => number> // number
        let a: MyFunctionReturnType = 1;
        // a = "text" // Error:(162, 9) TS2322: Type '"text"' is not assignable to type 'number'.

        // Excluded, ReturnType types are by default contained in typescript standard library, here is a list of useful types of this kind:
        type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
        type T01 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"

        type T02 = Exclude<string | number | (() => void), Function>;  // string | number
        type T03 = Extract<string | number | (() => void), Function>;  // () => void

        type T04 = NonNullable<string | number | undefined>;  // string | number
        type T05 = NonNullable<(() => string) | string[] | null | undefined>;  // (() => string) | string[]

        let f1 = function(s: string) {
            return { a: 1, b: s };
        };

        class C {
            x = 0;
            y = 0;
        }

        type T10 = ReturnType<() => string>;  // string
        type T11 = ReturnType<(s: string) => void>;  // void
        type T12 = ReturnType<(<T>() => T)>;  // {}
        type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
        type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
        type T15 = ReturnType<any>;  // any
        type T16 = ReturnType<never>;  // any
        // type T17 = ReturnType<string>; // Error:(184, 31) TS2344: Type 'string' does not satisfy the constraint '(...args: any[]) => any'.
        // type T18 = ReturnType<Function>; // Error:(185, 31) TS2344: Type 'Function' does not satisfy the constraint '(...args: any[]) => any'.
                                            // Type 'Function' provides no match for the signature '(...args: any[]): any'.

        type T20 = InstanceType<typeof C>;  // C
        type T21 = InstanceType<any>;  // any
        type T22 = InstanceType<never>;  // any
        // type T23 = InstanceType<string>;  // Error:(191, 33) TS2344: Type 'string' does not satisfy the constraint 'new (...args: any[]) => any'.
        // type T24 = InstanceType<Function>;  // Error:(192, 33) TS2344: Type 'Function' does not satisfy the constraint 'new (...args: any[]) => any'.
                                               // Type 'Function' provides no match for the signature 'new (...args: any[]): any'.
        
    }

};
