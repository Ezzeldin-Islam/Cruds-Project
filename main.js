let title = document.getElementById("title");
let price = document.getElementById("price");
let taxs = document.getElementById("taxs");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let deleteAll = document.querySelector("#deleteAll > button");
let tbody = document.getElementById("tbody");
let mood = "create";
let updateCount;
let searchMood = "title";

function getTotal(val) {
  let result = +price.value + +taxs.value + +ads.value - +discount.value;
  if (price.value != "" && result > 0) {
    total.innerHTML = `${result}`;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "rgb(90, 1, 1)";
  }
}

let products;
if (localStorage.product != null) {
  products = JSON.parse(localStorage.product);
} else {
  products = [];
}

create.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxs: taxs.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value <= 100
  ) {
    if (mood == "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          products.push(newPro);
        }
      } else {
        products.push(newPro);
      }
    } else {
      products[updateCount] = newPro;
      create.innerHTML = "create";
      count.style.display = "block";
      mood = "create";
    }
    clearInputs();
  } else {
  }
  localStorage.setItem("product", JSON.stringify(products));

  showData();
};

function clearInputs() {
  title.value = "";
  price.value = "";
  taxs.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  total.style.background = "rgb(90, 1, 1)";
}

function showData() {
  let table = "";

  for (let i = 0; i < products.length; i++) {
    table += `
    <tr>
        <td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxs}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td><button onclick="updateElement(${i})" class="update">update</button></td>
        <td><button onclick="deleteElement(${i})" class="delete">delete</button></td>
      </tr>
    `;
  }
  tbody.innerHTML = table;
  if (tbody.innerHTML != "") {
    deleteAll.style.display = "block";
    deleteAll.innerHTML = `Delete All (${products.length})`;
  } else {
    deleteAll.style.display = "none";
  }
}
showData();

function deleteAllElements() {
  products.splice(0);
  localStorage.product = JSON.stringify(products);
  showData();
}

function deleteElement(i) {
  products.splice(i, 1);
  localStorage.product = JSON.stringify(products);
  showData();
}

function updateElement(i) {
  mood = "update";
  updateCount = i;
  title.value = products[i].title;
  price.value = products[i].price;
  taxs.value = products[i].taxs;
  ads.value = products[i].ads;
  discount.value = products[i].discount;
  total.innerHTML = products[i].total;
  getTotal();
  category.value = products[i].category;
  count.style.display = "none";
  create.innerHTML = "update";
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

function getSearchMood(id) {
  search.focus();
  search.value = "";
  showData();
  if (id === "search-title") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = `search by ${searchMood}`;
  search.onblur = function () {
    searchMood = "title";
    search.placeholder = `search`;
  };
}

function getData(val) {
  let table = "";
  if (searchMood === "title") {
    for (let i = 0; i < products.length; i++) {
      if (products[i].title.includes(val.toLowerCase())) {
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxs}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button onclick="updateElement(${i})" class="update">update</button></td>
            <td><button onclick="deleteElement(${i})" class="delete">delete</button></td>
          </tr>
          `;
      } else {
      }
    }
  } else {
    for (let i = 0; i < products.length; i++) {
      if (products[i].category.includes(val.toLowerCase())) {
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxs}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td><button onclick="updateElement(${i})" class="update">update</button></td>
            <td><button onclick="deleteElement(${i})" class="delete">delete</button></td>
          </tr>
          `;
      } else {
      }
    }
  }
  tbody.innerHTML = table;
  // showData()
}
