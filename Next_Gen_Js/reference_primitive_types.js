const number = 1; // primitive type
const num2 = number; // real copy of a number

// numbers, string, booleans are primitive types

// object and arrays are reference types.
const person = {
    name:'Max'
};

const secondPerson = person;

console.log(secondPerson);

secondPerson.name = 'Jason';

console.log(person); // {name: 'Jason'}

person.name = 'Nova';

console.log(secondPerson); // {name:'Nova'}



const thirdPerson = {...person};

person.name = 'Abraham';

console.log(thirdPerson);
console.log(person);