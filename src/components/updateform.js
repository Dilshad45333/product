import React, { useEffect, useState } from 'react';

const EditUpdateForm=({product,onClose,onUpdate})=>{
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: ''
    });

    useEffect(()=>{
        setFormData({
            name:product.name,
            description:product.description,
            price:product.price,
            image:" "
        });
    },[product])

   const handleChange=(e)=>{
    const {name,value}=e.target
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
    }));

   }

   const handleSubmit=async(e)=>{
    e.preventDefault();

     try{
         const res=await fetch(`http://localhost:5000/update/${product.id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
          })

          if(!res.ok){
             throw new Error('Failed to update product');
          }

          onUpdate();

     }catch(error){
        console.error('Error updating product',error)
     }
   }

    return(
        <div>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Update Product</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    )
}

export default EditUpdateForm;