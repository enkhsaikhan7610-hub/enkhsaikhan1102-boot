const unitPrice = 250000;
const delFee = 15000;
let cart = {};
const items = ["Сонгодог 3D Лофер", "Монгол Гутал", "Ажлын Ботинк", "Оксфорд Гутал", "Чөлөөт Пүүз", "Хагас Түрийтэй", "Зуны Мокасин", "Спортын Хөнгөн", "Гоёлын Ботинк", "Өвлийн Дулаан"];

function renderProducts() {
    const list = document.getElementById('product-list');
    // 0-р индекс нь 3D модель тул 1-ээс эхлэн бусад зургуудыг нэмнэ
    for (let i = 1; i < items.length; i++) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="https://picsum.photos/400/500?random=${i}" style="width:100%; border-radius:12px;">
            <h4>${items[i]}</h4>
            <div style="color:#d4af37; margin-bottom:5px;">${unitPrice.toLocaleString()}₮</div>
            <input type="number" min="0" placeholder="Тоо ширхэг" oninput="updateCart(${i}, this.value)">
        `;
        list.appendChild(card);
    }
}

function updateCart(id, val) {
    const v = parseInt(val);
    if (v > 0) cart[id] = v; else delete cart[id];
    calc();
}

function calc() {
    const isDel = document.getElementById('del-check').checked;
    const addressInput = document.getElementById('address');
    if (addressInput) addressInput.style.display = isDel ? 'block' : 'none';

    let totalQty = 0;
    Object.values(cart).forEach(q => totalQty += q);
    
    // Төлбөр тооцоолох: Бараанууд + (Хүргэлт байгаа бол)
    const subTotal = totalQty * unitPrice;
    const finalTotal = subTotal + (isDel && totalQty > 0 ? delFee : 0);
    
    document.getElementById('res-total').innerText = finalTotal.toLocaleString();
    
    const name = document.getElementById('p-name').value.trim();
    const phone = document.getElementById('p-phone').value.trim();
    const email = document.getElementById('p-email').value.trim();
    
    // Захиалах товчийг идэвхжүүлэх шалгуур
    const canSubmit = totalQty > 0 && name !== "" && phone.length >= 8 && email.includes('@');
    const btn = document.getElementById('submit-btn');
    btn.disabled = !canSubmit;
    btn.style.opacity = canSubmit ? "1" : "0.5";
}

function sendOrder() {
    const btn = document.getElementById('submit-btn');
    btn.innerText = "Илгээж байна...";
    btn.disabled = true;

    let details = "";
    Object.keys(cart).forEach(id => {
        details += `${items[id]} (${cart[id]}ш); `;
    });

    const params = {
        from_name: document.getElementById('p-name').value,
        phone: document.getElementById('p-phone').value,
        user_email: document.getElementById('p-email').value,
        address: document.getElementById('address').value || "Дэлгүүрээс авах",
        order_details: details,
        total_price: document.getElementById('res-total').innerText + "₮",
        order_id: "#UK-" + Math.floor(1000 + Math.random() * 9000)
    };

    emailjs.send("service_izdours", "template_ix01rik", params)
    .then(function() {
        alert("Захиалга амжилттай илгээгдлээ! Тантай удахгүй холбогдох болно.");
        window.location.reload();
    })
    .catch(function(err) {
        alert("Алдаа гарлаа: " + JSON.stringify(err));
        btn.innerText = "ЗАХИАЛАХ";
        btn.disabled = false;
    });
}

window.onload = renderProducts;
