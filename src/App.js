import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register/register';
import ProductDetail from './components/detail';
import Cart from './components/cart';
import AdminHome from './components/manager/adminHome';
import EditProduct from './components/manager/editProduct';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout></Layout>}>
              <Route path='' element={<Home></Home>}></Route>
              <Route path='/login' element={<Login></Login>}></Route>
              <Route path='/register' element={<Register></Register>}></Route>
              <Route path='/product/:product_id' element={<ProductDetail></ProductDetail>}></Route>
              <Route path='/cart' element={<Cart></Cart>}></Route>
              <Route path='/manager' element={<AdminHome></AdminHome>}></Route>
              <Route path='/edit' element={<EditProduct></EditProduct>}></Route>
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
