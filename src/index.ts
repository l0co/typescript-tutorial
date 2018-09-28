import { lessons } from "./lessons/commons";

// TODOLF Continue TS: https://www.typescriptlang.org/docs/handbook/advanced-types.html

if (process.argv.length<=2) {

    console.log("Give lesson number as command line argument (eg: 01))");
    process.exit(1);

} else {

    let lessonNumber: string = process.argv[2];
    if (lessonNumber.length<2)
        lessonNumber = "0" + lessonNumber;
    lessons[`lesson${lessonNumber}`]();

}