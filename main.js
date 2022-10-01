let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let count = document.getElementById("count")
let category = document.getElementById("category")
let total = document.getElementById("total")
let create = document.getElementById("submit")
let search = document.getElementById("search")
let updateItem = null
let mode = "create";
let searchMode = "category";

//totalPrice
function calcPrice() {
    let totalPrice = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = totalPrice
    total.style.backgroundColor = "green";
}

// colect data and save in arry
let products = [];
if (localStorage.getItem("products")) {
    products = JSON.parse(localStorage.getItem("products"));
    showData();
}



// add new product to the table 

function submit() {
    if (mode === "create") {
        if (title.value != "" && price.value != "" & category.value != "" && count.value < 101) {
            let product = {
                title: title.value.toLowerCase(),
                price: price.value,
                taxes: taxes.value,
                ads: ads.value,
                discount: discount.value,
                total: total.innerHTML,
                category: category.value.toLowerCase()
            }
            if (count.value > 1) {
                for (var i = 0; i < count.value; i++) {
                    products.push(product);
                }
            }
            else {
                products.push(product);
            }
            localStorage.setItem("products", JSON.stringify(products))
            showData();
            console.log("last")
            document.querySelectorAll(".inputs input").forEach((e) => e.value = "");
            total.style.backgroundColor = "red";
            total.innerHTML = ``;
        }
    } else {
        let product = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            category: category.value
        }
        products[updateItem] = product;
        showData();
        create.innerHTML = `create`
        mode = "create"
        document.querySelectorAll(".inputs input").forEach((e) => e.value = "");
        total.style.backgroundColor = "red";
        total.innerHTML = ``
    }
}

//show data 

// localStorage.clear();   

function showData() {
    let table = "";
    for (var i = 0; i < products.length; i++) {
        table += ` <tr>
        <td>${i + 1}</td>
        <td>${products[i].title}</td>
        <td>${products[i].price}</td>
        <td>${products[i].taxes}</td>
        <td>${products[i].ads}</td>
        <td>${products[i].discount}</td>
        <td>${products[i].total}</td>
        <td>${products[i].category}</td>
        <td>
        <button id="update" onclick="updatePro(${i})">update</button>
        </td>
        <td>
        <button id="delete" onclick="deletePro(${i})">delete</button>
        </td>
    </tr>          `
    }
    document.getElementById("productContainer").innerHTML = table;
    if (products.length > 1) {
        let deleteAll = `
        <button onclick="deleteAll()">delete All ${products.length}</button>  
        `
        document.querySelector("#deleteAll").innerHTML = deleteAll;
    } else {
        document.querySelector("#deleteAll").innerHTML = ``;
    }
}

//delete product 

function deletePro(i) {
    products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(products));
    document.getElementById("productContainer").innerHTML = ``;
    showData();
}
function deleteAll() {
    products.splice(0);
    localStorage.clear();
    showData();
}

// update
function updatePro(i) {
    title.value = products[i].title
    price.value = products[i].price
    taxes.value = products[i].taxes
    ads.value = products[i].ads
    discount.value = products[i].discount
    total.innerHTML = products[i].total
    total.style.backgroundColor = "green";
    category.value = products[i].category
    scroll({
        top: 0,
        behavior: "smooth"
    });
    mode = `update`
    create.innerHTML = `update`
    updateItem = i;
}

// search 

search.onkeyup = function () {
    let newProducts = [];
    for (const value in products) {
        if (searchMode === "category") {
            if (products[value].category.includes(search.value.toLowerCase())) {
                newProducts.push(products[value]);
            }
        } else {
            if (products[value].title.includes(search.value.toLowerCase())) {
                newProducts.push(products[value]);
            }
        }
    }
    products = [...newProducts];
    showData();
    products = JSON.parse(localStorage.getItem("products"));
}


document.querySelectorAll(".searchBtn button").forEach((btn) => {
    btn.onclick = function () {
        search.value = ``;
        search.placeholder = `search By ${this.dataset.mode}`
        searchMode = this.dataset.mode;
        search.focus();
    }
});

search.onblur = function () {
    search.value = ``
}

