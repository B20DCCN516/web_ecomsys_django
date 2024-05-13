import './style.css'
import avt from '../../images/ip15.jpg'
import { useEffect, useState } from 'react';
import api_endpoint from '../../utils/ApiEnpoint';
import { getUser } from '../../utils/Utils';
function Cart() {
    const [cart, setCart] = useState([])

    useEffect(() => {
        if (getUser() === null) return;
        var customer_id = getUser().id
        fetch(`${api_endpoint.getCart}${customer_id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCart(data)
            })
            .catch(error => console.error('There was a problem with your fetch operation:', error));
    }, [])
    return (
        <div className='cart-main-container'>
            <div className="product-description">
                <div className="cart">
                    <h3>Danh sách sản phẩm trong giỏ hàng</h3>
                    <ul className="cart-items">
                        {
                            cart?.map((item_cart) => (
                                <li className="cart-item" key={item_cart.id}>
                                    <div className="checkbox-item">
                                        <input type="checkbox" name="product" />

                                    </div>
                                    <div className="item-inf">
                                        <img id="preview-image"
                                            src={item_cart.product.image} alt='avt' />
                                        <span className="item-name">{item_cart.product.name}</span>
                                    </div>

                                    <div className="quantity">
                                        <button className="btn btn-sm btn-secondary decrease-btn">-</button>
                                        <input type="text" className="quantity-input" value={item_cart.quantity} />
                                        <button className="btn btn-sm btn-secondary increase-btn">+</button>

                                    </div>
                                    <div className="cart-des">
                                        <span className="item-price" id="price-1">${item_cart.quantity * item_cart.product.price}</span>
                                    </div>
                                    <p className="status">Phân loại hàng: {item_cart.type_product}</p>
                                    <button className="btn btn-danger">Xóa</button>
                                </li>
                            ))
                        }

                    </ul>
                </div>
                <div className="cart-order">
                    <div className="item-cart-element ecom-voucher">
                        <div className="voucher">
                            <i className="fa-solid fa-ticket"></i>
                            <p>EcomSys Voucher</p>
                        </div>
                        <p id="link-voucher">Chọn hoặc nhập mã</p>

                    </div>
                    <div className="item-cart-element">
                        <p>Tổng sản phẩm: </p>
                        <span id="total-item">0</span>
                    </div>
                    <div className="item-cart-element">
                        <p>Giảm giá: </p>
                        <span id="discount">0</span>
                    </div>
                    <div className="item-cart-element">
                        <p className="amount-title">Tổng thanh toán: </p>
                        <span id="amount">0</span>
                    </div>
                    <button className="btn-buy">Mua hàng</button>

                </div>
            </div >
        </div>

    );
}

export default Cart;