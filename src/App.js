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
import Order from './components/order/order';
import OrderDetail from './components/order/orderDetail';
import OrderList from './components/order/order-list';
import VoucherList from './components/voucher';
import ShipmentList from './components/shipment';
import QuickPayment from './components/qrcode';
import PaymentResult from './components/paymentSuccess';
import Profile from './components/profile';
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
              <Route path='/order' element={<Order></Order>}></Route>
              <Route path='/order-detail/:order_id' element={<OrderDetail></OrderDetail>}></Route>
              <Route path='/my-order' element={<OrderList></OrderList>}></Route>
              <Route path='/vouchers' element={<VoucherList></VoucherList>}></Route>
              <Route path='/shipments' element={<ShipmentList></ShipmentList>}></Route>
              <Route path='/payment' element={<QuickPayment></QuickPayment>}></Route>
              <Route path='/payment-result' element={<PaymentResult></PaymentResult>}></Route>
              <Route path='/profile' element={<Profile></Profile>}></Route>
            </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
