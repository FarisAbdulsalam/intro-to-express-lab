const express = require('express');
const app = express();
const PORT = 3000;
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];
const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];



// exercise 1

app.get('/greetings/:username', (req, res) => {
    res.send(`Hello ${req.params.username}`)
})

// exercise 2

app.get('/roll/:number', (req, res) => {
    const chosenNumber = req.params.number;
    if(isNaN(chosenNumber)){
        res.send('You must specify a number');
    } else{
        const randomNumber = Math.round(Math.random() * chosenNumber);
        res.send(`You rolled a ${randomNumber}`);
    }
})

// exercise 3

app.get('/collectibles/:idx', (req, res) => {
    const index = req.params.idx;
    if(isNaN(index) || index < 0 || index >= collectibles.length){
        res.send('This item is not yet in stock. Check back soon!');
    } else{
        const item = collectibles[index];
        res.send(`So, you want the ${item.name}? For $${item.price}, it can be yours!`)
    }
})

// exercise 4

app.get('/shoes', (req, res) => {
    let shoeArr = shoes;
    if(req.query['min-price']){
        let minPrice = parseFloat(req.query['min-price']);
        shoeArr = shoeArr.filter(shoe => shoe.price >= minPrice);
    } else if(req.query['max-price']){
        let maxPrice = parseFloat(req.query['max-price']);
        shoeArr = shoeArr.filter(shoe => shoe.price <= maxPrice);
    } else if(req.query.type){
        shoeArr = shoeArr.filter(shoe => shoe.type === req.query.type);
    }
    res.json(shoeArr);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});