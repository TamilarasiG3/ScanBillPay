let cart = [];
let html5QrCode = null;
let scannerActive = false;

// Add product to cart
function addToCart(name, price) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: Date.now(), name, price, qty: 1 });
  }
  renderCart();
}

// Render cart
function renderCart() {
  const container = document.getElementById('cart-items');
  container.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    container.innerHTML += `<div>${item.name} × ${item.qty} - ₹${(item.price*item.qty).toFixed(2)}</div>`;
  });

  document.getElementById('cart-total').textContent = total.toFixed(2);
}

// Toggle scanner
document.getElementById('toggle-scanner').addEventListener('click', () => {
  const reader = document.getElementById('qr-reader');
  const btn = document.getElementById('toggle-scanner');

  if (!scannerActive) {
    reader.style.display = 'block';
    btn.textContent = 'Stop Scanner';

    html5QrCode = new Html5Qrcode("qr-reader");

    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      onScanSuccess
    );

    scannerActive = true;
  } else {
    html5QrCode.stop().then(() => {
      reader.style.display = 'none';
      btn.textContent = 'Start Scanner';
      scannerActive = false;
    });
  }
});

// On QR scanned
function onScanSuccess(decodedText) {
  try {
    const product = JSON.parse(decodedText);
    addToCart(product.name, parseFloat(product.price));
  } catch {
    const parts = decodedText.split("|");
    if (parts.length === 2) {
      addToCart(parts[0], parseFloat(parts[1]));
    } else {
      alert("Invalid QR format");
    }
  }
}

// Manual add
document.getElementById('add-manual').addEventListener('click', () => {
  const name = document.getElementById('manual-name').value.trim();
  const price = parseFloat(document.getElementById('manual-price').value);
  if(!name || isNaN(price) || price <= 0) { alert('Enter valid details'); return; }
  addToCart(name, price);
  document.getElementById('manual-name').value = '';
  document.getElementById('manual-price').value = '';
});

// Send SMS & generate payment QR
document.getElementById('send-sms').addEventListener('click', () => {
  const phone = document.getElementById('customer-phone').value.trim();
  if(!phone || cart.length===0) { alert('Enter phone and add items'); return; }

  let total = cart.reduce((sum, item)=>sum+item.price*item.qty,0);
  let message = `Your Bill: ${cart.map(i=>i.name+'×'+i.qty).join(', ')}. Total: ₹${total.toFixed(2)}`;
  
  // Send SMS (opens SMS app)
  const smsUrl = `sms:${phone}?body=${encodeURIComponent(message)}`;
  window.open(smsUrl, '_blank');

  // Generate QR for payment (dummy UPI link)
  const upiLink = `upi://pay?pa=merchant@upi&pn=StoreName&am=${total.toFixed(2)}&cu=INR`;
  const qrDisplay = document.getElementById('qr-display');
  qrDisplay.innerHTML = '';
  QRCode.toCanvas(upiLink, { width: 200 }, (err, canvas) => {
    if(err) { qrDisplay.innerText='Failed to generate QR'; return; }
    qrDisplay.appendChild(canvas);
  });
});