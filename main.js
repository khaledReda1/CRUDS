let title  = document.getElementById("title");
let price  = document.getElementById("price");
let taxes  = document.getElementById("taxes");
let ads  = document.getElementById("ads");
let discount  = document.getElementById("discount");
let total  = document.getElementById("total");
let count  = document.getElementById("count");
let category  = document.getElementById("category");
let submit  = document.getElementById("submit");

let mode = "create";
let tmp;

// get total 
function getTotal() {
    // console.log("done")
    if (price.value != '') {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
total.innerHTML = result;
total.style.background = '#040';
    }else {
        total.innerHTML = "";
        total.style.background = "hsl(0 96% 49%)" ;
    }
}
// create products 

let datepro;
if(localStorage.product != null) {
    datepro = JSON.parse(localStorage.product)
}else {
    datepro = [];
}


submit.onclick = function () {
    let newpro = {
        title: title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
        
    }
    if(title.value  != "" && price.value !="" && category.value != "" && newpro.count <100) {
        if(mode === "create") {
            if(newpro.count > 1) {
                for(let i=0 ; i < newpro.count; i++) {
        
                    datepro.push(newpro);
                }
            }else {
                datepro.push(newpro);
            }
        }else {
            datepro [tmp] = newpro;
            mode = "create";
            submit.innerHTML = "Create";
            count.style.display = "block";
        }
        clearDate();
    }

  
    





    // save loclaStorge 
    localStorage.setItem('product',  JSON.stringify(datepro))
    clearDate();
    showDate();
    // console.log(datepro)
}


// clear inputs

function clearDate() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    total.innerHTML = '';
    discount.value = '';
    count.value = '';
    category.value = '';
}

// Read 
function showDate() {
    getTotal();
    let table = '';
for(let i =0; i<datepro.length; i++) {
    table += `
            <tr>
                <td>${i+1}</td>
                <td>${datepro[i].title}</td>
                <td>${datepro[i].price}</td>
                <td>${datepro[i].taxes}</td>
                <td>${datepro[i].ads}</td>
                <td>${datepro[i].discount}</td>
                <td>${datepro[i].total}</td>
                <td>${datepro[i].category}</td>
                <td><button onclick = "updateDate(${i})" id="update">update</button></td>
                <td><button onclick="delateDate (${i})" id="delate">delate</button></td>

            </tr>
    `
}
    document.getElementById('tbody').innerHTML = table;
let btndelete = document.getElementById("deleteAll")
    if(datepro.length > 0) {
    btndelete.innerHTML = `
    <button onclick = "deleteAll()">delate All(${datepro.length})</button>
    `
    }else {
        btndelete.innerHTML = '';
    }
}

showDate();
// Delete 

function delateDate (i) {
    datepro.splice(i,1);
    localStorage.product = JSON.stringify(datepro)
    showDate()
}

function deleteAll() {
    localStorage.clear();
    datepro.splice(0);
    showDate();
}


// Update 
function updateDate(i) {
title.value = datepro[i].title;
price.value = datepro[i].price;
taxes.value = datepro[i].taxes;
ads.value = datepro[i].ads;
discount.value = datepro[i].discount;

getTotal();
count.style.display = "none";
category.value = datepro[i].category;
submit.innerHTML = "update";
mode = "update"
tmp = i;
scroll ({
    top:0,
    behavior:"smooth"

})
}

// search
let searchmode = "title";
function getsearchmode(id) 
{
    let search = document.getElementById("search")
    if(id == "search-title"){
    searchmode = "title";
    search.Placeholder = 'Search By Title'
    }else {
        searchmode = "category";
        search.Placeholder = 'Search By category'
    }
    search.focus();
    search.value = '';
    showDate();
}

function sreachDate(value) 
{
    let table = '';
if(searchmode == 'title') {
    for(let i=0; i < datepro.length; i++) {
    if(datepro[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
            <td>${i}</td>
            <td>${datepro[i].title}</td>
            <td>${datepro[i].price}</td>
            <td>${datepro[i].taxes}</td>
            <td>${datepro[i].ads}</td>
            <td>${datepro[i].discount}</td>
            <td>${datepro[i].total}</td>
            <td>${datepro[i].category}</td>
            <td><button onclick = "updateDate(${i})" id="update">update</button></td>
            <td><button onclick="delateDate (${i})" id="delate">delate</button></td>

        </tr>
`
    }
    
    
    }
} else {
    for(let i=0; i < datepro.length; i++) {
        if(datepro[i].category.includes(value.toLowerCase())) {
            table += `
            <tr>
                <td>${i}</td>
                <td>${datepro[i].title}</td>
                <td>${datepro[i].price}</td>
                <td>${datepro[i].taxes}</td>
                <td>${datepro[i].ads}</td>
                <td>${datepro[i].discount}</td>
                <td>${datepro[i].total}</td>
                <td>${datepro[i].category}</td>
                <td><button onclick = "updateDate(${i})" id="update">update</button></td>
                <td><button onclick="delateDate (${i})" id="delate">delate</button></td>
    
            </tr>
    `
        }
        }
}
document.getElementById('tbody').innerHTML = table;
}

// Clean date 





// console.log(title,price,taxes,ads,discount,count,category,submit)