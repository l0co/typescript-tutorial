# Typescript tutorial

This is the tutorial project for TypeScript in Node.js, which is result of going through the documentation and removing unnecessary natural 
language description (or rather translating it to pure TypeScript). It consists of following parts:

1. [ECMA6 features](src/lessons/l00-ecma6.ts) overview from [here](http://es6-features.org).
1. [Basic Types](src/lessons/l01-types.ts) ([docs](https://www.typescriptlang.org/docs/handbook/basic-types.html))
1. [Variable Declarations](src/lessons/l02-variable-declarations.ts) ([docs](https://www.typescriptlang.org/docs/handbook/variable-declarations.html))
1. [Interfaces](src/lessons/l03-interfaces.ts) ([docs](https://www.typescriptlang.org/docs/handbook/interfaces.html))
1. [Classes](src/lessons/l04-classes.ts) ([docs](https://www.typescriptlang.org/docs/handbook/classes.html))
1. [Functions](src/lessons/l05-functions.ts) ([docs](https://www.typescriptlang.org/docs/handbook/functions.html))
1. [Generics](src/lessons/l06-generics.ts) ([docs](https://www.typescriptlang.org/docs/handbook/generics.html))
1. [Enums](src/lessons/l07-enums.ts) ([docs](https://www.typescriptlang.org/docs/handbook/enums.html))
1. [Advanced Types](src/lessons/l08-advanced-types.ts) ([docs](https://www.typescriptlang.org/docs/handbook/advanced-types.html))
1. [Namespaces](src/lessons/l09-namespaces.ts) ([docs](https://www.typescriptlang.org/docs/handbook/namespaces.html))
1. [Decorators](src/lessons/l10-decorators.ts) ([docs](https://www.typescriptlang.org/docs/handbook/decorators.html))
1. [Mixins](src/lessons/l11-mixins.ts) ([docs](https://www.typescriptlang.org/docs/handbook/mixins.html))
1. [Using JavaScript with declaration files](src/lessons/l12-js.ts)

## How to run it in the shell

1. Install dependencies using `npm install`.
1. Run using `node -r ts-node/register src/index.ts [LESSON_NUMBER]`, where `LESSON_NUMBER` is in format: `00`, `01`, `02` etc.

## How to debug it in WebStorm/Idea

1. Install TypeScript plugin and Node.js plugin.
1. Use **Node.js** Run/Debug configuration with the same command line as above. 
1. After successful configuration you will be able to create breakpoint in [`src/index.ts`](src/index.ts) and the execution will stop there. 