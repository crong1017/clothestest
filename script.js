document.addEventListener('DOMContentLoaded', function () {
    console.log("JavaScript 加載成功！");

    // 優惠彈跳視窗相關
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // 會員登入彈跳視窗相關
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.querySelector('.login-btn');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('submitLogin');

    // 購物車彈跳視窗相關
    const cartModal = document.getElementById('cartModal');
    const cartBtn = document.querySelector('.cart-btn');
    const closeCartModal = document.getElementById('closeCartModal');
    const cartItems = document.getElementById('cartItems');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckoutModal = document.getElementById('closeCheckoutModal');
    const codPayment = document.getElementById('codPayment');
    const creditPayment = document.getElementById('creditPayment');

    let selectedProduct = null;
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // 從本地儲存讀取購物車資料

    <section className="promotion">
        <button onClick="window.location.href='promotion.html'">查看優惠信息</button>
    </section>

    // 更新購物車清單
    function updateCart() {
        cartItems.innerHTML = '';
        let totalPrice = 0;
        if (cart.length === 0) {
            cartItems.innerHTML = '<li>購物車目前是空的。</li>';
        } else {
            cart.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = `${item.name} - NT.${item.price}`;
                cartItems.appendChild(listItem);
                totalPrice += parseInt(item.price);
            });
        }
        document.getElementById('cartTotal').textContent = `總金額：NT.${totalPrice}`;
    }

    // 顯示購物車的邏輯
    cartBtn.addEventListener('click', function () {
        updateCart();
        cartModal.style.display = 'block';
    });

    closeCartModal.addEventListener('click', function () {
        cartModal.style.display = 'none';
    });

    // 監聽「加入購物車」按鈕點擊
    document.querySelectorAll('.addToCartBtn').forEach(button => {
        button.addEventListener('click', function () {
            const productName = this.getAttribute('data-product-name');
            const productPrice = this.getAttribute('data-product-price');

            // 將這些值輸出到控制台，檢查它們是否正確
            console.log('Product Name:', productName);
            console.log('Product Price:', productPrice);
            if (!productName || !productPrice) {
                alert('商品資料有誤，請稍後再試');
                return;
            }

            selectedProduct = {
                name: productName,
                price: productPrice
            };

            alert(`是否要將「${selectedProduct.name}」加入購物車？`);
            cart.push(selectedProduct); // 將商品添加到購物車
            localStorage.setItem('cart', JSON.stringify(cart)); // 將購物車資料儲存到本地
            updateCart(); // 更新購物車顯示
            alert(`${selectedProduct.name} 已加入購物車`);
        });
    });

    // 結帳
    checkoutBtn.addEventListener('click', function () {
        checkoutModal.style.display = 'block';
    });

    // 處理支付方式選擇
    codPayment.addEventListener('click', function () {
        alert('您選擇了貨到付款');
        cart = []; // 清空購物車
        localStorage.setItem('cart', JSON.stringify(cart)); // 更新本地儲存
        updateCart(); // 更新購物車顯示
        checkoutModal.style.display = 'none'; // 關閉結帳視窗
    });

    creditPayment.addEventListener('click', function () {
        alert('您選擇了信用卡支付');
        cart = []; // 清空購物車
        localStorage.setItem('cart', JSON.stringify(cart)); // 更新本地儲存
        updateCart(); // 更新購物車顯示
        checkoutModal.style.display = 'none'; // 關閉結帳視窗
    });

    // 顯示會員登入彈跳視窗
    loginBtn.addEventListener('click', function () {
        loginModal.style.display = 'block'; // 顯示登入視窗
    });

    // 關閉會員登入彈跳視窗
    closeLoginModal.addEventListener('click', function () {
        loginModal.style.display = 'none'; // 關閉登入視窗
    });

    // 點擊外部區域關閉彈跳視窗
    window.addEventListener('click', function (event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
        if (event.target === checkoutModal) {
            checkoutModal.style.display = 'none';
        }
    });
});
