import { lessons } from "../commons";
import "reflect-metadata"

/**
 * Decorators: https://www.typescriptlang.org/docs/handbook/decorators.html
 *
 * @author Lukasz Frankowski
 */

lessons['lesson10'] = function() {
    console.log(`------------------------------------\n- Lesson 10 - decorators\n------------------------------------`);

    console.log('\nclass decorator');
    {
        // decorators are like Java annotations and are defined as functions
        let annot1 = function<T extends {new(...args:any[]):{}}>(ctor:T) { // accepts any constructor with different parameters
            console.log('annot1', ctor);
        };
        
        @annot1 // annot1 is called immediatelly and prints "annot1 function Person() { ... }"
        class Person {
            constructor() {
                console.log('constructing person');
            }
        }

        new Person(); // constructing person

        // all decorators can be wrapped with factory function carrying additional parameters to be configured from decorator declaration
        let annot2 = function(x: number) {
            return function<T extends {new(...args:any[]):{}}>(ctor:T) { // accepts any constructor with different parameters
                console.log('annot2', x, ctor);
            }
        };

        @annot2(1) // annot2 is called immediatelly and prints "annot2 1 function Person2() { ... }"
        class Person2 {
            constructor() {
                console.log('constructing person 2');
            }
        }

        new Person2(); // constructing person 2
        
        // by returning new anonymous class from annotation function, we can overwrite default constructor behavior or extend the original class
        let annot3 = function<T extends {new(...args:any[]):{}}>(ctor:T) {
            console.log('annot3', ctor);

            return class extends ctor {
                lastName: string = 'Smith';
                constructor(...args: any[]) {
                    super(...args);
                    console.log('postprocessing constructor');
                }
            }
        };

        @annot3 // annot3 is called immediatelly and prints "annot3 function Person3() { ... }"
        class Person3 {
            constructor(public name: string) {
                console.log('constructing person 3');
            }
        }

        let p3 = new Person3("Tom"); // constructing person 3 ... postprocessing constructor
        console.log(p3); // class_1 { name: 'Tom', lastName: 'Smith' }
    }

    console.log('\nmethod decorator');
    {
        let annot1 = function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            console.log('annot1', target, propertyKey, descriptor);
        };

        class Person {
            @annot1 // executed immediately, prints: annot1 Person { sayHello: [Function] } sayHello { value: [Function], writable: true, enumerable: true, configurable: true }
            sayHello() {
                console.log('hello, person');
            }
        }

        new Person().sayHello(); // hello, person

        // the property descriptor accessible in decorator can be altered

        let annot2 = function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            console.log('annot2', target, propertyKey, descriptor);

            descriptor.value = function() {
                console.log('hi, person 2');
            }
        };

        class Person2 {
            @annot2
            sayHello() {
                console.log('hello, person 2');
            }
        }

        new Person2().sayHello(); // hi, person 2
    }

    console.log('\naccessor decorator');
    {
        // exactly the same as method accessors, just

        let annot1 = function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            console.log('annot1', target, propertyKey, descriptor);
        };

        class Person {
            constructor(protected _name: string) {
            }

            @annot1 // executed immediately, prints: annot1 Person { name: [Getter/Setter] } name { get: [Function: get], set: [Function: set], enumerable: true, configurable: true }
            get name(): string {
                return this._name;
            }

            set name(value: string) {
                this._name = value;
            }
        }

        console.log(new Person("Tom")); // Person { _name: 'Tom' }
    }

    console.log('\nproperty decorator');
    {
        let annot1 = function(target: any, propertyKey: string) { // no PropertyDescriptor provided for property decorators
            console.log('annot1', target, propertyKey);
        };

        class Person {
            @annot1 // executed immediately, prints: annot1 Person {} name
            public name: string
        }

        // you can use reflect-metadata (https://www.npmjs.com/package/reflect-metadata) to store and retrieve info about property
        let annot2 = function(x: string) {
            return function(target: any, propertyKey: string) {
                Reflect.defineMetadata('annot2', x, target); // store info about property in reflect metadata
            }
        };

        class Person2 {
            @annot2('Tom')
            private _name: string;

            get name(): string {
                // in case of no "name" value, retrieve info about property from reflect metadata
                return this._name ? this._name : Reflect.getMetadata("annot2", this);
            }
        }

        console.log(new Person2().name); // Tom
    }

    console.log('\nparameter decorator');
    {
        let annot1 = function(target: Object, propertyKey: string, parameterIndex: number) {
            console.log('annot1', target, propertyKey, parameterIndex);
        };

        class Person {
            constructor(public name: string) {}

            say(@annot1 what: string) { // decorator executed immediately, prints: annot1 Person { say: [Function] } say 0
                console.log(`${what}, ${this.name}`);
            }
        }

        new Person('Tom').say('hello'); // hello, Tom

        // again, only reflect-metadata can be used to do something with this info
    }

};