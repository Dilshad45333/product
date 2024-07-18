import React, { useEffect, useState } from "react";
import EditProductForm from "./updateform";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import ImageCellRenderer from "./ImageCellRenderer";
import ButtonCellRenderer from "./ButtonCellRenderer";

const ProductList = () => {
  
  const [products, setProducts] = useState([]);
  const [rowData, setRowData] = useState([]);
 
  const fetchProducts = async () => {
    const response = await fetch("http://localhost:5000/api/products");
    const data = await response.json();
    setProducts(data);
    console.log(data)
    setRowData(data);
  };

  

  // Column Definitions: Defines the columns to be displayed.
  const colDefs = [
    { headerName: "Name", field: "name", sortable: true, filter: true },
    {
      headerName: "Description",
      field: "description",
      sortable: true,
      filter: true,
    },
    { headerName: "Price", field: "price", sortable: true, filter: false },
    { headerName: "Image", field: "image", valueGetter: (params) => params.data.image,cellRenderer:ImageCellRenderer },
    {
        headerName: 'Actions',
        field: 'actions',
        cellRenderer: ButtonCellRenderer,
        
    }
  ];
  
  useEffect(() => {
    fetchProducts();
  }, []);

 
  return (
    <div>
    
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={{ flex: 1, minWidth: 100 }}
        />
      </div>
    </div>
  );
};

export default ProductList;
