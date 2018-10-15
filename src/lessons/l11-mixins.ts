import { lessons } from "../commons";

/**
 * Mixins: https://www.typescriptlang.org/docs/handbook/mixins.html
 *
 * @author Lukasz Frankowski
 */
lessons['lesson11'] = function() {
    console.log(`------------------------------------\n- Lesson 11 - mixins\n------------------------------------`);

    // mixins are about creating new classes dynamically from existing classes

    class Named {
        name: string;

        set(name: string) {
            this.name = name;
        }
    }

    class Loggable {
        log() {
            console.log(this);
        }
    }

    // the function which creates mixins from other classes
    let applyMixins = function(derivedCtor: any, baseCtors: any[]) {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    };

    class Mixin implements Named, Loggable { // implements instead extends
        name: string; // properties need to be redeclared

        // methods need to be redeclared
        set: (name: string) => void;
        log: () => void;
    }

    applyMixins(Mixin, [Named, Loggable]); // creating a mixin
    let m = new Mixin();
    m.set('I\'m the mixin');
    m.log(); // Loggable { name: 'I\'m the mixin' }

};