
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
  
  
  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  
  function addToCart(productId) {
    const cart = getCart();
    const existing = cart.find(item => item.id === productId);
  
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }
  
    saveCart(cart);
    updateCartCount();
    alert("Item added to cart!");
  }
  
  
  function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartIcon = document.getElementById('cart-count');
    if (cartIcon) cartIcon.textContent = count;
  }
  
  
  document.addEventListener('DOMContentLoaded', updateCartCount);
