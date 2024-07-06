import React, { useState } from 'react';
import ProductForm from './components/form';
import ProductList from './components/list';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';


function App() {
  
  const [products, setProducts] = useState([]);

  const handleAddProduct = (product) => {
      setProducts([...products, product]);
  };
   

    return (
        <Router>
                <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/add">Add Product</Link>
                        </li>
                        <li>
                            <Link to="/list">Product List</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/add" element={<ProductForm onAddProduct={handleAddProduct} />} />
                    <Route path="/list" element={<ProductList products={products} />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
               
        </Router>
    );
}
function Home() {
    return (
        <div>
            <h1>Welcome to the Product App</h1>
            <p>Select an option from the menu.</p>
        </div>
    );
}
export default App;
