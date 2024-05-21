import { format, isValid, parseISO } from 'date-fns';

// Hàm chuyển đổi định dạng ngày
export const formatDateTime = (dateString) => {
    try {
        const date = parseISO(dateString);
        if (isValid(date)) {
            return format(date, 'dd/MM/yyyy HH:mm');
        } else {
            return 'Invalid date';
        }
    } catch (error) {
        return 'Invalid date';
    }
};
export function getUser() {
    var userJson = sessionStorage.getItem("user");
    var user = null
    if (userJson) {
        user = JSON.parse(userJson);
    }
    return user
}

export function getItem(name) {
    var userJson = sessionStorage.getItem(name);
    var user = null
    if (userJson) {
        user = JSON.parse(userJson);
    }
    return user
}


export function totalPriceProduct(order) {
    const totalPrice = order?.book?.price * order.quantity;
    const formattedPrice = totalPrice.toLocaleString('vi-VN') + 'đ';
    return formattedPrice;
}

export function totalPrice(order) {
    const totalPrice = order?.book?.price * order?.quantity + 16500;
    const formattedPrice = totalPrice.toLocaleString('vi-VN') + 'đ';
    return formattedPrice;
}

export function Price(price) {
    const totalPrice = price;
    const formattedPrice = totalPrice.toLocaleString('vi-VN') + 'đ';
    return formattedPrice;
}

export function scrollToTop() {
    setTimeout(function () {
        window.scrollTo(0, 0);
    }, 500);

};

export function isValidDate(inputDate) {
    let parts = [];
    if (inputDate.indexOf('-') !== -1) {
        parts = inputDate.split("-");
    } else if (inputDate.indexOf('/') !== -1) {
        parts = inputDate.split("/");
    }
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const day = parseInt(parts[2]);
    // Kiểm tra ngày không hợp lệ nếu năm có dạng "0" ở đầu
    if (year.toString().startsWith("0") || year.toString().length !== 4) {
        return false;
    }

    // Tạo một đối tượng Date từ các thành phần ngày, tháng, năm
    const date = new Date(year, month, day);

    // Kiểm tra xem ngày được tạo thành công và các thành phần ngày, tháng, năm không bị thay đổi
    if (
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day
    ) {
        return true; // Ngày hợp lệ
    }

    return false; // Ngày không hợp lệ
};

