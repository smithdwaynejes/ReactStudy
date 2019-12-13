// Array Destructuring

const numbers = [1, 2, 3];

[num1, num2] = numbers;

console.log(num1,num2); // 1, 2

[num1, , num3] = numbers;

console.log(num1, num3); // 1, 3

// Object Destructuring

const person = {
    name:'Max',
    age:28
};

// {name} = person
