const unitPrice = 250000;
const delFee = 15000;

const inputs = document.querySelectorAll('.qty');
const check = document.getElementById('del-check');
const addressInput = document.getElementById('address');
const resQty = document.getElementById('res-qty');
const resTotal = document.getElementById('res-total');
const submitBtn = document.getElementById('submit-btn');

function calc() {
    let count = 0;
    let info = "";

    inputs.forEach(i => {
        let v = parseInt(i.value) || 0;
        if(v > 0) {
            count += v;
            info += i.dataset.size + "р:" + v + "ш ";
        }
    });

    let currentDel = check.checked ? delFee : 0;
    addressInput.style.display = check.checked ? 'block' : 'none';

    const final = (count * unitPrice) + currentDel;

    resQty.innerText = count;
    resTotal.innerText = final.toLocaleString();

    // Захиалгын товч идэвхжүүлэх
    if (count > 0) {
        submitBtn.disabled = false;
        submitBtn.innerText = "Захиалга илгээх";
    } else {
        submitBtn.disabled = true;
        submitBtn.innerText = "Гутал сонгоно уу";
    }

    // Netlify Forms-д илгээх утгууд
    document.getElementById('hid-details').value = info + (check.checked ? "| Хүргэлттэй" : "");
    document.getElementById('hid-total').value = final.toLocaleString() + " ₮";
}

inputs.forEach(el => el.addEventListener('input', calc));
check.addEventListener('change', calc);

// Эхлэхэд нэг удаа ажиллуулах
calc();
