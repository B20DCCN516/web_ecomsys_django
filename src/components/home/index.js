import { useState } from 'react';
import avt from '../../images/ip15.jpg'
import Navigation from '../navigation';

import './style.css'
import { useEffect } from 'react';
import api_endpoint, { getProduct } from '../../utils/ApiEnpoint';
import { useNavigate } from 'react-router-dom';
import { Spin, Button } from 'antd';

import {getUser} from '../../utils/Utils'
function Home() {

    const [products, setProducts] = useState([])
    const [isDone,setIsDone] = useState(false)
    const [key,setKey] = useState('')
    const [loading,setLoading] = useState(false)
    const navi = useNavigate()
    useEffect(() => {
        getProduct()
            .then(products => {
                console.log(products)
                setProducts(products);
                setIsDone(true)
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });

    }, [])


    const handleClickDetail = (product_id) => {
        navi(`/product/${product_id}`)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('search')
        setLoading(true)
        fetch(api_endpoint.apiSearchByName+key)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data['category_items'] !== undefined) {
                setProducts(data['category_items'])
                setLoading(false)
            } 
        })
        .catch(error => console.error('There was a problem with your fetch operation:', error));
    }
    return (
        <div className="component-home-container">
            <Navigation></Navigation>
            <div class="search-container">
                <form id="form-search">
                    <div class="container-input">
                        <input type="text" placeholder="Tìm kiếm..." name="search" id="search-input" onChange={(e) => setKey(e.target.value)}/>
                        <img
                            id="preview-image"
                            src={avt}
                            alt="Ảnh Sản Phẩm"
                            style={{ width: '80px', display: 'none' }}
                            name="image"
                        />

                    </div>
                    <select name="search-type" id="search-type">
                        <option value="keyword" selected>Tìm kiếm theo từ khóa</option>
                        <option value="image">Tìm kiếm theo hình ảnh</option>
                    </select>
                    <Button type="submit" loading={loading} onClick={handleSearch}>Tìm</Button>
                </form>
                <button id="voiceSearchBtn" ><i class="fa-solid fa-microphone"></i></button>
            </div>
            {isDone ? (
   
                    products?.map((product) => (
                        <div>
                            <h2 className="home-name-category">{product?.category?.name}</h2>
                            <div className='list-product'>
                                {
                                    product?.items?.map((item) => (
                                        <div className="product-container" key={item.product_id} onClick={() => handleClickDetail(item.product_id)}>
                                            <div className="book-image">
                                                <img src={item.image} alt="img" />
                                            </div>
                                            <div className="book-info">
                                                <h2 className="book-title">{item?.name}</h2>
                                                <p className="book-author">{item?.category_id === 0 ? item?.author : ""}</p>
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
                                                <p className="book-price">${item?.price}</p>
                                            </div>
                                        </div>
                                    ))
                                }


                            </div>

                        </div>
                    ))
            ): (
                <Spin tip="Loading" size="large" fullscreen></Spin>
            )}



        </div>
    );
}

export default Home;