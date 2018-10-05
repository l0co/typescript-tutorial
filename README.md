# Typescript tutorial

This is the tutorial project for TypeScript in Node.js, which is result of going through the documentation and removing unnecessary natural 
language descriptions (or rather translating it to TypeScript). It consists of two parts:

1. [Lesson 00](lessons/l00-ecma6.ts) is the quick overview of [ECMA6 features](http://es6-features.org).
1. Other lessons were created from [TypeScript reference](https://www.typescriptlang.org/docs/home.html).  
 
## How to run it in the shell

1. Install dependencies using `npm install`.
1. Run using `node -r ts-node/register src/index.ts [LESSON_NUMBER]`, where `LESSON_NUMBER` is in format: `00`, `01`, `02` etc.

## How to debug it in Idea

1. Install TypeScript plugin and Node.js plugin.
1. Use **Node.js** Run/Debug configuration with the same command line as above. 
1. After successful configuration you will be able to create breakpoint in [`src/index.ts`](src/index.ts) and the execution will stop there. 