
let products = [];

// Function to add new product
function addNewProduct() {
  const productName = document.getElementById('new-product').value.trim();

  if (productName) {
    // Check if the product already exists
    const existingProduct = products.find(product => product.name === productName);
    if (existingProduct) {
      alert('Product already exists!');
      return;
    }

    // Add the new product to the array
    products.push({ name: productName });
    updateProductDropdown();
    alert('Product added successfully!');
  } else {
    alert('Please enter a valid product name.');
  }
}

// Function to set price for a product
function AddPrice() {
  const selectedProductIndex = document.getElementById('select-product').selectedIndex;
  const price = document.getElementById('price').value.trim();

  if (!isNaN(parseFloat(price)) && isFinite(price)) {
    if (selectedProductIndex >= 0) {
      // Update the price of the selected product
      products[selectedProductIndex].price = parseFloat(price);
      alert('Price added successfully!');
    } else {
      alert('Please select a product.');
    }
  } else {
    alert('Please enter a valid price.');
  }
}

// Function to handle starting a new transaction
function startNewTransaction() {
  // Clear the checkout section
  document.getElementById('products').selectedIndex = -1;
  document.getElementById('unit').value = '';
  clearReceipt();
}

// Function to handle selecting the unit
function setUnit(value) {
  document.getElementById('unit').value = value;
}

// Function to handle adding a product to the cart
function addToCart() {
  const selectedProductIndex = document.getElementById('products').selectedIndex;
  const quantity = parseInt(document.getElementById('unit').value);

  if (selectedProductIndex >= 0 && quantity > 0) {
    const selectedProduct = products[selectedProductIndex];
    const totalPrice = selectedProduct.price * quantity;
    
    // Create a new receipt item
    const receiptItem = document.createElement('p');
    receiptItem.textContent = `${selectedProduct.name} x ${quantity}: $${totalPrice.toFixed(2)}`;

    // Append the receipt item to the receipt div
    document.getElementById('receipt').appendChild(receiptItem);

    // Calculate and update the total price, taxes, and amount due
    updateReceipt();
    
    alert('Product added to cart!');
  } else {
    alert('Please select a product and enter a valid quantity.');
  }
}

// Function to calculate and update the total price, taxes, and amount due
function updateReceipt() {
  // Get all receipt items
  const receiptItems = document.querySelectorAll('#receipt p');

  // Initialize total price
  let totalPrice = 0;

  // Calculate total price
  receiptItems.forEach(item => {
    const priceText = item.textContent.split(': ')[1];
    const price = parseFloat(priceText.substring(1));
    totalPrice += price;
  });

  // Calculate taxes (5%)
  const taxes = totalPrice * 0.05;

  // Calculate amount due
  const amountDue = totalPrice + taxes;

  // Update total price, taxes, and amount due in the receipt
  document.getElementById('total-price').textContent = `Total Price: $${totalPrice.toFixed(2)}`;
  document.getElementById('taxes').textContent = `Taxes (5%): $${taxes.toFixed(2)}`;
  document.getElementById('amount-due').textContent = `Amount Due: $${amountDue.toFixed(2)}`;
}

// Function to populate product dropdowns
function updateProductDropdown() {
  const selectElement = document.getElementById('select-product');
  const checkoutSelectElement = document.getElementById('products');

  // Clear existing options
  selectElement.innerHTML = '';
  checkoutSelectElement.innerHTML = '';

  // Populate options from products array
  products.forEach(product => {
    const option = document.createElement('option');
    option.text = product.name;
    selectElement.add(option.cloneNode(true));

    const checkoutOption = document.createElement('option');
    checkoutOption.text = product.name;
    checkoutSelectElement.add(checkoutOption);
  });
}
function pay() {
  alert('Payment processed successfully!');
  
  // Generate and display the receipt
  generateReceipt();
   
}
function print(){
  alert('Thank you for shopping!!');
  clearReceipt();
}

function generateReceipt() {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const subTotal = calculateSubTotal();
  const taxes = subTotal * 0.05;
  const totalAmount = subTotal + taxes;

  const receipt = `
    <p>Date: ${date}</p>
    <p>Time: ${time}</p>
    ${document.getElementById('receipt').innerHTML}
    <p>Total Price: $${subTotal.toFixed(2)}</p>
    <p>Taxes (5%): $${taxes.toFixed(2)}</p>
    <p>Amount Due: $${totalAmount.toFixed(2)}</p>
  `;
  
  document.getElementById('receipt').innerHTML = receipt;
}

function calculateSubTotal() {
  const receiptItems = document.querySelectorAll('#receipt p');
  let subTotal = 0;
  
  receiptItems.forEach(item => {
    const priceText = item.textContent.split(': ')[1];
    const price = parseFloat(priceText.substring(1));
    subTotal += price;
  });

  return subTotal;
  
}
function clearReceipt() {
  document.getElementById('receipt').innerHTML = ' ';
 
}