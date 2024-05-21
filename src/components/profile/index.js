import React, { useEffect, useState } from 'react';
import './style.css';
import avt from '../../images/avatar-vo-tri-99.jpg'
import { getUser } from '../../utils/Utils';
import Navigation from '../navigation';

const Profile = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(getUser())
    }, [])
    return (
        <div>
            <Navigation></Navigation>
            <div className="profile-container">
                <div className="profile-header">
                    <img src={avt} alt="Profile" className="profile-picture" />
                    <h1 className="profile-name">{user?.full_name}</h1>
                </div>
                <div className="profile-body">
                    <h2>Contact Information</h2>
                    <ul>
                        <li>Email: {user?.email}</li>
                        <li>Phone: {user?.phone}</li>
                        <li>Address: {user?.address}</li>
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default Profile;
