let label = document.getElementById("label");
let ShopingCart = document.getElementById("shoping-cart");

let cart = JSON.parse(localStorage.getItem("data")) || [];
//console.log(cart);

let calculation = () => {
	let cartIcon = document.getElementById("cartAmount");
	cartIcon.innerHTML = cart.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

// cart functionality

let generateCartItem = (shopItems) => {
	if (cart.length !== 0) {
		return (ShopingCart.innerHTML = cart
			.map((x) => {
				let { id, item } = x;
				let search = shopItems.find((y) => y.id === id);
				//console.log(search);
				return `
              <div class="cart-item">
                <img width="100" src=${search.img} alt="">
               <div class="cart-details">
                <div class="title-price-x">
                  <h4 class="title-price">
                    <p>${search.name}</p>
                    <p class="cart-item-price">Taka ${search.price}</p>
                  </h4>
                  <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                </div>

              <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              </div>

              <h3>$ ${item * search.price}</h3>
               </div>
              </div>
            `;
			})
			.join(""));
	} else {
		ShopingCart.innerHTML = ``;
		label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="homeBtn">Back to Home</button>
        </a>
      `;
	}
};

generateCartItem(shopItems);

// increment function
// increment function
let increment = (id) => {
  let selectedItem = { id: id };
  let search = cart.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    cart.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItem(shopItems);
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(cart));
};

// decrement function
let decrement = (id) => {
  let selectedItem = { id: id };
  let search = cart.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  cart = cart.filter((x) => x.item !== 0);
  generateCartItem(shopItems);
  localStorage.setItem("data", JSON.stringify(cart));
};


// update the cart

let update = (id) => {
  let search = cart.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
   TotalAmount();
};

// Remove the item from the cart

let removeItem = (id) => {
  let selectedItem = { id: id };
  console.log(selectedItem);
  
  cart = cart.filter((x) => x.id !== selectedItem.id);
  generateCartItem(shopItems);
  TotalAmount()
  calculation();
  localStorage.setItem("data", JSON.stringify(cart));
};

// Clear the cart

let clearCart = () => {
  cart = [];
  generateCartItem(shopItems);
  TotalAmount()
  calculation();
  localStorage.setItem("data", JSON.stringify(cart));
};


// Total Amount

let TotalAmount = ()=>{
 if(cart.length !==0){
  let amount=cart.map((x)=>{
    let { item, id } = x;
        let search = shopItems.find((y) => y.id === id) || [];
        return item * search.price;
  
  }).reduce((x,y)=>x+y,0)
      console.log(amount);
      label.innerHTML = `
    <h2>Total Bill : TK  ${amount}</h2>

    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
}else return
}

TotalAmount()