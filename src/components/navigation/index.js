import './style.css'
import avt from '../../images/ip15.jpg'
import { Link } from 'react-router-dom';

function Navigation() {

    return (
        <div className='navigation-container'>
            <nav>
                <ul>
                    <li>
                        <Link to={`/`}>Trang chủ</Link>
                    </li>
                    <li><Link to={`/cart`}>Giỏ hàng</Link></li>
                    <li><Link to={`/`}>Thông tin</Link></li>
                    <li><Link to={`/manager`}>Quản lý</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;