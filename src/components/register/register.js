import { useState } from 'react';
import './style.css'
import api_endpoint from '../../utils/ApiEnpoint';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [user,setUser] = useState({})
    const navi = useNavigate()
    const handleRegister = (e) => {
        e.preventDefault();

        if(user?.password !== user?.repassword) {
            alert('Mật khẩu nhập lại không khớp!')
            return;
        }
        fetch(api_endpoint.apiRegister, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                if (data['status'] === 1) {
                    alert('Đăng ký thành công!')
                    navi(`/login`)
                } else if(data['status'] === 2) {
                    alert('Tài khoản đã tồn tại!')
                } 
                else {
                    alert('Có lỗi xảy ra!')
                }
            })
            .catch(error => {
                console.log(error)
                alert('Có lỗi xảy ra!')
            });
    }
    return (
        <div class="form-container" onSubmit={handleRegister}>
            <form method="post">
                <h2>Register</h2>
                <div class="input-group">
                    <label for="email">First name:</label>
                    <input type="text" id="first_name" name="first_name" required
                    onChange={(e) => setUser({...user,first_name: e.target.value})}
                    />
                </div>
                <div class="input-group">
                    <label for="email">Last name:</label>
                    <input type="text" id="last_name" name="last_name" required
                    onChange={(e) => setUser({...user,last_name: e.target.value})}
                    />
                </div>
                <div class="input-group">
                    <label for="email">Andress:</label>
                    <input type="text" id="address" name="address" required
                    onChange={(e) => setUser({...user,address: e.target.value})}
                    />
                </div>
                <div class="input-group">
                    <label for="sdt">Phone:</label>
                    <input type="number" id="phone" name="phone" required
                    onChange={(e) => setUser({...user,phone: e.target.value})}
                    />
                </div>
                <div class="input-group">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required
                    onChange={(e) => setUser({...user,username: e.target.value})}
                    />
                </div>
                <div class="input-group">
                    <label for="password1">Password:</label>
                    <input type="password" id="password" name="password" required
                     onChange={(e) => setUser({...user,password: e.target.value})}
                    />
                </div>
                <div class="input-group">
                    <label for="password2">Confirm Password:</label>
                    <input type="password" id="re-password" name="repassword" required
                    onChange={(e) => setUser({...user,repassword: e.target.value})}
                    />
                </div>
                <button type="submit" class="btn-login">Register</button>
            </form>
        </div>
    );
}

export default Register