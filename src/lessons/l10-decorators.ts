import { lessons } from "../commons";

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

        // decorators can be wrapped with factory function carrying additional parameters to be configured from decorator declaration
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

};