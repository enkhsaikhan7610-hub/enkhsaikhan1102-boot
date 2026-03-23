// Script for Uran Khiits Product Showcase Website

document.addEventListener('DOMContentLoaded', function() {
    // DOM элементүүдийг ачаалсны дараа ажиллуулах

    // Элементүүдийг сонгох
    const quantityDisplay = document.getElementById('quantity-display');
    const totalPriceDisplay = document.getElementById('total-price-display');
    const deliveryOption = document.getElementById('delivery-option');
    const checkoutBtn = document.getElementById('checkout-btn');
    const paymentModal = document.getElementById('payment-modal');
    const closeModalBtn = document.querySelector('.close');

    // Бүтээгдэхүүний үндсэн үнэ (жишээ)
    const productPricePerUnit = 150000;
    let currentQuantity = 1;

    // ШИНЭЧЛЭГДСЭН: Тоо ширхэгийг өөрчлөх функц
    function changeQuantity(change) {
        currentQuantity += change;
        // Тоо ширхэгийг 1-ээс доош оруулахгүй байх
        if (currentQuantity < 1) {
            currentQuantity = 1;
        }
        updateQuantityDisplay();
        calculateTotalPrice();
    }

    // Тоо ширхэгийн дэлгэцийг шинэчлэх
    function updateQuantityDisplay() {
        quantityDisplay.textContent = currentQuantity;
    }

    // Нийт үнийг тооцоолох функц
    function calculateTotalPrice() {
        let total = productPricePerUnit * currentQuantity;

        // Хүргэлтийн сонголтоор үнийг өөрчлөх (pick-up бол хямдралтай)
        if (deliveryOption.value === 'pick-up') {
            total *= 0.9; // 10% хямдрал
        }

        // Үнийг₮ форматтайгаар харуулах
        totalPriceDisplay.textContent = total.toLocaleString('mn-MN') + '₮';
    }

    // Хүргэлтийн сонголт өөрчлөгдөхөд нийт үнийг дахин тооцоолох
    deliveryOption.addEventListener('change', calculateTotalPrice);

    // Захиалах товч дээр дарахад төлбөрийн модалыг нээх
    checkoutBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Форм илгээхийг зогсоох
        paymentModal.style.display = 'block';
    });

    // Модалыг хаах товчлуур
    closeModalBtn.addEventListener('click', function() {
        paymentModal.style.display = 'none';
    });

    // Модалын гадна талд дарахад хаах
    window.addEventListener('click', function(event) {
        if (event.target === paymentModal) {
            paymentModal.style.display = 'none';
        }
    });

    // Бүтээгдэхүүний зураг/мэдээллийг шинэчлэх (Жишээ)
    // Хэрэв та олон бүтээгдэхүүнтэй бол, захиалах хэсэгт аль нэгийг нь сонгох логик нэмэх шаардлагатай.

    // Анхны үнийг тооцоолох
    calculateTotalPrice();
});
