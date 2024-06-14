// Getting cart items from localStorage
let cart = JSON.parse(localStorage.getItem('checkout')) || [];
let checkoutTable = document.querySelector('[table-checkout]');

// Displaying cart items
function cartItems() {
  if (cart.length === 0) {
    checkoutTable.innerHTML = "<tr><td colspan='6'>Add items to your cart</td></tr>"; // Message that displays if no items in cart
    return;
  }

  let tableContent = "";
  let finalTotal = 0; // Initialize finalTotal

  // Create a new array with unique products based on productName
  let uniqueProducts = Array.from(new Set(cart.map(item => item.productName)))
    .map(productName => {
      return cart.find(item => item.productName === productName);
    });

  uniqueProducts.forEach(item => {
    let quantity = cart.filter(cartItem => cartItem.productName === item.productName).length;
    let amount = Number(item.Amount);
    let total = amount * quantity;
    finalTotal += total;

    tableContent +=
      `<tr>
          <td>${item.productName}</td>
          <td><img class="checkoutImages" src="${item.img_url}" alt="${item.productName}"></td>
          <td>${item.category}</td>
          <td>${quantity}</td>
          <td>R${amount.toFixed(2)}</td>
          <td>R${total.toFixed(2)}</td>
      </tr>`;
  });

  // Display amount due
  const headingElement = document.querySelector('#total-container');
  headingElement.textContent = `Amount Due: R${finalTotal.toFixed(2)}`;
  checkoutTable.innerHTML = tableContent;
}

// Call the cartItems function
cartItems();

// Purchase button
document.querySelector('[purchase]').addEventListener('click', () => {
  alert("Thank you for purchasing");
});

// Clear button
document.querySelector('[clear]').addEventListener('click', () => {
  // Clear the cart and update local storage
  cart = []; // Clear the cart
  localStorage.setItem('checkout', JSON.stringify(cart)); // Update local storage
  cartItems(); // Update the cart display
  document.querySelector('#total-container').style.display = 'none'; // Hide the amount due
});

               // Counter
               window.onload = () => {
                document.querySelector('[counter]').textContent = JSON.parse(localStorage.getItem('checkout'))
                    ? JSON.parse(localStorage.getItem('checkout')).length
                    : 0
            }
