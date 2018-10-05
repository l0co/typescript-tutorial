import { lessons } from "../commons";

/**
 * Enums: https://www.typescriptlang.org/docs/handbook/enums.html
 *
 * @author Lukasz Frankowski
 */
lessons['lesson07'] = function() {
    console.log(`------------------------------------\n- Lesson 07 - enums\n------------------------------------`);

    console.log('enum basics');
    {
        enum Enum {
            UP,
            DOWN
        }

        console.log(Enum.UP, Enum.DOWN); // 0 1
        console.log(Enum[Enum.UP], Enum[Enum.DOWN]); // UP DOWN
    }

    console.log('\nfixed numbers indices');
    {
        enum Enum {
            UP = 1,
            DOWN
        }

        console.log(Enum.UP, Enum.DOWN); // 1 2
    }

    console.log('\nstring indices');
    {
        enum Enum {
            UP = 'GO_UP',
            DOWN = 'GO_DOWN'
        }

        console.log(Enum.UP, Enum.DOWN); // GO_UP GO_DOWN
    }

    console.log('\nconst enums'); // removed completely from output JS and replaced with constants
    {
        const enum Enum {
            UP = 3,
            DOWN = 4
        }
        console.log('const enum', Enum.UP, Enum.DOWN);
        // console.log('const enum names', Enum4[Enum4.UP], Enum4[Enum4.DOWN]); // Error:(34, 60) TS2476: A const enum member can only be accessed using a string literal.
    }

};