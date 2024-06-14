// Getting cart items from localStorage
let cart = JSON.parse(localStorage.getItem('checkout')) || [];
let checkoutTable = document.querySelector('[table-checkout]');




// Displaying cart items
function cartItems() {
  if (cart.length === 0) {
      checkoutTable.innerHTML = "<tr><td colspan='6'>Add items to your cart</td></tr>";
      return;
  }



  let cartProducts = cart.reduce((groupedItems, item) => {
      if (!groupedItems[item.id]) {
          groupedItems[item.id] = [];
      }
      groupedItems[item.id].push(item);
      return groupedItems;
  }, {});



  let tableContent = "";
  let finalTotal = 0;



  for (let id in cartProducts) {
      let productGroup = cartProducts[id];
      let product = productGroup[0];
      let quantity = productGroup.length;
      let amount = product.Amount;
      let total = amount * quantity;
      finalTotal += total;


      try{

        tableContent +=
          `<tr >
              <td>${product.productName}</td>
              <td><img class="checkoutImages" src="${product.img_url}" alt="${product.productName}"></td>
              <td>${product.category}</td>
              <td>${quantity}</td>
              <td>R${product.Amount}</td>
              <td>R${total}</td>
          </tr>`;
          
      } catch (e) {
        tableContent  +=  `<div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>`
      }
  }

  //Display amount due
  const headingElement = document.querySelector('#total-container');
  headingElement.textContent = `Amount Due : R${finalTotal}`;
  checkoutTable.innerHTML = tableContent;
}

cartItems();