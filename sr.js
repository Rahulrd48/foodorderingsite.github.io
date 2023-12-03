const btnCart = document.querySelector("#c");
const cart = document.querySelector(".cart");
const btnclose = document.querySelector("#cart-close");

btnCart.addEventListener("click", () => {
  cart.classList.add("cart-active");
});

btnclose.addEventListener("click", () => {
  cart.classList.remove("cart-active");
});

document.addEventListener("DOMContentLoaded", loadFood);

function loadFood() {
  loadContent();
}
function loadContent() {
  //remove items from cart//
  let btnrev = document.querySelectorAll(".tc");
  btnrev.forEach((btn) => {
    btn.addEventListener("click", removeitem);
  });
  //qn number//
  let qnt = document.querySelectorAll(".cart-qn");
  qnt.forEach((Input) => {
    Input.addEventListener("change", qnty);
  });
  //cart btn//
  let cartbtn = document.querySelectorAll(".carts");
  cartbtn.forEach((btn) => {
    btn.addEventListener("click", addcart);
  });
  updatetotal();
}

function removeitem() {
  if (confirm("Are you sure to remove")) {
    let title = this.parentElement.querySelector(".fooddetais").innerHTML;
    itemlist = itemlist.filter((el) => el.title != title);
    this.parentElement.remove();
    loadContent();
  }
}
function qnty() {
  if (this.value == 0 || this.value < 1) {
    this.value = 1;
  }
  loadContent();
}
let itemlist = [];

function addcart() {
  let food = this.parentElement;
  let title = food.querySelector(".name").innerHTML;
  let price = food.querySelector(".price").innerHTML;
  let img = food.querySelector(".r").src;

  let newproduct = { title, price, img };
  if (itemlist.find((el) => el.title == newproduct.title)) {
    alert("Product is already added in the cart");
    return;
  } else {
    itemlist.push(newproduct);
  }

  let newcart = createproduct(title, price, img);
  let element = document.createElement("div");
  element.innerHTML = newcart;
  let basket = document.querySelector(".cart-content");
  basket.append(element);
  loadContent();
}

function createproduct(title, price, img) {
  return `
  <div class="cart-box">
              <img src= "${img}" alt="" class="cart-img" />
              <div class="detailsbox">
                <div class="fooddetais">${title}</div>
                <div class="cpriceb">
                  <div class="cartprice">${price}</div>
                  <div class="cartamt">${price}</div>
                </div>
                <input type="number" value="1" class="cart-qn" />
              </div>
              <ion-icon name="trash" class="tc"></ion-icon>
            </div>
  `;
}
function updatetotal() {
  const carti = document.querySelectorAll(".cart-box");
  const toatal1 = document.querySelector(".totalprice");
  let total2 = 0;
  carti.forEach((pod) => {
    let priceel = pod.querySelector(".cartprice");
    let price1 = parseInt(priceel.innerHTML.replace("Rs.", " "));
    let qt = pod.querySelector(".cart-qn").value;
    total2 += qt * price1;
    pod.querySelector(".cartamt").innerText = "Rs." + qt * price1;
  });
  toatal1.innerHTML = "Rs. " + total2;

  //count//
  const cartcount = document.querySelector(".cart-count");
  let count = itemlist.length;
  cartcount.innerHTML = count;
  if (count == 0) {
    cartcount.style.display = "none";
  } else {
    cartcount.style.display = "block";
  }
}

let msg = document.querySelector(".order");
msg.addEventListener("click", () => {
  if (itemlist == 0) {
    alert("Please add an item in the cart");
  } else {
    alert("Your order has been placed succesfully");
  }
});
