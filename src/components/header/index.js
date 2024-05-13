import { useEffect, useState } from 'react';
import avt from '../../images/avt.png'
import './style.css'
import { Menu, Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
function Header() {
    const [user, setUser] = useState({})

    const navi = useNavigate();

    const handleClickLogin = () => {
        navi(`/login`)
    }

    useEffect(() => {
        const handleLogin = (event) => {
            setUser(event.detail.user);
            sessionStorage.setItem("user",JSON.stringify(event.detail.user))
        };

        window.addEventListener('user-login', handleLogin);

        return () => {
            window.removeEventListener('user-login', handleLogin);
        };
    }, [])

    const logout = () => {
        sessionStorage.removeItem("user")
        setUser({})
        navi(`/login`)
    }
    const menu = (
        <Menu>
            <Menu.Item key="1">
                Thông tin cá nhân
            </Menu.Item>
            <Menu.Item key="2">
                <a href="/logout">Lịch sử</a>
            </Menu.Item>
            <Menu.Item key="3" onClick={logout}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="component-header-container">
            <h2>Ecomsys</h2>
            <div className="inf-user">
                {
                    user?.id ? (
                        <Dropdown
                            overlay={menu}
                            placement="bottomLeft"
                            arrow
                        >
                            <div style={{ cursor: 'pointer' }} className='infor'> {/* Thêm một div bao quanh để đảm bảo hành vi như mong đợi */}
                                <img src={avt} alt='img'></img>
                                <p>{user?.full_name}</p>
                            </div>
                        </Dropdown>
                    ) : (
                        <button className='btn-login btn-login-custom' onClick={handleClickLogin}>Login</button>
                    )
                }

            </div>
            
        </div>
    )
}
export default Header;