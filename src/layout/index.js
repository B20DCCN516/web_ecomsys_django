import { Outlet } from 'react-router-dom';
import './style.css'
import Header from '../components/header';
import Footer from '../components/footer';

function Layout() {

    return (
        <div className="container-layout">
            <div className="header-container">
                <Header></Header>
            </div>
            <div className='outlet-container'>
                <Outlet></Outlet>
            </div>
            <div className="footer-container">
                <Footer></Footer>
            </div>
        </div>
    )
}
export default Layout;