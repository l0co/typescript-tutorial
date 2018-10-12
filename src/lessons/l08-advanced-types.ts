import { lessons } from "../commons";

/**
 * Advanced Types: https://www.typescriptlang.org/docs/handbook/advanced-types.html
 *
 * @author Lukasz Frankowski
 */
lessons['lesson08'] = function() {
    console.log(`------------------------------------\n- Lesson 08 - advanced types\n------------------------------------`);

    console.log('\ninterection types');
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
    }

    console.log('\nunion types');
    {
        let typeOf = function(x: string | number): string {
            return typeof x;
        };

        console.log(typeOf('text'));
        console.log(typeOf(1));
        // console.log(typeOf(true)); // Error:(39, 28) TS2345: Argument of type 'true' is not assignable to parameter of type 'string | number'.
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

    // TODOLF nullable types
};