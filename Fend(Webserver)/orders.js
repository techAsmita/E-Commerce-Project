const ordersListEl = document.getElementById('orders-list');

async function loadOrders() {
  const token = getToken();
  if (!token) { alert('Please login'); window.location.href = 'login.html'; return; }

  const res = await fetch(`${baseURL}/orders`, {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const orders = await res.json();
  renderOrders(orders);
}

function renderOrders(orders) {
  if (!ordersListEl) return;
  if (!orders || orders.length === 0) {
    ordersListEl.innerHTML = '<p>No orders found.</p>'; return;
  }
  let html = '';
  orders.forEach(o => {
    html += `<div class="card mb-3">
      <div class="card-body">
        <h5>Order #${o.id} — ₹${o.total} — ${escapeHtml(o.status || 'Placed')}</h5>
        <p><strong>Address:</strong> ${escapeHtml(o.address || '')}</p>
        <p><strong>Placed on:</strong> ${o.created_at || o.createdAt || ''}</p>
      </div>
    </div>`;
  });
  ordersListEl.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', loadOrders);