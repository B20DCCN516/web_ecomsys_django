import './style.css'
import { useState, useEffect } from 'react';
import { getItem, getUser } from '../../utils/Utils';
import ShipmentList from '../shipment';
import VoucherList from '../voucher';
import api_endpoint from '../../utils/ApiEnpoint';
import { useNavigate } from 'react-router-dom';
// import { totalPrice, totalPriceProduct } from '../../Funtion/Funtion';

function Order() {

    const [methodPayment, setMethodPayment] = useState([]);
    const [user, setUser] = useState(null)
    const [order, setOrder] = useState(null)
    const [voucher, setVoucher] = useState(null)
    const [open, setOpen] = useState(false);
    const [openVoucher, setOpenVoucher] = useState(false);
    const [selectedShipment, setSelectedShipment] = useState(null);
    const [selectedPayment,setSelectedPayment] = useState(null)

    const handleSelectVoucher = (voucher) => {
        setVoucher(voucher)
        setOrder({...order,voucher_id:voucher.id})
    };

    const navi = useNavigate()
    const showVoucherList = () => {
        setOpenVoucher(true)
    }
    const handleOkVoucher = () => {
        setOpenVoucher(false);
    };
    const handleCancelVoucher = () => {
        setOpenVoucher(false);
    };


    const handleSelectShipment = (ship) => {
        setSelectedShipment(ship);
        setOrder({...order,shipment_id:ship.id})
    };



    useEffect(() => {
        let user = getUser()
        let orderItem = getItem('order')
        let order_items = orderItem.map(item => ({
            product_id: item.product.product_id,
            quantity: item.quantity,
            price: parseFloat(item.product.price),
            image: item.product.image,
            name: item.product.name,
            type_product: item.type_product
        }));

        console.log(order_items)
        let currentOrder = {
            'customer_id': user.id,
            'order_items': order_items
        }
        setUser(getUser())
        setOrder(currentOrder)
        fetch(`${api_endpoint.apiGetPayment}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                setMethodPayment(data)
            })
            .catch(error => console.error('There was a problem with your fetch operation:', error));
    }, [])

    const showShipmentList = () => {
        setOpen(true)
    }
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const handleCheckboxChange = (e, payment) => {
        setSelectedPayment(payment)
        setOrder({...order,payment_id: payment.id})
    };

    const calculateTotalAmount = () => {
        // Check if order is not null and is an array
        if (!order) {
            return 0;
        }

        return order.order_items.reduce((total, item) => {
            return total + item.quantity * item.price;
        }, 0);
    };


    const totalPrice = () => {
        return calculateTotalAmount() - calculateDiscount() + calculatePriceShip()
    }

    const calculateDiscount = () => {
        var totalDiscount = 0;
        var total = calculateTotalAmount()
        if (voucher !== null) {
            if (total > voucher.condition && voucher.type === 'discount') {
                totalDiscount = Math.round((total * voucher.discount) / 100);
            }
        }
        return totalDiscount;
    };

    const calculatePriceShip = () => {
        let price = selectedShipment !== null ? selectedShipment.price : 0;
        if (voucher !== null && voucher.type === 'freeship') {
            return 0;
        }
        return price
    }

    const handleOrder = () => {
        const data = {...order,
            discount: calculateDiscount(),
            feeship: calculatePriceShip(),
            'status': 'Đang chuẩn bị đơn hàng'
        };
        console.log(data)
        if (order?.payment_id !== undefined && order.shipment_id !== undefined) {
            sessionStorage.setItem('payment',JSON.stringify(selectedPayment))
            fetch(`${api_endpoint.apiCreateOrder}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(Response => Response.json())
                .then(data => {
                    console.log(data)
                    if (data['status'] === 1) {
                        if(selectedPayment.id === 3) {
                            alert('Đặt hàng thành công!')
                            navi('/')
                            return
                        }
                        setTimeout(() => {
                           navi('/payment')
                         }, 500); // Đợi 5 giây
                    } else {
                        alert('Có lỗi xảy ra')
                    }

                })
                .catch(error => console.log(error))
        } else {
            alert('Vui lòng chọn phương thức thanh toán')
        }

    }
    return (
        <div className="payment-detail-container">
            <h2 className='title-product-payment'>Đơn hàng</h2>
            <div className="container-detail">
                <div className="infor-delivery-payment">
                    <div className='title-address-payment'>
                        <i class="fa-solid fa-location-dot"></i>
                        <div className='location'>Địa chỉ nhận hàng</div>
                    </div>

                    <div className='infor-address-payment'>
                        <div className='inf-customer'>
                            <p>{sessionStorage.getItem('name')}</p>
                            <p>{'Sdt: ' + user?.phone}</p>
                        </div>
                        <div className='address-payment'>
                            <p >{'Địa chỉ: ' + user?.address}</p>
                        </div>
                        <div className='address-default'>
                            <p >Mặc định</p>
                        </div>
                        <div className='change-address'>
                            <button className='btn-custom btn-change-address'>Thay đổi</button>
                        </div>
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
                            order.order_items.map((orderItem, index) => (
                                <div className="product-payment" key={index}>
                                    <div className='img-title-author pd'>
                                        <img src={orderItem?.image} alt="Sach"></img>
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
                            <p>Đơn vị vận chuyển</p>
                        </div>
                        <p className='title-pr'>{selectedShipment !== null ? selectedShipment?.name : ""}</p>
                        <p className='title-quantity change_ship' onClick={showShipmentList}>Thay đổi</p>
                        <p className='title-total'>${calculatePriceShip()}</p>
                    </div>
                    <div className="product-payment">
                        <div className='img-title-author pd transport-unit'>
                            <p>Voucher</p>
                        </div>
                        <p className='title-pr'>{voucher?.name}</p>
                        <p className='title-quantity change_ship' onClick={showVoucherList}>Chọn voucher</p>
                        <p className='title-total'>${calculateDiscount()}</p>
                    </div>
                    <div className='total-price-product'>
                        <p>Tổng số tiền: <span className='price'>${totalPrice()}</span></p>
                    </div>
                </div>
                <ShipmentList isOpen={open} handleOk={handleOk} handleCancel={handleCancel} onSelectShipment={handleSelectShipment}></ShipmentList>
                <VoucherList isOpen={openVoucher} handleOk={handleOkVoucher} handleCancel={handleCancelVoucher} onSelectVoucher={handleSelectVoucher}></VoucherList>
                <div className='product-detail'>
                    <h3>Phương thức thanh toán</h3>
                    <div className='method'>
                        {
                            methodPayment?.map((payment, index) => (
                                <label key={index}>
                                    <input type='checkbox' value={payment.id} onChange={(e) => handleCheckboxChange(e,payment)} checked={order?.payment_id !== undefined && order.payment_id === payment.id ? true : false} required />
                                    <span className='method-payment'>{payment.name}</span>
                                </label>
                            ))
                        }
                    </div>
                </div>
            </div>
            <button className='btn-custom btn_purchase' onClick={handleOrder}>Đặt hàng</button>
        </div>
    );
}

export default Order;