import './style.css'
import avt from '../../images/ip15.jpg'
import Navigation from '../navigation';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api_endpoint, { getProductById } from '../../utils/ApiEnpoint';
import { getUser } from '../../utils/Utils';
function ProductDetail() {
    const { product_id } = useParams();

    const [product,setProduct] = useState({})
    const navi = useNavigate()
    useEffect(()=>{
        if(!product_id) {
            return;
        }
        getProductById(product_id)
            .then(products => {
                console.log(products)
                setProduct(products);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    },[])

    const addToCart = () => {
        var user = getUser()
        if(user === null) {
            alert('Vui lòng đăng nhập!')
            return;
        }
        const data = {
            'product_id': product.product_id,
            'quantity': 1,
            'customer_id': user.id
        }
        fetch(api_endpoint.addToCart, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data['status'] === 1) {
                    navi(`/cart`)
                } else {
                    alert('Có lỗi xảy ra!')
                }
            })
            .catch(error => {
                console.log(error)
            });
    }
    return (
        <div className='component-home-containe'>
            <Navigation></Navigation>
            <section class="product-description">
                <div class="product-image">
                    <img id="preview-image" src={product?.image} />
                </div>
                <div class="product-info">
                    <h2>{product?.name}</h2>
                    <div className="book-rating">
                        {Array.from({ length: 5 }, (_, i) => (
                            <span
                                key={i}
                                className={`${i < 5 ? 'star' : 'star-muted'}`}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <p>Mô tả sản phẩm:</p>
                    <pre class="time-new">{product?.description}</pre>
                    <p class="price-d">Giá: ${product?.price}</p>
                    <button class="add-to-cart" onClick={addToCart}>Thêm vào giỏ hàng</button>
                </div>
            </section>

        </div>
    );
}

export default ProductDetail;