

//siteName -siteUrl-btnAdd
var siteNameInput = document.getElementById("siteName"),
siteUrl=document.getElementById("siteUrl"),
btnAdd =document.getElementById("btnAdd"),
alertUrl =document.getElementById("alertUrl"),
alertName=document.getElementById("alertName"),
btnUpdate=document.getElementById("btnUpdate"),
searchBook=document.getElementById("searchBook"),
tableBody=document.getElementById("tableBody"),
BookContainer ;
if(localStorage.getItem('booksData') == null ){
   BookContainer=[] ;  
}
else{
   BookContainer=JSON.parse(localStorage.getItem('booksData'));
   displayBooks(BookContainer);
}


btnAdd.addEventListener("click",function(){

AddBook();

})

function AddBook(){
   if (siteNameInput.value !== ""&&siteUrl.value !== "") {
      alertName.classList.add("d-none");
      alertUrl.classList.add("d-none");
         var Books={
            name:siteNameInput.value,
            url:siteUrl.value,
         }
         BookContainer.push(Books);
         console.log(BookContainer);
         localStorage.setItem("booksData", JSON.stringify(BookContainer));
         displayBooks(BookContainer);
         clearInputs();
      
      
   } else if(siteNameInput.value === ""&&siteUrl.value !== ""){
      alertName.classList.remove("d-none");
      alertUrl.classList.add("d-none");
   }else if(siteNameInput.value !== ""&&siteUrl.value === ""){
      alertName.classList.add("d-none");
      alertUrl.classList.remove("d-none");
   }
   else{
      alertName.classList.remove("d-none");
      alertUrl.classList.remove("d-none");
   }
   
   
   // console.log(siteNameInput.value ,siteUrl.value);
   

}

function displayBooks(arr){
   var Container=``
   for(var i=0 ; i< arr.length;i++){
      Container+=`
      <tr>
      <td scope="row">${arr[i].name}</td>
      <td>
         <p class="small text-truncate" style="max-width: 300px">
         ${arr[i].url}
         </p>
      </td>
      <td>
         <div class="hstack justify-content-center gap-2">
            <a href="${arr[i].url}" target="_blank" class="btn btn-outline-dark">
               <i class="fa-regular fa-eye"></i>
            </a>

            <button class="btn btn-outline-warning" onclick="edit(${i})" >
               <i class="fa-regular fa-pen-to-square"></i>
            </button>

            <button class="btn btn-outline-danger" onclick="Remove(${i})" >
               <i class="fa-solid fa-trash"></i>
            </button>
         </div>
      </td>
   </tr>`
   }
   tableBody.innerHTML=Container;
} 
function clearInputs(){
   siteNameInput.value="";
   siteUrl.value="";
}
var indexGlobal;
function edit(index){
   // console.log(index);
   indexGlobal=index;
   siteNameInput.value=BookContainer[index].name;
   siteUrl.value=BookContainer[index].url;
   btnAdd.classList.add("d-none");
   btnUpdate.classList.remove("d-none");
}
btnUpdate.addEventListener("click",function(){

   BookContainer[indexGlobal].name=siteNameInput.value;
   BookContainer[indexGlobal].url=siteUrl.value;
      displayBooks(BookContainer)
      localStorage.setItem("booksData", JSON.stringify(BookContainer));
      clearInputs();
      btnAdd.classList.remove("d-none");
      btnUpdate.classList.add("d-none");
})

function Remove(index){
   BookContainer.splice(index, 1);
   localStorage.setItem("booksData", JSON.stringify(BookContainer));
   displayBooks(BookContainer);
}
searchBook.addEventListener("input",function(e){
   // console.log(e.target.value);
   var matcharray=[]
   for(var i=0;i<BookContainer.length;i++ ){
      if(BookContainer[i].name.toLowerCase().includes(e.target.value.toLowerCase())==true){
         // console.log(BookContainer[i])
         matcharray.push(BookContainer[i]);
      }
   }
   displayBooks(matcharray)

})
































































// ----------------- Start Global
// var documentHtml = document,
//    siteName = documentHtml.getElementById("siteName"),
//    siteUrl = documentHtml.getElementById("siteUrl"),
//    btnAdd = documentHtml.getElementById("btnAdd"),
//    btnUpdate = documentHtml.getElementById("btnUpdate"),
//    booksContainer = [],
//    indexUpdate = 0,
//    searchInput = documentHtml.getElementById("searchBook"),
//    alertName = documentHtml.getElementById("alertName"),
//    alertUrl = documentHtml.getElementById("alertUrl"),
//    alertExite = documentHtml.getElementById("alertExite");

// ----------------- When  Start

// if (getLocal() !== null) {
//    booksContainer = getLocal();
//    displayData();
// }

// ----------------- Start Events
// btnAdd.onclick = function () {
//    addBookMark();
// };

// btnUpdate.onclick = function () {
//    updateBook();
// };

// searchInput.oninput = function () {
//    searchBook(this.value);
// };

// ----------------- Start Function
// function addBookMark() {
//    if (nameValidation() & urlValidation()) {
//       var book = {
//          name: siteName.value,
//          url: siteUrl.value,
//       };
//       booksContainer.push(book);
//       setLocal();
//       displayData();
//       resetForm();
//    }
// }

// function deleteBookMark(index) {
//    booksContainer.splice(index, 1);
//    displayData();
//    setLocal();
//    console.log(booksContainer);
// }

// function setUpdateInfo(index) {
//    indexUpdate = index;
//    siteName.value = booksContainer[index].name;
//    siteUrl.value = booksContainer[index].url;
//    btnAdd.classList.add("d-none");
//    btnUpdate.classList.remove("d-none");
// }

// function updateBook() {
//    if (nameValidation() & urlValidation()) {
//       var book = {
//          name: siteName.value,
//          url: siteUrl.value,
//       };
//       booksContainer.splice(indexUpdate, 1, book);
//       displayData();
//       setLocal();
//       resetForm();
//       btnAdd.classList.remove("d-none");
//       btnUpdate.classList.add("d-none");
//    }
// }

// function searchBook() {
//    displayData();
// }

// function displayData() {
//    var tableBody = "";
//    var term = searchInput.value.toLowerCase();

//    for (var i = 0; i < booksContainer.length; i++) {
//       if (booksContainer[i].name.toLowerCase().includes(term)) {
//          tableBody += `
//          <tr>
//          <td scope="row">${booksContainer[i].name.toLowerCase().replaceAll(term, `<span class="text-bg-info">${term}</span>`)}</td>
//          <td>
//             <p class="small text-truncate" style="max-width: 300px">
//               ${booksContainer[i].url}
//             </p>
//          </td>
//          <td>
//             <div class="hstack justify-content-center gap-2">
//                <a href="${booksContainer[i].url}" target="_blank" class="btn btn-outline-dark">
//                   <i class="fa-regular fa-eye"></i>
//                </a>
   
//                <button class="btn btn-outline-warning" onclick="setUpdateInfo(${i})">
//                   <i class="fa-regular fa-pen-to-square"></i>
//                </button>
   
//                <button class="btn btn-outline-danger" onclick="deleteBookMark(${i})">
//                   <i class="fa-solid fa-trash"></i>
//                </button>
//             </div>
//          </td>
//       </tr>
//          `;
//       }
//    }

//    documentHtml.getElementById("tableBody").innerHTML = tableBody;
// }

// function resetForm() {
//    siteName.value = "";
//    siteUrl.value = "";
// }

// function setLocal() {
//    localStorage.setItem("booksData", JSON.stringify(booksContainer));
// }

// function getLocal() {
//    return JSON.parse(localStorage.getItem("booksData"));
// }

// ----------------- Start Validation

// function nameValidation() {
//    if (siteName.value !== "") {
//       alertName.classList.add("d-none");
//       return true;
//    } else {
//       alertName.classList.remove("d-none");
//       return false;
//    }
// }

// function urlValidation() {
//    var exite = false;
//    for (var i = 0; i < booksContainer.length; i++) {
//       if (booksContainer[i].url === siteUrl.value) {
//          exite = true;
//          break;
//       }
//    }

//    if (siteUrl.value !== "") {
//       alertUrl.classList.add("d-none");
//       if (exite) {
//          alertExite.classList.remove("d-none");
//          return false;
//       } else {
//          alertExite.classList.add("d-none");
//          return true;
//       }
//    } else {
//       alertUrl.classList.remove("d-none");
//       return false;
//    }
// }
