import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductForm.css';
import toast from 'react-hot-toast';

const EditUpdateForm=()=>{
    const navigate=useNavigate()
    const location = useLocation();
      const  {state}  = location;
      console.log('state',state)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: ''
    });

    useEffect(()=>{
        setFormData({
            name:state.name,
            description:state.description,
            price:state.price,
            image:" "
        });
    },[state])

   const handleChange=(e)=>{
    const {name,value}=e.target
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
    }));

   }
 
   const onClose=()=>{
    navigate('/list')
   }
   const handleSubmit=async(e)=>{
    e.preventDefault();

     try{
         const res=await fetch(`http://localhost:5000/update/${state.id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)
          })
          toast.success("Successfully updated!");

          if(!res.ok){
             throw new Error('Failed to update product');
          }

          //onUpdate();

     }catch(error){
        console.error('Error updating product',error)
        toast.error(error)
     }
   }

    return(
        <div className="product-form">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit} >
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
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
                <div className='btn'>
                <button type="submit" className='advanced-button'>Update Product</button>
                <button type="button" onClick={onClose} className='advanced-button'>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditUpdateForm;