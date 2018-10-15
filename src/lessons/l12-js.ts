import { lessons } from "../commons";
import * as lib from "./lib/lib" // imports javascript library directly, see lib/lib.d.ts and lib/lib.js
import * as otherLib from "./lib/other-lib" // imports javascript libraries using intermediate js, see lib/other-lib.d.ts and lib/other-lib.js

/**
 * Using JS with declaration files
 *
 * @author Lukasz Frankowski
 */
lessons['lesson12'] = function() {
    console.log(`------------------------------------\n- Lesson 12 - javascript\n------------------------------------`);

    console.log(lib.testFn(2, 4)); // 8
    console.log(otherLib.testFn(2, 4)); // 8
};