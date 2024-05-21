import React, { useState, useEffect } from 'react';
import imgVoucher from '../../images/ship.png'
import './style.css'; // Import file CSS
import api_endpoint from '../../utils/ApiEnpoint';
import { Modal } from 'antd';

const ShipmentList = ({ isOpen, handleOk, handleCancel, onSelectShipment }) => {
    const [shipments, setShipments] = useState([]);

    useEffect(() => {
        // Fetch data from API
        fetch(`${api_endpoint.apiGetShipment}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setShipments(data)
            })
            .catch(error => console.error('There was a problem with your fetch operation:', error));
    }, []);

    const handleSelect = (item) => {
        onSelectShipment(item)
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

                <h1>Shipment List</h1>
                <ul className='voucher-container'>
                    {shipments.map((ship) => (
                        <li key={ship.id} className="voucher-item" onClick={() => handleSelect(ship)}>
                            <img src={imgVoucher} alt='avt'></img>
                            <div className='ship-inf'>
                                <p className="voucher-code">{ship.name}</p>
                                <p className="ship-des">{ship.description}</p>
                            </div>
                            <p className="ship-price">${ship.price}</p>

                        </li>
                    ))}
                </ul>
            </div>
        </Modal>

    );
};

export default ShipmentList;
