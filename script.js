const menuItems = [
            { id: 1, name: "Chicken Samosa (6 pcs)", category: "starter", price: 250, badge: "Popular", description: "Crispy fried pastries filled with spiced chicken and aromatic herbs.", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80" },
            { id: 2, name: "Vegetable Pakora", category: "starter", price: 180, badge: "", description: "Mixed vegetable fritters with chickpea flour, served with mint chutney.", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=80" },
            { id: 3, name: "Chicken Spring Rolls", category: "starter", price: 350, badge: "Hot", description: "Crispy spring rolls stuffed with chicken, vegetables, and spices.", image: "https://images.unsplash.com/photo-1619895092538-128341789043?w=500&q=80" },
            { id: 12, name: "Mutton Korma", category: "main", price: 1400, badge: "", description: "Rich and creamy mutton curry with yogurt, nuts, and aromatic spices.", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&q=80" },
            { id: 13, name: "Palak Paneer", category: "main", price: 480, badge: "Vegetarian", description: "Cottage cheese cubes in creamy spinach gravy with Indian spices.", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80" },
            { id: 14, name: "Daal Makhani", category: "main", price: 350, badge: "Healthy", description: "Creamy black lentils slow-cooked with butter, cream, and spices.", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&q=80" },
            { id: 15, name: "Seekh Kabab (6 pcs)", category: "bbq", price: 580, badge: "Best Seller", description: "Minced meat kababs with herbs and spices, grilled to perfection.", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80" },
            { id: 16, name: "Chicken Tikka", category: "bbq", price: 650, badge: "Popular", description: "Marinated chicken pieces grilled with tandoori spices and yogurt.", image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500&q=80" },
            { id: 17, name: "Chapli Kabab (4 pcs)", category: "bbq", price: 600, badge: "Peshawari", description: "Traditional Peshawari flat minced meat kababs with tomatoes and herbs.", image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&q=80" },
            { id: 29, name: "Lab-e-Shireen", category: "dessert", price: 180, badge: "", description: "Traditional Pakistani dessert with vermicelli, milk, and jelly.", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=80" },
            { id: 30, name: "Kulfi Falooda", category: "dessert", price: 200, badge: "Refreshing", description: "Traditional ice cream with vermicelli, rose syrup, and basil seeds.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu37eFW9pM2xOIZ5oV8837ml6iMcdety1k1w&s" },
            { id: 31, name: "Sweet Lassi", category: "drinks", price: 150, badge: "Refreshing", description: "Traditional yogurt-based drink sweetened with sugar and cardamom.", image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500&q=80" },
            { id: 32, name: "Salt Lassi", category: "drinks", price: 150, badge: "", description: "Savory yogurt drink with cumin, mint, and black salt.", image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500&q=80" },
            { id: 33, name: "Mango Lassi", category: "drinks", price: 200, badge: "Popular", description: "Creamy yogurt drink blended with fresh mangoes.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThOD89Af0SLiZwoyyaKf99vDtoxnmw-JB6AQ&s" },
        ];

        let cart = [];

        function initMenu() {
            const menuGrid = document.getElementById('menuGrid');
            menuGrid.innerHTML = menuItems.map(item => `
                <div class="menu-card fade-in" data-category="${item.category}">
                    <div class="menu-card-image" style="background-image: url('${item.image}')">
                        ${item.badge ? `<span class="menu-card-badge">${item.badge}</span>` : ''}
                    </div>
                    <div class="menu-card-content">
                        <div class="menu-card-header">
                            <div>
                                <h3 class="menu-card-title">${item.name}</h3>
                                <p class="menu-card-category">${item.category}</p>
                            </div>
                            <div class="menu-card-price">Rs. ${item.price}</div>
                        </div>
                        <p class="menu-card-description">${item.description}</p>
                        <div class="menu-card-footer">
                            <div class="quantity-selector">
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                                <span class="quantity-value" id="qty-${item.id}">1</span>
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                            </div>
                            <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
            observeElements();
        }

        function filterMenu(category) {
            const cards = document.querySelectorAll('.menu-card');
            const buttons = document.querySelectorAll('.filter-btn');
            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => card.classList.add('visible'), 10);
                } else {
                    card.style.display = 'none';
                }
            });
        }

        function updateQuantity(itemId, change) {
            const qtyElement = document.getElementById(`qty-${itemId}`);
            let currentQty = parseInt(qtyElement.textContent);
            currentQty = Math.max(1, currentQty + change);
            qtyElement.textContent = currentQty;
        }

        function addToCart(itemId) {
            const item = menuItems.find(i => i.id === itemId);
            const quantity = parseInt(document.getElementById(`qty-${itemId}`).textContent);
            const existingItem = cart.find(i => i.id === itemId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ ...item, quantity });
            }
            updateCart();
            document.getElementById(`qty-${itemId}`).textContent = '1';
            const btn = event.target;
            const originalText = btn.textContent;
            btn.textContent = '✓ Added!';
            btn.style.background = '#4CAF50';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 1000);
        }

        function updateCart() {
            const cartItems = document.getElementById('cartItems');
            const cartCount = document.getElementById('cartCount');
            const cartTotal = document.getElementById('cartTotal');
            const checkoutBtn = document.getElementById('checkoutBtn');
            const clearCartBtn = document.getElementById('clearCartBtn');
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartCount.textContent = totalItems;
            cartTotal.textContent = `Rs. ${totalPrice}`;
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="cart-empty">
                        <div class="cart-empty-icon">🛒</div>
                        <p>Your cart is empty</p>
                        <p style="font-size: 0.9rem; margin-top: 0.5rem;">Add some delicious items to get started!</p>
                    </div>
                `;
                checkoutBtn.disabled = true;
                clearCartBtn.disabled = true;
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">Rs. ${item.price} each</div>
                            <div class="cart-item-controls">
                                <div class="cart-item-qty">
                                    <button onclick="updateCartQuantity(${item.id}, -1)">−</button>
                                    <span>${item.quantity}</span>
                                    <button onclick="updateCartQuantity(${item.id}, 1)">+</button>
                                </div>
                                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                            </div>
                        </div>
                    </div>
                `).join('');
                checkoutBtn.disabled = false;
                clearCartBtn.disabled = false;
            }
        }

        function updateCartQuantity(itemId, change) {
            const item = cart.find(i => i.id === itemId);
            if (item) {
                item.quantity = Math.max(1, item.quantity + change);
                updateCart();
            }
        }

        function removeFromCart(itemId) {
            cart = cart.filter(i => i.id !== itemId);
            updateCart();
        }

        function toggleCart() {
            document.getElementById('cartSidebar').classList.toggle('active');
        }

        function toggleMobileMenu() {
            document.querySelector('.nav-links').classList.toggle('active');
        }

        function checkoutViaWhatsApp() {
            if (cart.length === 0) return;
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const grandTotal = subtotal;
            let message = `DELÍCIA RESTAURANT ORDER\n\n`;
            message += `Order Details:\n`;
            cart.forEach((item, index) => {
                message += `${index + 1}. ${item.name}\n`;
                message += `   Price: Rs. ${item.price} * ${item.quantity} = Rs. ${item.price * item.quantity}\n`;
            });
            message += `Delivery fee = Rs. 100 \n`
            message += `Grand Total: Rs. ${grandTotal + 100}\n`;
            message += `Order Time: ${new Date().toLocaleString('en-US')}\n`;
            message += `_Please confirm your delivery address._`;
            const phoneNumber = '923021116409';
            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            window.open(whatsappURL, '_blank');
        }

        function clearCart() {
            if (confirm('Are you sure you want to clear all items from cart?')) {
                cart = [];
                updateCart();
            }
        }

        function observeElements() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.pageYOffset > 100) {
                header.style.padding = '0.5rem 5%';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
            } else {
                header.style.padding = '1rem 5%';
                header.style.boxShadow = 'none';
            }
        });

       document.addEventListener('click', (e) => {
            const cart = document.getElementById('cartSidebar');
            const cartIcon = document.querySelector('.cart-icon');
            
            const isCartButton = e.target.closest('.quantity-btn') || 
                                 e.target.closest('.remove-item') || 
                                 e.target.closest('.cart-item-qty button') ||
                                 e.target.closest('.checkout-btn') ||
                                 e.target.closest('.clear-cart-btn');
            
            if (cart.classList.contains('active') && 
                !cart.contains(e.target) && 
                !cartIcon.contains(e.target) &&
                !isCartButton) {
                toggleCart();
            }
        });

        initMenu();
        observeElements();