import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { createClient } from 'pexels';
import getRandomFruitsName from 'random-fruits-name'; //Random Fruits name
import randomAnimalName from 'random-animal-name';
const animalName = randomAnimalName();


// Api for images
const client = createClient('JtDsZM7wPXNRl4xbvgsAsQWQVe17iPYaMP5dK7yemYNhLtbirs30o2v4');



const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));

app.get('/', (req, res) => 
{
    res.sendFile(__dirname + "/index.html");
});

app.get('/gameSelect', (req, res) => 
{
    res.sendFile(__dirname + "/games.html");
});

// Fruits Name

app.get('/game1', (req, res) =>
{
    function getRandomFruitNames() {
        const fruitNames = [];
    
        while (fruitNames.length < 4) {
            let fName = getRandomFruitsName('en', {maxWords: 1});
            if (!fruitNames.includes(fName)) {
                fruitNames.push(fName);
            }
        }
    
        return fruitNames;
    }
    
    const shuffledFruitNames = getRandomFruitNames().sort(() => Math.random() - 0.5);
    const correctIndex = Math.floor(Math.random() * 4);
    const correctAns = shuffledFruitNames[correctIndex];

    const query = correctAns + " fruit";
    let imgUrl = "";

client.photos.search({ query, per_page: 1 }).then(photos => {
    imgUrl = photos.photos[0].src.original;
    console.log(photos.photos); 

   
    res.render("fruits.ejs", { names: shuffledFruitNames, u: imgUrl, ans : correctAns });
}).catch(err => {
    
    console.error("Error fetching image:", err);
    res.status(500).send("Error fetching image");
});
});

// Animal Names

app.get('/game2', (req, res) => 
{
    function getRandomAnimalNames() {
        const animalNames = [];
    
        while (animalNames.length < 4) {
            let name = randomAnimalName();
            name = name.substring(name.indexOf(' ') + 1);
            if (!animalNames.includes(name)) {
                animalNames.push(name);
            }
        }
    
        return animalNames;
    }
    
    const shuffledAnimalNames = getRandomAnimalNames().sort(() => Math.random() - 0.5);
    const correctIndex = Math.floor(Math.random() * 4);
    const correctAns = shuffledAnimalNames[correctIndex];

    const query = correctAns + " animal";
    let imgUrl = "";

client.photos.search({ query, per_page: 1 }).then(photos => {
    imgUrl = photos.photos[0].src.original;
    console.log(imgUrl); 

   
    res.render("animal.ejs", { names: shuffledAnimalNames, u: imgUrl, ans : correctAns });
}).catch(err => {
    
    console.error("Error fetching image:", err);
    res.status(500).send("Error fetching image");
});
});

// Color Names

const colorImages = {
    red: 'images/red.png',
    orange: 'images/orange.webp',
    green: 'images/green.png',
    blue: 'images/blue.png',
    yellow: 'images/yellow.png',
    pink: 'images/pink.webp',
    purple: 'images/purple.png',
    brown: 'images/brown.png',
    black: 'images/black.webp',
    white: 'images/white.avif'
};

app.get('/game4', (req, res) => {
    function getRandomColorNames() {
        const colors = ['red', 'orange', 'green', 'blue', 'yellow', 'pink', 'purple', 'brown', 'black', 'white'];
        const colorNames = [];
    
        while (colorNames.length < 4) { // Changed from `animalNames` to `colorNames`
            let name = colors[Math.floor(Math.random() * colors.length)]; // Use full length of colors array
            if (!colorNames.includes(name)) {
                colorNames.push(name);
            }
        }
    
        return colorNames;
    }
    
    const shuffledColorNames = getRandomColorNames().sort(() => Math.random() - 0.5);
    const correctIndex = Math.floor(Math.random() * 4);
    const correctAns = shuffledColorNames[correctIndex];


    const imgUrl = colorImages[correctAns];

    res.render("colors.ejs", { names: shuffledColorNames, ans: correctAns, u: imgUrl });
});



app.listen(port, () =>
{
    console.log(port);
    // console.log(getRandomFruitsName('en', {maxWords: 1}));
    // console.log(animalName.substring(animalName.indexOf(' ') + 1));
});