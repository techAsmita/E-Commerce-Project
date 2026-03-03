const productListEl = document.getElementById('product-list');

async function fetchProducts() {
  const res = await fetch(`${baseURL}/products`);
  const products = await res.json();
  renderProducts(products);
}

function renderProducts(products) {
  if (!productListEl) return;
  productListEl.innerHTML = '';
  products.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-3';
    col.innerHTML = `
      <div class="card h-100">
        <img src="${p.image || 'https://via.placeholder.com/400x200'}" class="card-img-top" style="height:200px; object-fit:cover" alt="${escapeHtml(p.name)}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${escapeHtml(p.name)}</h5>
          <p class="card-text">${escapeHtml(p.description || '')}</p>
          <p class="mt-auto"><strong>₹${p.price}</strong></p>
          <div class="d-flex gap-2">
            <button class="btn btn-primary" onclick="addToCart(${p.id})">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
    productListEl.appendChild(col);
  });
}

async function addToCart(productId) {
  const token = getToken();
  if (!token) { alert('Please login first'); window.location.href = 'login.html'; return; }
  const res = await fetch(`${baseURL}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify({ product_id: productId, quantity: 1 })
  });
  const data = await res.json();
  if (res.ok) alert(data.message || 'Added to cart');
  else alert(data.message || 'Failed to add');
}

function escapeHtml(unsafe) {
  return (unsafe || '').replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]; });
}

document.addEventListener('DOMContentLoaded', fetchProducts);