import './style.css'
import { useEffect, useState } from 'react';
import api_endpoint from '../../utils/ApiEnpoint';
import { getUser } from '../../utils/Utils';
import Navigation from '../navigation';
import { Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';
function Cart() {
    const [cart, setCart] = useState([])
    const [isDone, setIsDone] = useState(false)
    const [order, setOrder] = useState([])



    const navi = useNavigate()

    useEffect(() => {
        if (getUser() === null) return;
        var customer_id = getUser().id
        setIsDone(false)
        fetch(`${api_endpoint.getCart}${customer_id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCart(data)
                setIsDone(true)
            })
            .catch(error => console.error('There was a problem with your fetch operation:', error));
    }, [])

    const handleIncrease = (item) => {
        let updatedItem = null;
        const updatedCart = cart.map((cartItem) => {
            if (cartItem.id === item.id) {
                let quantity = cartItem.quantity;
                if (quantity + 1 > 99) {
                    alert('Sản phẩm vượt quá số lượng kho!');
                    return { ...cartItem, quantity: cartItem.quantity };
                }
                updatedItem = { ...cartItem, quantity: cartItem.quantity + 1 };
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
        });
        setCart(updatedCart);
        if (updatedItem) {
            updateOrder(updatedItem);
        } else {
            updateOrder(item);
        }
    };

    const handleDecrease = (item) => {
        let updatedItem = null;
        const updatedCart = cart.map((cartItem) => {
            if (cartItem.id === item.id && cartItem.quantity > 1) {
                updatedItem= { ...cartItem, quantity: cartItem.quantity - 1 };
                return { ...cartItem, quantity: cartItem.quantity - 1 };
            }
            return cartItem;
        });
        setCart(updatedCart);
        updateOrder(updatedItem)
    };

    const handleCheckboxChange = (item) => {
        const isSelected = order.some(selectedItem => selectedItem.id === item.id);
        if (isSelected) {
            setOrder(order.filter(selectedItem => selectedItem.id !== item.id));
        } else {
            setOrder([...order, item]);
        }
    };

    const handleRemoveItem = (itemId) => {

        fetch(`${api_endpoint.deleteCart}${itemId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data['status'] === 1) {
                    const updatedCart = cart.filter(item => item.id !== itemId);
                    setCart(updatedCart);
                    setOrder(order.filter(selectedItem => selectedItem.id !== itemId));
                } else {
                    alert('Có lỗi xảy ra!')
                }
            })
            .catch(error => console.error('There was a problem with your fetch operation:', error));
    };

    const updateOrder = (updatedItem) => {
        const isSelected = order.some(selectedItem => selectedItem.id === updatedItem.id);
        if (isSelected) {
            const updatedorder = order.map((selectedItem) => {
                if (selectedItem.id === updatedItem.id) {
                    return updatedItem;
                }
                return selectedItem;
            });
            setOrder(updatedorder);
        }
    };

    const calculateTotalAmount = () => {
        return order.reduce((total, item) => {
            return total + item.quantity * item.product.price;
        }, 0);
    };

    const calculateQuantity = () => {
        return order.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
    };

    const handleClickOrder = () => {
        if (order.length > 0) {
            sessionStorage.setItem('order', JSON.stringify(order))
            navi('/order')
        } else {
            alert('Vui lòng chọn sản phẩm để mua hàng!')
        }

    }
    return (
        <div className='cart-main-container'>
            <Navigation></Navigation>
            <div className="product-description">
                <div className="cart">
                    <h3>Danh sách sản phẩm trong giỏ hàng</h3>

                    <ul className="cart-items">
                        {isDone ? (
                            cart?.map((item_cart) => (
                                <li className="cart-item" key={item_cart.id}>
                                    <div className="checkbox-item">
                                        <input type="checkbox" name="product"
                                            checked={order.some(selectedItem => selectedItem.id === item_cart.id)}
                                            onChange={() => handleCheckboxChange(item_cart)}
                                        />

                                    </div>
                                    <div className="item-inf">
                                        <img id="preview-image"
                                            src={item_cart.product.image} alt='avt' />
                                        <span className="item-name">{item_cart.product.name}</span>
                                    </div>
                                    <div className="quantity">
                                        <button className="btn btn-sm btn-secondary decrease-btn" onClick={() => handleDecrease(item_cart)}>-</button>
                                        <input type="text" className="quantity-input" value={item_cart.quantity} />
                                        <button className="btn btn-sm btn-secondary increase-btn" onClick={() => handleIncrease(item_cart)}>+</button>
                                    </div>
                                    <div className="cart-des">
                                        <span className="item-price" id="price-1">${item_cart.quantity * item_cart.product.price}</span>
                                    </div>
                                    <p className="status">Phân loại hàng: {item_cart.type_product}</p>
                                    <button className="btn btn-danger" onClick={() => handleRemoveItem(item_cart.id)}>Xóa</button>
                                </li>
                            ))
                        ) : (
                            Array.from({ length: 3 }).map((_, index) => (
                                <div className='skeleton-cart' key={index}>
                                    <Skeleton.Avatar active size="large" shape="square" style={{ marginRight: '16px' }} />
                                    <div style={{ flex: 1 }}>
                                        <Skeleton.Input style={{ width: '130px', marginBottom: '10px' }} active />
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Skeleton.Button style={{ width: '40px', marginRight: '8px' }} active />
                                            <Skeleton.Input style={{ width: '50px', textAlign: 'center', marginRight: '8px' }} active />
                                            <Skeleton.Button style={{ width: '40px' }} active />
                                        </div>
                                    </div>
                                    <Skeleton.Input style={{ width: '50px', marginLeft: '16px' }} active />
                                    <Skeleton.Input style={{ width: '80px', marginLeft: '16px' }} active />
                                    <Skeleton.Button style={{ marginLeft: '16px' }} active />
                                </div>

                            ))
                        )
                        }

                    </ul>
                </div>
                <div className="cart-order">
                    <div className="item-cart-element item-cart-custom">
                        <p>Tổng sản phẩm: </p>
                        <span id="total-item">{calculateQuantity()}</span>
                    </div>
                    <div className="item-cart-element item-cart-custom">
                        <p>Giảm giá: </p>
                        <span id="discount">$0</span>
                    </div>
                    <div className="item-cart-element item-cart-custom">
                        <p className="amount-title">Tổng thanh toán: </p>
                        <span id="amount">${calculateTotalAmount()}</span>
                    </div>
                    <button className="btn-buy" onClick={handleClickOrder}>Mua hàng</button>

                </div>
            </div >
        </div>

    );
}

export default Cart;