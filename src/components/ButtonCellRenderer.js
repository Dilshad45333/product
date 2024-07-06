import React, { useEffect, useState } from "react";
import EditProductForm from "./updateform";
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const ButtonCellRenderer = (data) => {

    const [products, setProducts] = useState([]);
  
    const handleEdit = (product) => {
      console.log('custm :',product.data)
      setEditingProduct(product.data);
    };
  
    const handleDelete = async (id) => {
      try {
        const res = await fetch(`http://localhost:5000/delete/${id}`, {
          method: "DELETE",
        });
        console.log("list :", res);
        setProducts(products.filter((product) => product.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };
    const [editingProduct, setEditingProduct] = useState(null);
  
    return (
      <div>
      
      <MdOutlineEdit onClick={() => handleEdit(data)}>Edit</MdOutlineEdit>
      <MdDelete onClick={() => handleDelete(data.data.id)}></MdDelete>
      
      {editingProduct && (
          <EditProductForm
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onUpdate={() => {
              // Refresh product list after update
              setEditingProduct(null);
              //fetchProducts();
            }}
          />
        )}
     </div>
  );
  };

  export default ButtonCellRenderer