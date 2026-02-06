// Food items data
const foodItems = [
    {
        id: 1,
        name: "Paneer Butter Masala",
        description: "Cottage cheese cubes in a rich, creamy tomato gravy with aromatic spices.",
        price: 12.99,
        type: "veg",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Chicken Biryani",
        description: "Fragrant basmati rice cooked with tender chicken pieces and exotic spices.",
        price: 15.99,
        type: "nonveg",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d9d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Veggie Supreme Pizza",
        description: "Thin crust pizza topped with bell peppers, olives, mushrooms, and cheese.",
        price: 14.50,
        type: "veg",
        image: "https://images.unsplash.com/photo-1593246049226-ded77bf90326?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Grilled Salmon",
        description: "Fresh salmon fillet grilled to perfection with lemon butter sauce.",
        price: 18.99,
        type: "nonveg",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Vegetable Lasagna",
        description: "Layers of pasta, fresh vegetables, and cheese baked in rich tomato sauce.",
        price: 13.99,
        type: "veg",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Butter Chicken",
        description: "Tender chicken pieces cooked in a creamy tomato and butter sauce.",
        price: 16.50,
        type: "nonveg",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        name: "Mushroom Risotto",
        description: "Creamy Arborio rice with wild mushrooms and Parmesan cheese.",
        price: 11.99,
        type: "veg",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        name: "Beef Steak",
        description: "Juicy beef steak grilled to your preference, served with mashed potatoes.",
        price: 22.99,
        type: "nonveg",
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 9,
        name: "Chana Masala",
        description: "Spicy chickpea curry cooked with onions, tomatoes, and aromatic spices.",
        price: 10.99,
        type: "veg",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 10,
        name: "Fish Tacos",
        description: "Crispy fish fillets in soft tortillas with fresh salsa and lime crema.",
        price: 14.99,
        type: "nonveg",
        image: "https://images.unsplash.com/photo-1551503759-13c5f38d3b3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 11,
        name: "Vegetable Stir Fry",
        description: "Fresh seasonal vegetables stir-fried in a savory garlic sauce.",
        price: 11.50,
        type: "veg",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 12,
        name: "Lamb Chops",
        description: "Tender lamb chops marinated in herbs and grilled to perfection.",
        price: 24.99,
        type: "nonveg",
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
];

// Shopping cart data
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const foodItemsContainer = document.getElementById('foodItems');
const categoryButtons = document.querySelectorAll('.category-btn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const cartModal = document.getElementById('cartModal');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const cartIcon = document.querySelector('.cart-icon');

// Initialize the page with all food items
function renderFoodItems(category = 'all') {
    foodItemsContainer.innerHTML = '';
    
    const filteredItems = category === 'all' 
        ? foodItems 
        : foodItems.filter(item => item.type === category);
    
    filteredItems.forEach(item => {
        const foodCard = document.createElement('div');
        foodCard.className = 'food-card';
        foodCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="food-img">
            <div class="food-info">
                <span class="food-type ${item.type}">${item.type === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}</span>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="food-price">
                    <span class="price">$${item.price.toFixed(2)}</span>
                    <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                </div>
            </div>
        `;
        foodItemsContainer.appendChild(foodCard);
    });
    
    // Add event listeners to the add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            addToCart(itemId);
        });
    });
}

// Category filtering
categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get category from data attribute
        const category = this.getAttribute('data-category');
        
        // Render filtered items
        renderFoodItems(category);
    });
});

// Cart functionality
function addToCart(itemId) {
    const item = foodItems.find(item => item.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${item.name} added to cart!`);
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
}

function updateQuantity(itemId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(itemId);
        return;
    }
    
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        updateCart();
    }
}

function updateCart() {
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart display
    renderCartItems();
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.type === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}</p>
                <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                <div class="cart-item-actions">
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn increase
                    