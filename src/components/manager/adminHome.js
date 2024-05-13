
import Navigation from '../navigation';
import './style.css'
function AdminHome() {

    return (
        <div class="admin-home-container">
            <h4>Danh sách sản phẩm</h4>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Đơn giá</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Iphone</td>
                        <td class="item-description">
                            <pre class="time-new">hello</pre>

                        </td>
                        <td>1000$</td>
                        <td>
                            <button class="btn btn-primary" >Sửa</button>
                            <button class="btn btn-danger" >Xóa</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button class="btn btn-primary">Thêm sản phẩm</button>
        </div>
    );
}

export default AdminHome;