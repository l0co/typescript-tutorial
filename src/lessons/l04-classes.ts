import { lessons } from "../commons";

/**
 * @author Lukasz Frankowski
 */
lessons['lesson04'] = function() {
    console.log(`------------------------------------\n- Lesson 04 - classes\n------------------------------------`);

    // simple example
    class Greeter {
        readonly greeting: string; // this needs to be initialized in constructor

        constructor(greeting: string) {
            this.greeting = greeting;
        }

        greet(emot: string = null): Greeter {
            console.log(this.greeting, emot ? emot : '');
            return this;
        }
    }
    console.log(new Greeter('Hello world!')
        .greet()
        .greeting); // public is the default field visibility

    // inheritance
    class BetterGreeter extends Greeter {
        protected numberOfGreetings: number;

        constructor(greeting: string) {
            super(greeting);
            this.numberOfGreetings = 0;
        }


        greet(emot: string = ':)'): Greeter { // the default value of argument can be overridden
            super.greet(emot);
            console.log(`Total number of greetings: ${++this.numberOfGreetings}`);
            return this;
        }
    }
    console.log('');
    new BetterGreeter('Hello better world!')
        .greet()
        .greet();

    // parameter properties
    class ParamPropertiesExample {
        // public a: string; // can't declare here if I want to declare in constructor

        constructor(public a: string, protected b: string, readonly c: string) { // may use modifier or "readonly"
        }

        getB(): string {
            return this.b;
        }
    }
    console.log('');
    let paramPropertiesExample: ParamPropertiesExample = new ParamPropertiesExample('a', 'b', 'c');
    console.log('Property a: ', paramPropertiesExample.a); // a is public
    console.log('Property b: ', paramPropertiesExample.getB()); // b is protected, so we get it using method
    console.log('Property c: ', paramPropertiesExample.c); // c by default is public

    // getters and setters
    class GettersSettersExample {
        protected _prop: string;

        get prop(): string {
            console.log('returning property value');
            return this._prop;
        }

        set prop(value: string) {
            console.log('setting property value');
            this._prop = value;
        }
    }
    console.log('');
    let gettersSettersExample = new GettersSettersExample();
    console.log('Before setter:', gettersSettersExample.prop);
    gettersSettersExample.prop = 'value';
    console.log('After setter:', gettersSettersExample.prop);

    // static properties
    class StaticPropertyExample {
        static text: string;
        printText(): void {
            console.log(StaticPropertyExample.text); // can't refet to this.text
        }
    }
    console.log('');
    StaticPropertyExample.text = 'Hello static world!';
    new StaticPropertyExample().printText();

    // abstract
    abstract class AbstractExample {
        abstract printText(): void;
    }
    class AbstractExampleSubclass extends AbstractExample {
        printText(): void {
            console.log('Hello abstract world!');
        }
    }
    console.log('');
    new AbstractExampleSubclass().printText();

    // class is still constructor function as in JS
    console.log('typeof class', typeof AbstractExampleSubclass);

    // you can create interface from the class
    interface SomeInterface extends AbstractExample {
    }

};