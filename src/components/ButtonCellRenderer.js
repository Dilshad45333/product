import React, {useEffect, useState,useRef } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './ButtonCell.css'

const ButtonCellRenderer = (data) => {

    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [rowData, setRowData] = useState([]);
    const gridApi = useRef(null);           

    const navigate=useNavigate();
    useEffect(() => {
      fetchProducts();
    }, []);
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
      setRowData(data)
      console.log(data)
    };
    const handleEdit = (product) => {
      setEditingProduct(product.data);
      navigate('/edit',{state:product.data})
    };
  
    const handleDelete = async (id) => {
      try {
        const res = await fetch(`http://localhost:5000/delete/${id}`, {
          method: "DELETE",
        });
        console.log("list :", res);
        setProducts(products.filter((product) => product.id !== id));
        toast.success('successfully deleted!')
        fetchProducts()
        if(!res.ok){
          toast.error('Unable to delete?')
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error(error)
      }
    };

    const refreshGrid = () => {
      if (gridApi.current) {
          gridApi.current.refreshCells();
      }
  };
  
    return (
      <div >
      <div className="container">
      <MdOutlineEdit onClick={() => handleEdit(data)} className="item"></MdOutlineEdit >
      <MdDelete onClick={() => handleDelete(data.data.id)} className="item" color="red"></MdDelete>
      </div>
      <Toaster position="top-right"></Toaster>
     
     </div>
  );
  };

  export default ButtonCellRenderer