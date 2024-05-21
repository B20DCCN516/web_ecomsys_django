import './style.css'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser,formatDateTime } from '../../utils/Utils';
import api_endpoint from '../../utils/ApiEnpoint';
import Navigation from '../navigation';

function OrderDetail() {
    const { order_id } = useParams();
    const [order, setOrder] = useState(null)
    const [user,setUser] = useState(null)
    const navi = useNavigate()
    useEffect(() => {
        setUser(getUser)
        fetch(`${api_endpoint.apiGetOrderDetail}${order_id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
               setOrder(data)
            })
            .catch(error => console.error('There was a problem with your fetch operation:', error));
    }, [])

    const setTime = (time) => {
        const date = new Date(time); // Đối tượng ngày giờ hiện tại
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return formattedDate;

    }
    // const handleBuyMore = () => {
    //     navi(`/books/${product.book.bookcode}`)
    // }

    const calculateTotalAmount = () => {
        // Check if order is not null and is an array
        if (order === null) {
            return 0;
        }

        return order.order_items.reduce((total, item) => {
            return total + item.quantity * item.price;
        }, 0);
    };

    const totalPrice = () => {
        return calculateTotalAmount() - order?.discount + order?.feeship
    }
    return (
        <div className="payment-detail-container">
            <Navigation></Navigation>
            <h2 className='title-product-detail'>Chi tiết đơn hàng</h2>
            <div className="container-detail">
                <div className="infor-delivery">
                    <div className='infor-address'>
                        <p className='inf-bold'>{user !== null ? user?.full_name : ""}</p>
                        <p className='inf-bold'>{'Sdt: ' + user !== null ? user?.phone : ""}</p>
                        <p>{'Địa chỉ: ' + user !== null ? user?.address : ""}</p>
                    </div>
                    <div className='status-delivery-payment'>
                        <p>Thời gian đặt hàng: <span className='inf-bold'>{formatDateTime(order?.date_order)}</span></p>
                        <p>Trạng thái đơn hàng: <span className="status-delivery">{order?.status}</span></p>
                        <p>Thời gian dự kiến nhận hàng: <span className='inf-bold'>{formatDateTime(order?.estimated_delivery_date)}</span></p>
                        <p>Phương thức thanh toán: <span className="status-delivery">{order?.payment?.name}</span></p>
                    </div>
                </div>
                <div className='product-detail'>
                    <div className='title-pd'>
                        <p className='pd'>Sản phẩm</p>
                        <p className='title-pr'>Đơn giá</p>
                        <p className='title-quantity'>Số lượng</p>
                        <p className='title-total'>Thành tiền</p>
                    </div>
                    {
                        order !== null ? (
                            order?.order_items?.map((orderItem, index) => (
                                <div className="product-payment" key={index}>
                                    <div className='img-title-author pd'>
                                        <img src={orderItem?.product?.image} alt="Sach"></img>
                                        <div className='title-author'>
                                            <p className="title-book-cart">{orderItem?.name}</p>
                                            <p className="author-book-cart">{orderItem?.type_product}</p>
                                        </div>
                                    </div>
                                    <p className='title-pr'>${orderItem?.price}</p>
                                    <p className='title-quantity'>{orderItem?.quantity}</p>
                                    <p className='title-total'>${orderItem?.price * orderItem?.quantity}</p>
                                </div>
                            ))
                        ) : null
                    }

                    <div className="product-payment transport">
                        <div className='img-title-author pd transport-unit'>
                            <p>Phí vận chuyển</p>
                        </div>
                        <p className='title-pr'>{ ""}</p>
                        <p className='title-quantity change_ship'></p>
                        <p className='title-total'>${order?.feeship}</p>
                    </div>
                    <div className="product-payment">
                        <div className='img-title-author pd transport-unit'>
                            <p>Voucher</p>
                        </div>
                        <p className='title-pr'></p>
                        <p className='title-quantity change_ship' ></p>
                        <p className='title-total'>${order?.discount}</p>
                    </div>
                    <div className='total-price-product'>
                        <p>Tổng số tiền: <span className='price'>${totalPrice()}</span></p>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default OrderDetail;