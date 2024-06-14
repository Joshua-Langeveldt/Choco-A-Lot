
//Create products and store it on the local storage
let wrapper = document.querySelector('[recentProducts]')
//In order to make the string into an array you need to use JSON.parse
let products = JSON.parse(localStorage.getItem('products'))
 //Ternary operator is used to check if we have data in the local storage
? JSON.parse(localStorage.getItem('products'))  : localStorage.setItem('products', JSON.stringify
    (
        [
            {
            productName: "Cadbury",
            category: "Chocolates",
            Amount: 99.90,
            img_url: "https://joshua-langeveldt.github.io/images/images/products/cadbury.jpg"
            },
            {
                productName: "Ferrero Rocher",
                category: "Chocolates",
                Amount: 199.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/ferrero-rocher.jpg"
                
            },
            {
                productName: "Hershey Kisses",
                category: "Chocolates",
                Amount: 149.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/kisses.webp"
            },
            {
                productName: "Lindt Lindor",
                category: "Chocolates",
                Amount: 299.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/lindt-lindor.jpg"
            },
            {
                productName: "Nestle Assorted",
                category: "Chocolates",
                Amount: 129.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/nestle.jpg"
            },
            {
                productName: "Snickers",
                category: "Chocolates",
                Amount: 49.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/snickers.webp"
            },
            {
                productName: "Whirly Pops",
                category: "Sweets",
                Amount: 69.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/swirlyPops.jpg"
            },
            {
                productName: "Skittles",
                category: "Sweets",
                Amount: 55.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/skittles.webp"

            },
            {
                productName: "Mega Sour Sweets",
                category: "Sweets",
                Amount: 89.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/megasour.jpg"
                
            },
            {
                productName: "Warheads",
                category: "Sweets",
                Amount: 39.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/warheads.webp"
                

            },
            {
                productName: "Liquorice",
                category: "Sweets",
                Amount: 59.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/liquorice.jpg"
            },
            {
                productName: "Jelly Beans",
                category: "Sweets",
                Amount: 79.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/jellybeans.jpg"
                

            },
            {
                productName: "Doritoes",
                category: "Chips",
                Amount: 29.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/doritos.jpg"
            },
            {
                productName: "Fritoes",
                category: "Chips",
                Amount: 19.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/fritoes.jpg"
            },
            {
                productName: "Hoppity Poppity",
                category: "Chips",
                Amount: 25.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/hoppitypoppity.jpg"
            },
            {
                productName: "Lays",
                category: "Chips",
                Amount: 29.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/lays.jpg"
            },
            {
                productName: "Monster Munch",
                category: "Chips",
                Amount: 23.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/monstermunch.png"
            },
            {
                productName: "Pringles",
                category: "Chips",
                Amount: 49.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/pringles.jpg"
            },
            {
                productName: "Coca-Cola",
                category: "Drinks",
                Amount: 42.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/coke.jpg"
            },
            {
                productName: "Fanta",
                category: "Drinks",
                Amount: 39.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/fanta.jpg"
            },
            {
                productName: "Gatorade",
                category: "Drinks",
                Amount: 27.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/gatorade.jpg"
            },
            {
                productName: "Mountain Dew",
                category: "Drinks",
                Amount: 19.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/mtndew.jpg"
            },
            {
                productName: "Snapple",
                category: "Drinks",
                Amount: 29.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/snapple.jpg"
            },
            {
                productName: "Sprite",
                category: "Drinks",
                Amount: 39.99,
                img_url: "https://joshua-langeveldt.github.io/images/images/products/sprite.jpg"
            }
        ]
    )
)
//Code for everytime you add a recent product
function recentProducts(){
    let latestProducts = products.reverse().slice(0, 4);
    console.log(latestProducts);
    latestProducts.forEach(product => {
        wrapper.innerHTML += `
        <div class="card">
            <img src="${[product.img_url]}" class="card-img-top" alt="${product.productName}">
            <div class="card-body">
                <h5 class="card-title">${product.productName}</h5>
                <h4 class="product-amount">R${product.Amount}</h4>
                <p class="card-text">${product.category}</p>
            </div>
        </div> `
    })
}
recentProducts()

// Keyup event listener for product search
searchProduct.addEventListener('keyup', () => {
    // Display all products if the search input is empty
    if (searchProduct.value.length < 1) {
        displayProducts(products);
        return; // Exit early to avoid unnecessary processing
    }
    
    // Filter products based on the search input
    let filteredProduct = products.filter(product =>
        product.productName.toLowerCase().includes(searchProduct.value.toLowerCase())
    );
    
    // Display the filtered products
    displayProducts(filteredProduct);
    
    // Display an error message if no products are found
    if (!filteredProduct.length) {
        container.textContent = `${searchProduct.value} product was not found`;
    } else {
        container.textContent = ''; // Clear any previous error message
    }
});

               // Counter
               window.onload = () => {
                document.querySelector('[counter]').textContent = JSON.parse(localStorage.getItem('checkout'))
                    ? JSON.parse(localStorage.getItem('checkout')).length
                    : 0
            }

