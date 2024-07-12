import React, { useEffect, useState,useCallback } from 'react';
import './ProductForm.css';
import toast, { Toaster } from 'react-hot-toast';

const ProductForm = ({ onAddProduct }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [isFormValid,setIsFormValid]=useState(false);
    
    const validateForm = useCallback(() => {
        const isNameValid = name.trim() !== '';
        const isDescriptionValid = description.trim() !== '';
        const isPriceValid = price.trim() !== '';
        const isImageValid = image !== null;

        setIsFormValid(isNameValid && isDescriptionValid && isPriceValid && isImageValid);
    }, [name, description, price, image]);

    useEffect(() => {
        validateForm();
    }, [name, description, price, image, validateForm]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = { name, description, price,image };
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
            setImage('');
            toast.success('Successfully added!');
           
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log('file:',file)
        if (file && file.type === 'image/png') {
            setImage(file);
        } else {
            alert('Please select a PNG file.');
        }
    };

   

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Image:</label>
                <input type="file"  onChange={handleImageChange} required accept=".png"  alt="Submit" width="48" height="48" />
            </div>
            <button type="submit" className='advanced-button' disabled={!isFormValid}>Add Product</button>
            <Toaster position="top-right" />
        </form>
        
    );
};

export default ProductForm;
