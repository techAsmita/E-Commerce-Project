const adminProductsEl = document.getElementById('admin-products');
const adminOrdersEl = document.getElementById('admin-orders');
const addProductForm = document.getElementById('addProductForm');

async function loadAdminData() {
  const user = getUser();
  if (!user || !user.is_admin) { alert('Admin access only'); window.location.href = 'login.html'; return; }
  await loadAdminProducts();
  await loadAdminOrders();
}

async function loadAdminProducts() {
  const res = await fetch(`${baseURL}/products`);
  const products = await res.json();
  renderAdminProducts(products);
}

function renderAdminProducts(products) {
  if (!adminProductsEl) return;
  let html = `<table class="table"><thead><tr><th>Name</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead><tbody>`;
  products.forEach(p => {
    html += `<tr>
      <td>${escapeHtml(p.name)}</td>
      <td>₹${p.price}</td>
      <td>${p.stock}</td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id})">Delete</button>
      </td>
    </tr>`;
  });
  html += '</tbody></table>';
  adminProductsEl.innerHTML = html;
}

async function deleteProduct(id) {
  const token = getToken();
  if (!token) return;
  const res = await fetch(`${baseURL}/products/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const data = await res.json();
  if (res.ok) { alert(data.message || 'Deleted'); loadAdminProducts(); }
  else alert(data.message || 'Delete failed');
}

if (addProductForm) {
  addProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(addProductForm);
    const body = {
      name: fd.get('name'),
      price: parseFloat(fd.get('price') || 0),
      description: fd.get('description'),
      stock: parseInt(fd.get('stock') || 0),
      image: fd.get('image')
    };
    const token = getToken();
    const res = await fetch(`${baseURL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (res.ok) { alert('Product added'); addProductForm.reset(); loadAdminProducts(); }
    else alert(data.message || 'Add failed');
  });
}

async function loadAdminOrders() {
  const token = getToken();
  const res = await fetch(`${baseURL}/orders`, {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const orders = await res.json();
  renderAdminOrders(orders);
}

function renderAdminOrders(orders) {
  if (!adminOrdersEl) return;
  if (!orders || orders.length === 0) { adminOrdersEl.innerHTML = '<p>No orders</p>'; return; }
  let html = '';
  orders.forEach(o => {
    html += `<div class="card mb-2"><div class="card-body">
      <h6>Order #${o.id} - ₹${o.total} - ${escapeHtml(o.status)}</h6>
      <p><strong>User:</strong> ${o.user_id || o.user?.email || ''}</p>
      <p><strong>Address:</strong> ${escapeHtml(o.address || '')}</p>
    </div></div>`;
  });
  adminOrdersEl.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', loadAdminData);