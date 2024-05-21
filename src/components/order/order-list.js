
import './style.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, scrollToTop } from '../../utils/Utils'
import Navigation from '../navigation';
import api_endpoint from '../../utils/ApiEnpoint';
import { Skeleton } from 'antd';

function OrderList() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const navi = useNavigate()



    const calculateTotalAmount = (order) => {
        // Check if order is not null and is an array
        if (!order) {
            return 0;
        }

        return order.order_items.reduce((total, item) => {
            return total + item.quantity * item.price;
        }, 0);
    };

    const calculateQuantity = (order) => {
        // Check if order is not null and is an array
        if (!order) {
            return 0;
        }

        return order.order_items.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
    };


    useEffect(() => {
        if (getUser() === null) return;
        var customer_id = getUser().id
        setIsLoading(true)
        fetch(`${api_endpoint.apiGetOrder}?customer_id=${customer_id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setOrders(data)
                setIsLoading(false)
            })
            .catch(error => console.error('There was a problem with your fetch operation:', error));
    }, [])

    const sendProduct = (order) => {
        if (sessionStorage.getItem('product') !== null) {
            sessionStorage.removeItem('product')
        }
        sessionStorage.setItem('product', JSON.stringify(order))
        scrollToTop()
    }
    const handleBuyMore = (order) => {
        navi(`/`)
        scrollToTop()
    }

    const handleClick = (order) => {
        navi(`/order-detail/${order.id}`)
    }

    const statusOrder = (order) => {
        if (order.status === 0) {
            return 'Hủy'
        } else if (order.status === 1) return 'Nhận sách'
        return 'Đánh giá'
    }
    return (
        <div className="cart-container">
            <Navigation></Navigation>
            <div className="list-container">
                <h2 className="name-cart">Danh sách đơn hàng</h2>
                <div className="list-book-cart">
                    <div className="item-title">
                        <div className="product">Mã đơn</div>
                        <div className="price-product">Số lượng SP</div>
                        <div className="quantity-product">Tổng tiền</div>
                        <div className="status-product">Trạng thái</div>
                        <div className="action-product">Thao tác</div>
                    </div>
                    {
                        isLoading ? (
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

                            ))) : (
                                orders.map((order) => (
                                    <div className="item-cart">

                                        <div className="book-infor-cart product" onClick={() => handleClick(order)}>
                                            <div className="title-author">
                                                <p className="title-book-cart">{order.id}</p>
                                            </div>

                                        </div>

                                        <div class="quantity-controls large-screen quantity-product" onClick={() => handleClick(order)}>
                                            <span class="quantity">{calculateQuantity(order)}</span>
                                        </div>
                                        <p className="price large-screen total-product" onClick={() => handleClick(order)}>${calculateTotalAmount(order)}</p>
                                        <p className="large-screen status-delivery" onClick={() => handleClick(order)}>{order.status}</p>
                                        <div className="large-screen action-product">
                                            <button className="btn-cart btn-more" onClick={() => handleBuyMore(order)}>Mua thêm</button>
                                        </div>
                                    </div>
                                ))
                        )
                    }

                </div>
            </div>
        </div >
    );
}

export default OrderList;