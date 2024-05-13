import React, { useState } from 'react';
import './style.css'; // Import your CSS file

import { useNavigate } from 'react-router-dom';
import api_endpoint from '../../utils/ApiEnpoint';
function Login() {
    const [user,setUser] = useState({})
    const navi = useNavigate();

    const handleClickRegis = () => {
        navi(`/register`)
    }
    const handleLogin = (e) => {
        e.preventDefault();

        fetch(api_endpoint.apiLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data['status'] === 1) {
                    alert('Đăng nhập thành công!')
                    window.dispatchEvent(new CustomEvent('user-login', { detail: { user: data["customer"] } }));
                    navi(`/`)
                } else {
                    alert('Tài khoản hoặc mật khẩu không chính xác!')
                }
            })
            .catch(error => {
                console.log(error)
                alert('Có lỗi xảy ra!')
            });
    }
    return (
        <div>
            <div className="form-container">
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" required onChange={(e) => setUser({...user,username: e.target.value})}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required onChange={(e) => setUser({...user,password: e.target.value})}/>
                    </div>
                    <button type="submit" className="btn-login">Login</button>
                    <p>You don't have account?
                        <span id='span-register' onClick={handleClickRegis}> register</span>
                    </p>
                    
                </form>
            </div>
        </div>
    );
}

export default Login;
