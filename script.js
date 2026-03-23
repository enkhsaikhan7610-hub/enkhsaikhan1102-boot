const unitPrice = 250000;
const delFee = 15000;
let cart = {};
const items = ["Сонгодог Лофер", "Монгол Гутал", "Ажлын Ботинк", "Оксфорд Гутал", "Чөлөөт Пүүз", "Хагас Түрийтэй", "Зуны Мокасин", "Спортын Хөнгөн", "Гоёлын Ботинк", "Өвлийн Дулаан"];

// Бүтээгдэхүүнийг дэлгэцэнд гаргах
function renderProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = items.map((name, i) => `
        <div class="product-card">
            <img src="https://picsum.photos/400/500?random=${i}" style="width:100%; border-radius:12px;">
            <h4>${name}</h4>
            <div style="color:#d4af37;">${unitPrice.toLocaleString()}₮</div>
            <input type="number" min="0" placeholder="Тоо ширхэг" oninput="updateCart(${i}, this.value)">
        </div>
    `).join('');
}

function updateCart(id, val) {
    const v = parseInt(val);
    if (v > 0) cart[id] = v; else delete cart[id];
    calc();
}

function calc() {
    const isDel = document.getElementById('del-check').checked;
    document.getElementById('address').style.display = isDel ? 'block' : 'none';

    let totalQty = 0;
    Object.values(cart).forEach(q => totalQty += q);
    
    const total = (totalQty * unitPrice) + (isDel && totalQty > 0 ? delFee : 0);
    document.getElementById('res-total').innerText = total.toLocaleString();
    
    const name = document.getElementById('p-name').value.trim();
    const phone = document.getElementById('p-phone').value.trim();
    const email = document.getElementById('p-email').value.trim();
    
    const canSubmit = totalQty > 0 && name && phone.length >= 8 && email.includes('@');
    document.getElementById('submit-btn').disabled = !canSubmit;
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

    // EmailJS илгээх хэсэг
    emailjs.send("service_izdours", "g0dk3hw", params)
    .then(function(res) {
        alert("Захиалга амжилттай! Бид удахгүй холбогдох болно.");
        window.location.reload();
    })
    .catch(function(err) {
        alert("Алдаа гарлаа: " + JSON.stringify(err));
        btn.innerText = "ЗАХИАЛАХ";
        btn.disabled = false;
    });
}

window.onload = renderProducts;
