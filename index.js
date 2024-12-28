// importing required modules
const express = require("express");
const bodyParser = require("body-parser");

// initialising and connecting the middleware
const app = express();
app.use(bodyParser.json());

// creating an empty array to store product related data
const products = [];

// POST api to save products
app.post('/product', (req, res) => {
    const { id, productName, productCode, category, manufacturer, marketing, dateOfManufacturing } = req.body;

    if (!id || !productName || !productCode || !category || !manufacturer || !dateOfManufacturing) {
        return res.status(400).json({ message: 'All fields except marketing are required.' });
    }

    if (products.find(product => product.id === id)) {
        return res.status(400).json({ message: 'Product with this ID already exists.' });
    }

    const newProduct = { id, productName, productCode, category, manufacturer, marketing, dateOfManufacturing };
    products.push(newProduct);
    return res.status(201).json({ message: 'Product added successfully!', product: newProduct });
})

// GET api to show full detail of the product for which ID is given
app.get('/product/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
    }
    return res.status(200).json(product);
});

// DELETE api to remove the record
app.delete('/product/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex(product => product.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found.' });
    }

    products.splice(productIndex, 1);
    return res.status(200).json({ message: 'Product deleted successfully.' });
});


// start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});