const cartArea = document.getElementById('cart-area');
const placeOrderBtn = document.getElementById('place-order');

async function loadCart() {
  const token = getToken();
  if (!token) { alert('Please login'); window.location.href = 'login.html'; return; }

  const res = await fetch(`${baseURL}/cart`, {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const items = await res.json();
  renderCart(items);
}

function renderCart(items) {
  if (!cartArea) return;
  if (!items || items.length === 0) {
    cartArea.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }
  let html = `<table class="table"><thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th><th></th></tr></thead><tbody>`;
  let total = 0;
  items.forEach(it => {
    const subtotal = it.price * it.quantity;
    total += subtotal;
    html += `<tr>
      <td>${escapeHtml(it.name)}</td>
      <td>₹${it.price}</td>
      <td>${it.quantity}</td>
      <td>₹${subtotal}</td>
      <td><button class="btn btn-sm btn-danger" onclick="removeCart(${it.id})">Remove</button></td>
    </tr>`;
  });
  html += `</tbody></table><div class="mt-3"><h5>Total: ₹${total.toFixed(2)}</h5></div>`;
  cartArea.innerHTML = html;
}

async function removeCart(cartId) {
  const token = getToken();
  if (!token) return;
  const res = await fetch(`${baseURL}/cart/${cartId}`, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const data = await res.json();
  if (res.ok) { alert(data.message || 'Removed'); loadCart(); }
  else alert(data.message || 'Failed');
}

if (placeOrderBtn) {
  placeOrderBtn.addEventListener('click', async () => {
    const token = getToken();
    if (!token) return;
    const address = document.getElementById('address').value;
    if (!address) { alert('Enter address'); return; }
    const res = await fetch(`${baseURL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ address })
    });
    const data = await res.json();
    if (res.ok) { alert(data.message || 'Order placed'); window.location.href = 'orders.html'; }
    else alert(data.message || 'Failed to place order');
  });
}

document.addEventListener('DOMContentLoaded', loadCart);