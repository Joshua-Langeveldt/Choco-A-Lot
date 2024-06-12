



    
    let container = document.querySelector('[ourStore]')
    let searchProduct = document.querySelector('[searchProduct]')
    let sortingByAmount = document.querySelector('[sorting]')
    let sweetProducts = JSON.parse(
        localStorage.getItem('products')
    )
    // items/products
    let checkoutItems = JSON.parse(localStorage.getItem('checkout'))
        ? JSON.parse(localStorage.getItem('checkout'))
        : []
        function displayProducts(args) {
            container.innerHTML = ""
            try {
                args.forEach(product => {
                    container.innerHTML += `
                    <tr>
                    <td>${product.productName}</td>
                    <td> <img src="${product.img_url}" class="card-img-top" alt="adminImg" loading='lazy'>
                    </td>
                    <td>${product.Material}</td>
                    <td>R${product.Amount}</td>
                    </tr>  `
                    
                })
            } catch (e) {
                container.textContent = "Please try again later"
            }
        }
        displayProducts(sweetProducts)