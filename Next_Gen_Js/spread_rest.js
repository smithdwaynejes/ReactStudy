// spread - For Arrays

const numbers = [1, 2, 3];

const newNumbers = [...numbers,4];

console.log(newNumbers); // [1, 2, 3, 4]

const newNumbers2 = [numbers, 4];

console.log(newNumbers2); // [[1,2,3], 4]

const newNumbers3 = [...numbers, 1, 2];

console.log(newNumbers3); // [1, 2, 3, 4, 1, 2]

// Spread -  for Object

const person = {
    name: 'Max'
};

const newPerson = {
    ...person,
    age:26
};

console.log(person);
console.log(newPerson);



// Rest - Function args

const filter = (...args) => {
    console.log(args); // [1, 2, 3]
    return args.filter(element => element === 1);
};

console.log(filter(1,2,3)); // [1]
