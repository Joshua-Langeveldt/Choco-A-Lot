

    
    let container = document.querySelector('[ourStore]')
    let searchProduct = document.querySelector('[searchProduct]')
    let sortingByAmount = document.querySelector('[sorting]')
    let sweetProducts = JSON.parse(
        localStorage.getItem('products')
    )
    console.log(sweetProducts);
    // items/products
    let checkoutItems = JSON.parse(localStorage.getItem('checkout')) 
        ? JSON.parse(localStorage.getItem('checkout'))
        : []
        function displayProducts(args) {
            container.innerHTML = ""
            try { 
                container.innerHTML = ` <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>`

                 setTimeout (() => {
                    container.innerHTML = ""

                args.forEach(product => {
                    container.innerHTML += `
                        <div class="card">
                            <img src="${product.img_url}" class="card-img-top" alt="${product.productName}" loading='lazy'>
                            <div class="card-body">
                                <h5 class="card-title">${product.productName}</h5>
                                <p class="card-text">${product.category}</p>
                                <p class="card-text">
                                    <span class="shadow amount fw-bold"></span>
                                    R${product.Amount}
                                </p>
                                <button type='button' class="btn btnAddToCart" onclick='addToCart(${JSON.stringify(product)})'>Add to cart</button>
                            </div>
                        </div>
                    `
                })
            }, 1500);

            } catch (e) {
                container.innerHTML = `<div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>`
            }
        }
        displayProducts(sweetProducts)

// Sorting by ascending and descending
let isToggle = false
sortingByAmount.addEventListener('click', () => {
    try {
        if (!sweetProducts) throw new Error('Please try again later')
        if (!isToggle) {
            sweetProducts.sort((a, b) => b.Amount - a.Amount)
            sortingByAmount.textContent = 'Sorted by highest amount'
            isToggle = true
        } else {
            sweetProducts.sort((a, b) => a.Amount - b.Amount)
            sortingByAmount.textContent = 'Sorted by lowest amount'
            isToggle = false
        }
        displayProducts(sweetProducts)
    } catch (e) {
        container.textContent = e.message || 'We are working on this issue'
    }
})


searchProduct.addEventListener('keyup', () => {
    let searchValue = searchProduct.value.toLowerCase();
    let filteredProduct = sweetProducts;

    // Filter products based on the search input
    if (searchValue.length >= 1) {
        filteredProduct = sweetProducts.filter(product =>
            product.productName.toLowerCase().includes(searchValue)
        );
    }

    // Clear the container
    container.textContent = '';

    // Display the filtered products or an error message
    if (filteredProduct.length) {
        displayProducts(filteredProduct);
    } else {
        container.innerHTML = `${searchValue} <div class="spinner-border text-danger" role="status">
        <span class="sr-only"></span>
        <p>Error 404</p>
      </div>`;
    }
});


 


               
 // Add to cart
let sweetsCart = JSON.parse(localStorage.getItem('checkout')) || [];
function addToCart(product) {
    try {
        sweetsCart.push(product);
        localStorage.setItem('checkout', JSON.stringify(sweetsCart));
        document.querySelector('[counter]').textContent = JSON.parse(localStorage.getItem('checkout'))
        ? JSON.parse(localStorage.getItem('checkout')).length
        : 0
    } catch (e) {
        alert('The Checkout is under maintenance');
    }
}
       
               // Counter
       window.onload = () => {
           document.querySelector('[counter]').textContent = JSON.parse(localStorage.getItem('checkout'))
               ? JSON.parse(localStorage.getItem('checkout')).length
               : 0
       }




















