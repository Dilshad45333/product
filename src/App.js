import React, { useState } from 'react';
import ProductForm from './components/form';
import ProductList from './components/list';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import EditUpdateForm from './components/updateform';
import NotFound from './components/NotFound';
import Demo from './components/demo'
import Home from './components/Home';
function App() {
  
  const [products, setProducts] = useState([]);

  const handleAddProduct = (product) => {
      setProducts([...products, product]);
  };
   

    return (
        <Router>
                <div className="App">
                

                <Routes>
                    
                    <Route path="/add" element={<ProductForm onAddProduct={handleAddProduct} /> } />
                    
                    <Route path="/list" element={<ProductList products={products} />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/edit" element={<EditUpdateForm />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/demo" element={<Demo />} />
                </Routes>
            </div>
               
        </Router>
    );
}

export default App;
