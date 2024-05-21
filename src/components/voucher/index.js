import React, { useState, useEffect } from 'react';
import imgVoucher from '../../images/voucher.png'
import './style.css'; // Import file CSS
import api_endpoint from '../../utils/ApiEnpoint';
import { Modal } from 'antd';

const VoucherList = ({ isOpen, handleOk, handleCancel, onSelectVoucher }) => {
    const [vouchers, setVouchers] = useState([]);

    useEffect(() => {
        // Fetch data from API
        fetch(`${api_endpoint.apiGetVoucher}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setVouchers(data)
            })
            .catch(error => console.error('There was a problem with your fetch operation:', error));
    }, []);

    const handleSelect = (item) => {
        onSelectVoucher(item)
        handleOk()
    } 
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
            <div className="voucher-list">
            
                <h1>Voucher List</h1>
                <ul className='voucher-container'>
                    {vouchers.map((voucher) => (
                        <li key={voucher.id} className="voucher-item" onClick={() => handleSelect(voucher)}>
                            <img src={imgVoucher} alt='avt'></img>
                            <p className="voucher-code">{voucher.name}</p>
                        </li>
                    ))}
                </ul>
        </div>
        </Modal>
        
    );
};

export default VoucherList;
