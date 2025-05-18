// Load cart from localStorage or initialize empty
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
  
  // Save cart to localStorage
  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // Add item to cart
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
  
  // Update cart icon with item count
  function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartIcon = document.getElementById('cart-count');
    if (cartIcon) cartIcon.textContent = count;
  }
  
  // Call this on page load to sync count
  document.addEventListener('DOMContentLoaded', updateCartCount);