import {  useNavigate } from 'react-router-dom';
import './Home.css'
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";


function Home() {
    const navigate=useNavigate();
   
    const onSubmit=(e)=>{
        
       if(e==='add'){
        navigate('/add')
       }else{
        navigate('/list')
       }
    }

    return (
        <div>
            
            
            <div className="landing-container">
            <div className="content">
                <h1>Welcome to the Product</h1>
                <p>You can add here your product details!.</p>
                <div className="buttons">
                    <button className="button unique-button-1" onClick={()=>onSubmit('add')}><CiCirclePlus />Add Product</button>
                    <button className="button unique-button-2" onClick={()=>onSubmit('list')}><MdOutlineRemoveRedEye />
                    View Product List</button>
                </div>
            </div>
        </div>
        </div>
        
    );
}

export default Home
