//global variables

var pNameInp = document.getElementById('pname');
var pCategoryInp = document.getElementById('pcategory');
var pDescInp = document.getElementById('pdescription');
var pPriceInp = document.getElementById('pprice');
var tbody = document.getElementById('tbody')
var addBtn = document.getElementById('addbtn');
var searchInp = document.getElementById('searchInp');
var nameAlert = document.getElementById('nameAlert');
var allAlert = document.getElementById('allAlert');

//var productsList = [];

var productsList = JSON.parse(localStorage.getItem('allProduct'));

if (localStorage.getItem("allProduct") == null) {

    var productsList = [];
}

else {
    var productsList = JSON.parse(localStorage.getItem('allProduct'));
}

displayProduct();

function addProduct() {
if(validateProductName()== true &&
 pPriceInp.value !='' &&
  pDescInp.value != '' &&
   pCategoryInp.value !=''
   
   ){



    
    var product = {
        productName: pNameInp.value,
        productCategory: pCategoryInp.value,
        productPrice: pPriceInp.value,
        productDesc: pDescInp.value

    }
    productsList.push(product);

    localStorage.setItem('allProduct', JSON.stringify(productsList))
    displayProduct();

    cleanForm();

    allAlert.classList.add('d-none');
}
else{
    allAlert.classList.remove('d-none');

}





}

//retrive

function displayProduct() {

    var trs = "";
    for (var i = 0; i < productsList.length; i++) {


        trs += `<tr>
        <td>${[i]}</td>
        <td>${productsList[i].productName}</td>
        <td>${productsList[i].productCategory}</td>
        <td>${productsList[i].productPrice}</td>
        <td>${productsList[i].productDesc}</td>
        
        <td>
            <button onclick=' deleteProduct(${[i]})'  class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
        </td>
       
    </tr>`

    }

    console.log(trs)
    tbody.innerHTML = trs;
}

function cleanForm() {
    pNameInp.value = "";
    pCategoryInp.value = '';
    pPriceInp.value = "";
    pDescInp.value = '';
}


function search() {
    console.log(searchInp.value)

    var trs = ""

    for (i = 0; i < productsList.length; i++) {

        if (productsList[i].productName.toLowerCase().includes(searchInp.value.toLowerCase())) {

            trs += `<tr>
        <td>${[i]}</td>
        <td>${productsList[i].productName}</td>
        <td>${productsList[i].productCategory}</td>
        <td>${productsList[i].productPrice}</td>
        <td>${productsList[i].productDesc}</td>
       
        <td>
            <button class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
        </td>
       
    </tr>`

        }
        tbody.innerHTML = trs;
    }
}

function deleteProduct(ind) {

    productsList.splice(ind, 1)

    localStorage.setItem('allProduct', JSON.stringify(productsList))

    displayProduct();

}

function validateProductName() {

    var nameRegx = /^[A-Z][a-z]{3,20}$/

    var pValue = pNameInp.value;

    nameRegx.test(pValue);

    if (nameRegx.test(pValue) == true) {

         pNameInp.classList.add('is-valid');

         pNameInp.classList.remove('is-invalid');

         nameAlert.classList.replace('d-block','d-none');

         addBtn.removeAttribute('disabled');

         return true;
    }
    else {
        pNameInp.classList.add('is-invalid'); 

        nameAlert.classList.replace('d-none','d-block');

        addBtn.setAttribute('disabled','true');

        return false;
    }
}
pNameInp.addEventListener('keyup', validateProductName);