import React, { useState, useEffect, useCallback } from 'react';
import './ProductForm.css';
import toast, { Toaster } from 'react-hot-toast';

const Demo = ({ onAddProduct }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    const validateForm = useCallback(() => {
        const isNameValid = name.trim() !== '';
        const isDescriptionValid = description.trim() !== '';
        const isPriceValid = price.trim() !== '';

        setIsFormValid(isNameValid && isDescriptionValid && isPriceValid);
    }, [name, description, price]);

    useEffect(() => {
        validateForm();
    }, [name, description, price, validateForm]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = { name, description, price };
        const response = await fetch('http://localhost:5000/api/addproducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });
        const data = await response.json();
        onAddProduct(data);
        setName('');
        setDescription('');
        setPrice('');
        toast.success('Successfully added!');
    };


    return (
        <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            
            <button type="submit" className='advanced-button' disabled={!isFormValid}>
                Add Product
            </button>
            <Toaster position="top-right" />
        </form>
    );
};

export default Demo;
