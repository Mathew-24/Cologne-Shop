function addToCart(product) {
  alert(product + " added to cart!");
}

function rate(star) {
  let stars = star.parentElement.querySelectorAll("span");
  let index = Array.from(stars).indexOf(star);
  stars.forEach((s, i) => {
    s.textContent = i <= index ? "★" : "☆";
  });
}

function searchProducts() {
  let input = document.getElementById("search").value.toLowerCase();
  let products = document.getElementsByClassName("product");
  for (let p of products) {
    let name = p.querySelector("h3").innerText.toLowerCase();
    p.style.display = name.includes(input) ? "block" : "none";
  }
}
