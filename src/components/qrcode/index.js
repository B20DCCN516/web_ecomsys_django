import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import './style.css'; // Đảm bảo bạn có một file CSS để style trang
import { getItem } from '../../utils/Utils';
import api_endpoint from '../../utils/ApiEnpoint';
import PaymentSuccess from '../paymentSuccess';
import { useNavigate } from 'react-router-dom';

const QuickPayment = () => {
    const [payment,setPayment] = useState(null)
    const [qrValue,setQrValue] = useState("")
    const [open, setOpen] = useState(false);
    
    const navi = useNavigate()
    const showResult= () => {
        setOpen(true)
    }
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        setPayment(getItem('payment'))
        let url = api_endpoint.apiTest+"?requestId=1"
        setQrValue(url)
        setTimeout(() => {
           showResult()
        }, 5000); // Đợi 5 giây
    },[])

    return (
        <div className="quick-payment">
            <h1>{payment !== null ? payment.name : "Thanh toán qua ATM"}</h1>
            {
                payment?.id === 2 ? (
                    <p><strong>Tên ngân hàng:</strong> {payment !== null ? payment?.bank : "Vietcombank"}</p>
                ) : null
            }
            
            <p>{payment?.own}</p>
            <p>{payment?.stk}</p>
            <div className="qr-code">
                <QRCode value={qrValue} size={256} />
            </div>
            <p>Quét mã QR để thanh toán</p>
            <PaymentSuccess isOpen={open} handleOk={handleOk} handleCancel={handleCancel}></PaymentSuccess>
        </div>
    );
};

export default QuickPayment;
