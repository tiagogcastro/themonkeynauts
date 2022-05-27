const getRandomInt = (min: number, max: number) => 
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;

export { getRandomInt };