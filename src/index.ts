import { lessons } from "./lessons/commons";
import "./lessons/l01-types";
import "./lessons/l02-variable-declarations";
import "./lessons/l03-destructuring";
// TODOLF https://www.typescriptlang.org/docs/handbook/interfaces.html

if (process.argv.length<=2) {

    console.log("Give lesson number as command line argument (eg: 01))");
    process.exit(1);

} else {

    let lessonNumber: string = process.argv[2];
    if (lessonNumber.length<2)
        lessonNumber = "0" + lessonNumber;
    lessons[`lesson${lessonNumber}`]();

}