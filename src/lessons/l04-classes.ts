import { lessons } from "../commons";

/**
 * Classes: https://www.typescriptlang.org/docs/handbook/classes.html
 *
 * @author Lukasz Frankowski
 */
lessons['lesson04'] = function() {
    console.log(`------------------------------------\n- Lesson 04 - classes\n------------------------------------`);

    console.log('\nclass basics');
    {
        // simple class
        class Greeter {
            readonly greeting: string; // property: readonly = needs to be initialized in constructor

            constructor(greeting: string) { // constructor
                this.greeting = greeting;
            }

            greet(emot: string = null): Greeter { // method + default argument value
                console.log(this.greeting, emot ? emot : '');
                return this;
            }
        }
        let greeter = new Greeter('Hello world!');
        greeter.greet(":)"); // Hello world! :)
        console.log(greeter.greeting); // Hello world!: public is default property visibility

        // inheritance
        class BetterGreeter extends Greeter { // extends - same as in java
            protected numberOfGreetings: number; // protected visiblity

            constructor(greeting: string) {
                super(greeting); // calling super construtor - same as in java
                this.numberOfGreetings = 0;
            }

            greet(emot: string = ':D'): Greeter { // the default value of argument can be overridden
                super.greet(emot); // calling super method
                console.log(`(total number of greetings: ${++this.numberOfGreetings})`);
                return this;
            }
        }
        let betterGreeter = new BetterGreeter('Hello world!');
        betterGreeter.greet(); // Hello world! :D ... (total number of greetings: 1)
        betterGreeter.greet(':)'); // Hello world! :) ... (total number of greetings: 2)
        // console.log(betterGreeter.numberOfGreetings); // Error:(48, 35) TS2445: Property 'numberOfGreetings' is protected and only accessible within class 'BetterGreeter' and its subclasses.

        // class is still constructor function as in JS
        console.log(typeof BetterGreeter); // function

        // you can create interface from the class
        interface SomeInterface extends BetterGreeter {}
    }

    console.log('\nparameter properties in constructor');
    {
        // properties can de declared automatically in constructor
        class ParamPropertiesExample {
            // public a: string; // can't declare here if I want to declare in constructor

            constructor(public a: string, protected b: string, readonly c: string) { // may use modifier or "readonly"
            }

            getB(): string {
                return this.b;
            }
        }
        let paramPropertiesExample: ParamPropertiesExample = new ParamPropertiesExample('a', 'b', 'c');
        console.log(paramPropertiesExample.a); // a: a is public
        console.log(paramPropertiesExample.getB()); // b: b is protected, so we get it using method
        console.log(paramPropertiesExample.c); // c: c by default is public
    }

    console.log('\ngetters and setters');
    {
        class GettersSettersExample {
            protected _prop: string;

            get prop(): string {
                console.log('getting');
                return this._prop;
            }

            set prop(value: string) {
                console.log('setting');
                this._prop = value;
            }
        }
        let gettersSettersExample = new GettersSettersExample();
        console.log(gettersSettersExample.prop); // getting ... undefined: accessing property is calling getter
        gettersSettersExample.prop = 'value'; // setting: assigning property is calling setter
        console.log(gettersSettersExample.prop); // getting ... value
    }

    console.log('\nstatic properties');
    {
        class StaticPropertyExample {
            static text: string;

            printText(): void {
                console.log(StaticPropertyExample.text); // can't refer to "this.text"
            }
        }
        StaticPropertyExample.text = 'Hello static world!';
        new StaticPropertyExample().printText(); // Hello static world!
    }

    console.log('\nabstract class');
    {
        abstract class AbstractExample {
            abstract printText(): void;
        }

        class AbstractExampleSubclass extends AbstractExample {
            printText(): void {
                console.log('Hello abstract world!');
            }
        }
        
        new AbstractExampleSubclass().printText(); // Hello abstract world!
    }

    console.log('\noverloads'); // described more in https://www.typescriptlang.org/docs/handbook/functions.html
    {
        class Overload {
            func(x: number): string; // adding empty declarations
            func(x: string): string; // ...

            func(x: any): any { // this method will be really called
                if (typeof x == 'string')
                    return 'string';
                else
                    return 'number';
            }
        }
        let overload = new Overload();
        console.log(overload.func(1)); // number
        console.log(overload.func('axc')); // string
        // console.log('overloaded boolean', overload.func(true)); // Error:(100, 53) TS2345: Argument of type 'true' is not assignable to parameter of type 'string'.

    }


};