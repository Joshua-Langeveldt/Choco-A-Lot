
    let container = document.querySelector('[ourStore]')
    let searchProduct = document.querySelector('[searchProduct]')
    let sortingAlphabetically = document.querySelector('[sorting]')
    let sweetProducts = JSON.parse(
        localStorage.getItem('products')
    )

    // items/products
    let checkoutItems = JSON.parse(localStorage.getItem('checkout'))
        ? JSON.parse(localStorage.getItem('checkout'))
        : []

// Delete Button Functionality & has to be placed outside the global scope
function deleteProduct(index){
    try{
        sweetProducts.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(sweetProducts));
        displayProducts(sweetProducts);
        location.reload();
    } catch(e) {
        alert('Unable to Delete');
    }
}



// Edit Button Functionality & has to be placed outside the global scope

function UpdateProduct(index){
    try{
        let product = sweetProducts[index];
        
        // taps into the index to target the elements for the specific product
        product.productName = document.querySelector(`#admin-name${index}`).value;
        product.category = document.querySelector(`#admin-details${index}`).value;
        product.Amount = document.querySelector(`#admin-amount${index}`).value;
        product.img_url = document.querySelector(`#admin-image${index}`).value;

        // Updates the product in the array
        sweetProducts[index] = Object.assign({}, product);

        // Updates localStorage with the new list of products
        localStorage.setItem('products', JSON.stringify(sweetProducts));

        displayProducts(sweetProducts);

        location.reload();
    } catch(e) {
        alert('Unable to Edit the Products');
    }
}



// Displaying The Products

function displayProducts(args) {
    container.innerHTML = "";
    try {
        args.forEach((product, i) => {
            container.innerHTML += `
            <tr>
            <td>${product.productName}</td>
            <td> <img src="${product.img_url}" class="card-img" alt="adminImg" loading='lazy'>
            </td>
            <td>${product.category}</td>
            <td>R${product.Amount}</td>
            <td>
            <div>
                <div class="buttons">
                <button class="btn edit btn-secondary " data-bs-toggle="modal" data-bs-target="#updateProduct${i}">Edit</button>
                <button class="btn btn-danger delete " onclick="deleteProduct(${i})">Delete</button>
                </div>
                <div class="modal fade" id="updateProduct${i}" tabindex="-1" aria-labelledby="updateProduct${i}" aria-hidden="true">
                    <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="updateProduct${i}">Update Product</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form>
                      <div class="container">
                      <input class="form-control m-2" type="text" placeholder="Enter a Product Name" value="${product.productName}" name ="admin-name" id="admin-name${i}" required>
                      <input class="form-control m-2" type="text" placeholder="Enter Image URL" value="${product.img_url}" name="admin-image" id="admin-image${i}" required>
                      <textarea class="form-control m-2" placeholder="Enter your Product details" required name="admin-details" id="admin-details${i}">${product.category}</textarea>
                      <input class="form-control m-2" type="number" placeholder="Enter the Product Amount" value="${product.Amount}" name="admin-amount" id="admin-amount${i}" required>
                      </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-secondary" onclick='UpdateProduct(${i})'>Save changes</button>
                    </div>
                  </div>
                    </div>
                </div>
            </div>
            </td>
        </tr>
        `;
        })
    } catch(e) {
        tableContent.innerHTML = `
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <p>No Products Found</p>
            </div>
        </div>
        `;
    }
}
displayProducts(sweetProducts);

        
        
        
        


        // Sort alphabetically functionality 
        let isToggle = false;
        sortingAlphabetically.addEventListener('click', () => {
    try {
        if (!sweetProducts) throw new Error('Please try again later');
        if (!isToggle) {
          // Sort by product name in ascending order (A to Z)
            sweetProducts.sort((a, b) => a.productName.localeCompare(b.productName));
            sortingAlphabetically.textContent = 'NAME: A TO Z';
            isToggle = true;
        } else {
            // Sort by product name in descending order (Z to A)
            sweetProducts.sort((a, b) => b.productName.localeCompare(a.productName));
            sortingAlphabetically.textContent = 'NAME: Z TO A';
            isToggle = false;
        }
        displayProducts(sweetProducts);
    } catch (e) {
        container.textContent = e.message || 'We are working on this issue';
    }
});


//lets a new product be added

document.getElementById('saveNewProduct').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the form from submitting normally

    try{

        // Creates a new product from the form values
        let newProduct = {
            productName: document.querySelector('#productName').value,
            category: document.querySelector('#productDetails').value,
            Amount: document.querySelector('#productAmount').value,
            img_url: document.querySelector('#productImage').value,
        };
 
        // Adds the new product to the sweetProducts array
        sweetProducts.push(newProduct);

        // Updates localStorage with the new list of products
        localStorage.setItem('products', JSON.stringify(sweetProducts));

        displayProducts(sweetProducts);

        // Clears the form fields
        document.querySelector('#productName').value = '';
        document.querySelector('#productDetails').value = '';
        document.querySelector('#productAmount').value = '';
        document.querySelector('#productImage').value = '';

        // Close the modal
        var myModalEl = document.getElementById('addProductModal');
        var modal = bootstrap.Modal.getInstance(myModalEl);
        modal.hide();
    } catch(e) {
        alert('Unable to add new product');
    }
});


               
               
               // Add to cart
               function addToCart(product) {
                   try {
                       checkoutItems.push(product)
                       localStorage.setItem('checkout', JSON.stringify(checkoutItems))
                       document.querySelector('[counter]').textContent = checkoutItems.length || 0
                   } catch (e) {
                       alert("Unable to add to cart")
                   }
               }
               window.onload = () => {
                   document.querySelector('[counter]').textContent = checkoutItems.length || 0
               }
       
               // Counter
       window.onload = () => {
           document.querySelector('[counter]').textContent = JSON.parse(localStorage.getItem('checkout'))
               ? JSON.parse(localStorage.getItem('checkout')).length
               : 0
       }





  
        