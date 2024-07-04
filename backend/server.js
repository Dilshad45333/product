const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const Product = require('./models/Product');

const app = express();

app.use(cors());
app.use(express.json());

// Sync the database
sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Error syncing database:', err));

// Define routes
// get product list
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// add product
app.post('/api/addproducts', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        res.status(500).send('Server error');
    }
});


//delete product 
app.delete('/delete/:id', async (req, res) => {

    try {
        const product = await Product.findByPk(req.params.id);
        console.log('delete',product);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await product.destroy();
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


// update product api
app.put('/update/:id',async (req,res)=>{
    console.log(`Received request to update product with id: ${req.params.id}`);
    console.log(`Request body:`, req.body);
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        await product.update(req.body);
        console.log('Product updated successfully');
        res.json(product);
    }catch(error){
        res.status(500).send('Server error');
    }
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
