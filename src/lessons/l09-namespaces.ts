import { lessons } from "../commons";

/**
 * Symbols: https://www.typescriptlang.org/docs/handbook/symbols.html
 *
 * @author Lukasz Frankowski
 */

namespace Shapes {

    export namespace Polygons { // the only visible things outside namespace are exported ones

        class BaseSquare {}
        export class Square extends BaseSquare {}

    }

}

lessons['lesson09'] = function() {
    console.log(`------------------------------------\n- Lesson 09 - namespaces\n------------------------------------`);

    console.log('\nusing namespaces');
    // let x: Square; // Error:(24, 12) TS2304: Cannot find name 'Square'.
    let x: Shapes.Polygons.Square;
    // let y: Shapes.Polygons.BaseSquare; // Error:(27, 28) TS2694: Namespace 'Shapes.Polygons' has no exported member 'BaseSquare'.
};