const unitPrice = 250000;
const deliveryFee = 15000;

const sizeInputs = document.querySelectorAll('.size-input');
const deliveryCheck = document.getElementById('delivery-check');
const addressField = document.getElementById('address-field');
const deliveryPriceDisplay = document.getElementById('delivery-price');
const totalQtyDisplay = document.getElementById('total-qty');
const totalAmountDisplay = document.getElementById('total-amount');
const submitBtn = document.getElementById('submit-btn');

function calculate() {
    let totalQty = 0;
    let details = "";

    sizeInputs.forEach(input => {
        let val = parseInt(input.value) || 0;
        if (val > 0) {
            totalQty += val;
            details += `${input.dataset.size}р:${val}ш `;
        }
    });

    let currentDelivery = deliveryCheck.checked ? deliveryFee : 0;
    addressField.style.display = deliveryCheck.checked ? 'block' : 'none';

    const totalAmount = (totalQty * unitPrice) + currentDelivery;

    totalQtyDisplay.innerText = totalQty;
    deliveryPriceDisplay.innerText = currentDelivery.toLocaleString();
    totalAmountDisplay.innerText = totalAmount.toLocaleString();

    if (totalQty > 0) {
        submitBtn.disabled = false;
        submitBtn.innerText = "Захиалга илгээх";
    } else {
        submitBtn.disabled = true;
        submitBtn.innerText = "Гутал сонгоно уу";
    }

    document.getElementById('hidden-details').value = details;
    document.getElementById('hidden-total').value = totalAmount.toLocaleString() + " ₮";
}

sizeInputs.forEach(i => i.addEventListener('input', calculate));
deliveryCheck.addEventListener('change', calculate);
