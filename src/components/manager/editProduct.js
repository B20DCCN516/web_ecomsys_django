import './style.css'

function EditProduct() {

    return (
        <div className="container mt-5">
            <form method="post" enctype="multipart/form-data" className="container-edit">
                <div className="contain-form">
                    <div className="contain-form-1">
                        <div className="mb-3">
                            <label for="name" className="form-label">Tên Sản Phẩm</label>
                            <input type="text" className="form-control" id="name" name="name" />
                        </div>

                        <div className="mb-3">
                            <label for="description" className="form-label">Loại Sản Phẩm</label>
                            <select className="form-control" id="categorySelect" name="category_id">
                                <option disabled hidden>Chọn loại sản phẩm</option>
                                <option>
                                    aaa
                                </option>
                            </select>
                        </div>
                        <div className="mb-3 author-container" style={{"display": "none"}}>
                            <label for="description" className="form-label">Tác giả</label>
                            <input type="text" className="form-control" id="author" name="author" />
                        </div>

                        <div className="mb-3 clothes-container" style={{"display": "none"}}>
                            <label for="description" className="form-label">Nhãn hàng</label>
                            <input type="text" className="form-control" id="brand" name="brand" />
                        </div>

                        <div className="mb-3 clothes-container" style={{"display": "none"}}>
                            <label for="description" className="form-label">Màu sắc</label>
                            <input type="text" className="form-control" id="color" name="color" />
                        </div>

                        <div className="mb-3 clothes-container" style={{"display": "none"}}>
                            <label for="description" className="form-label">Size</label>
                            <input type="text" className="form-control" id="size" name="size" />
                        </div>

                        <div className="mb-3">
                            <label for="description" className="form-label">Mô Tả Sản Phẩm</label>
                            <textarea className="form-control text-area" id="description" name="description"
                                required>hello</textarea>

                        </div>

                        <div className="mb-3">
                            <label for="price" className="form-label">Giá Sản Phẩm</label>
                            <input type="number" className="form-control" id="price" name="price"
                                required />
                        </div>
                    </div>

                    <div className="contain-form-2">
                        <div className="mb-3">
                            <label for="image" className="form-label">Hình Ảnh Sản Phẩm</label>
                            <input type="file" className="form-control" id="image" name="image" accept="image/*"
                            />
                            <img id="preview-image" src=""
                                alt="Ảnh Sản Phẩm" style={{ width: '90%' }} />
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Lưu</button>
            </form>
        </div>
    );
}
export default EditProduct;