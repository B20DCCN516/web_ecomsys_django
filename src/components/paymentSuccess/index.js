import React from 'react';
import './style.css';
import icon from '../../images/success.png'
import { Modal } from 'antd';
import { Link } from 'react-router-dom';

const PaymentResult = ({isOpen ,handleOk,handleCancel}) => {

    return (
        <Modal
            open={isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            okButtonProps={{
                disabled: true,
            }}
            cancelButtonProps={{
                disabled: true,
            }}
            width={650}
            height={400}
        >
        <div className="payment-success">
            <div className="success-container">
                <div className="icon-container">
                    <img src={icon} alt='avt'></img>
                </div>
                <h1>Thanh toán thành công</h1>
                <p>Cảm ơn bạn đã thanh toán!</p>
                <Link to={`/`}>
                    <p className="return-home-button">Quay về trang chủ</p>
                </Link>
                
            </div>
        </div>
        </Modal>
    );
};

export default PaymentResult;
