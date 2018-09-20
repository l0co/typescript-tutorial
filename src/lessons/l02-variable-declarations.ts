import { lessons } from "./commons";

lessons['lesson02'] = function() {
    console.log(`------------------------------------\n- Lesson 02 - variable declarations\n------------------------------------`);

    // var is the same as in javascript
    function varTest(): void {
        if (true) {
            var a: number = 2;
        }

        console.log('var scoped variable', a);
    }
    varTest();

    // let is local
    let x: number = 1;
    function letTest(): void {
        if (true) {
            let a: number = 2;
        }

        // console.log('let scoped variable', a); // not compilable
        console.log('let scoped variable from closure', x); // closures still work
    }
    letTest();

    // loop + let creates NEW SCOPE each time
    let p: Promise<void> = new Promise(function (resolve, reject) { // promise will be used to wait while execution ends

        console.log('starting closure loop');
        for (let i = 0; i<10; i++) {
            setTimeout(function () {
                console.log(i);
                if (i==9)
                    resolve();
            }, 1);
        }
        /*
          --> equivalent to js+var

                var _loop_1 = function (i) {
                    setTimeout(function () {
                        console.log(i);
                    }, 1);
                };
                for (var i = 0; i < 10; i++) {
                    _loop_1(i);
                }

         */

    });

    p.then(function() {
        console.log('ending closure loop');

        // const is "let" with not possible changes
        const y: number = 1;
        console.log('const', y); // 1
        // y = 2; // rejected by the compiler
    })

};