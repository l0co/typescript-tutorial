import { lessons } from "./commons";

lessons['lesson08'] = function() {
    console.log(`------------------------------------\n- Lesson 08 - enums\n------------------------------------`);

    // standard
    enum Enum1 {
        UP,
        DOWN
    }
    console.log('standard enum', Enum1.UP, Enum1.DOWN);
    console.log('standard enum names', Enum1[Enum1.UP], Enum1[Enum1.DOWN]); // getting names

    // fixed numbers
    enum Enum2 {
        UP = 1,
        DOWN
    }
    console.log('fixed numbers enum', Enum2.UP, Enum2.DOWN);

    // string value
    enum Enum3 {
        UP = 'UP',
        DOWN = 'DOWN'
    }
    console.log('string value enum', Enum3.UP, Enum3.DOWN);

    // const enums = removed completed from output JS and replaced with constants
    const enum Enum4 {
        UP = 3,
        DOWN = 4
    }
    console.log('const enum', Enum4.UP, Enum4.DOWN);
    // console.log('const enum names', Enum4[Enum4.UP], Enum4[Enum4.DOWN]); // Error:(34, 60) TS2476: A const enum member can only be accessed using a string literal.

};