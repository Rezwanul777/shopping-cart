



let shop = document.getElementById('shop');


let cart=JSON.parse(localStorage.getItem("data")) || []

const generateShop = () => {
  return (shop.innerHTML = shopItems
    .map((x) => {
      let { id, name, desc, price, img } = x;
     
 
      return `<div id=product-id-${id} class="item">
            <img width="220" src=${img} alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                    <h4>Taka ${price}</h4>
                    
                        <button onClick="addToCart(${id})" class="btn" >Add to cart</button>
                    
                </div>
            </div>
        </div> `;
    })
    .join(''));
};


generateShop();



let addToCart = (id) => {

  let selectedItem = {id};
  let search = cart.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    cart.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  
  // if (search) {
  //   //console.log(search); // Log the found item object
  //   document.getElementById(`product-id-${id}`).innerHTML = search.item; // Update the corresponding element's innerHTML
  // }
  calculation();
  cart = cart.filter((x) => x.item !== 0);
  localStorage.setItem("data",JSON.stringify(cart));
};


let calculation=()=>{
  let cartIcon=document.getElementById('cartAmount')
  cartIcon.innerHTML= cart.map((x)=>x.item).reduce((x,y)=>x+y,0)
}

calculation()

