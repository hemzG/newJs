let start=1;
let show_per_page = 5;
let itemSize;
var prevBit=false;
var nextBit=false;
var  firstBit = false;
var pageBit= true;
const loader = document.querySelector("#loading");
function displayLoading() {
    loader.classList.add("display");
}
function hideLoading() {
    loader.classList.remove("display");
}

fetchSize();
function fetchSize() {
  var queryURL = "https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/";
    fetch(queryURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(blogs) {
        itemSize=blogs.length;
        myNews(show_per_page);
      })
      .catch(function(error) {
        console.log("Error during fetch: " + error.message);
      });
  }
  var number_of_pages;
  let controlClass;
  var btn_elements;
  var navigation_links;
  var current_link;

function myNews(show_per_page) {
  
  number_of_pages = Math.ceil(itemSize/show_per_page);
 navigation_links = `<a class="prev pagination" onclick="previous();">Previous</a>`;
 current_link = 0;
while (number_of_pages > current_link) {
    navigation_links += `<a class="page pagination" id="${current_link+1}" onclick="page_range(this);">`+ (current_link + 1) +  `</a>`;
    current_link++;
  }

navigation_links += `<a class="next pagination" onclick="next();">Next</a>`;
controlClass= document.getElementById("control");
controlClass.innerHTML = navigation_links;
var ss = document.getElementsByClassName("active");
if(ss.length == 0){
 console.log("chck active");
btn_elements = document.getElementsByClassName("page");
btn_elements[0].classList.add("active");
firstBit = true;
}
fetchBlogs();
}
var currentUrl="";
var errorElement ="";
const commonDebounce = debounce(() => commonFetch());
function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function commonFetch(currentUrl){
 var newSearch= location.search;
 console.log(newSearch);
 if(nextBit){
var nextWork= newSearch.split("limit=5",2);
nextQuery=nextWork[1];
console.log(nextQuery);
console.log(start);
currentUrl="https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/"+`?page=${start}&limit=${show_per_page}`+nextQuery;
var newurl = document.location.pathname +`?page=${start}&limit=${show_per_page}`+nextQuery;
var nxtstate={};
var nxtTitle ="";
window.history.pushState(nxtstate,nxtTitle,newurl);
 }
 else{
  currentUrl="https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/"+newSearch;
 }
 
  console.log(currentUrl);
  fetch(currentUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(blogs) {
        console.log(blogs);
        
        hideLoading();
        clearTable();
         
        //if(nextBit){
        var ss = document.getElementsByClassName("active");
        //console.log(ss[0]);
        ss[0].classList.remove("active");
        var nxt_btn=document.getElementsByClassName("controls");
        //console.log(start);
        nxt_btn[0].children[start].classList.add("active");
        nextBit=false;
       // }
        if(blogs.length==0){
          errorElement = document.getElementById("error");
          errorElement.textContent = "No more data";
          }else{
            errorElement.textContent ="";
        buildTable(blogs);
          }
      
      })
      .catch(function(error) {
        console.log("Error during fetch: " + error.message);
        var tableBodyError = document.getElementById("full");
        tableBodyError.style.display="none";
        var errorElement = document.getElementById("error");
        errorElement.textContent = "Error during fetch: " + `"${error.message}."`;
      });
      pageBit= false;
}
function previous(){
  if(start!= 1){
    clearTable();
    start--;
    nextBit=true;
   //fetchBlogs();
   commonFetch();
  }

}
function next(){
if(start<number_of_pages){
  clearTable();
  start++;
  nextBit = true;
 // fetchBlogs();
 commonFetch();
}
}

function page_range(xy){
  console.log(xy.id);
  //var ss = document.getElementsByClassName("active");
  //ss[0].classList.remove("active");
 // xy.classList.add("active");
  start = xy.id;
  nextBit = true;
  clearTable();
  commonFetch();
 // fetchBlogs();
}

var filter="";
var sortValue="";
var sortBit = false;

function fetchBlogs() {
displayLoading();
if(!nextBit){
  console.log("1");
  if(location.search.length){
    console.log(location.search);
    var pageLOC =location.search;
    var slicestring= pageLOC.split("?",2);
    console.log(slicestring);
    var mystring = slicestring[1];

var equalaftr= mystring.split("=",6);
console.log(equalaftr);
if(equalaftr[0]=="page"){
  console.log("page");
  var pages = equalaftr[1].split("&",2);
 var finalPage= pages[0];
 console.log(finalPage);
 start = finalPage;

 if(equalaftr[2].length != 1){
 var whatTasksplit= equalaftr[2].split("&",2);
 console.log(whatTasksplit);
 var whatTask= whatTasksplit[1];
 var whatTask2=equalaftr[3];
 if(whatTask2.includes("&")){
  var whatTask3=whatTask2.split("&",2);
  var whatTask4=whatTask3[0];
  var whatTask5 =whatTask3[1];
  if(equalaftr[4].includes("&")){
    var whatTask8=equalaftr[4].split("&",2);
    var whatTask9 = whatTask8[1];
    var whatTask10=equalaftr[5];
  }

 }
 var inputSearch;
 inputSearch= document.getElementById("myInput");
 var inputDropdown = document.getElementById("sortBy");
 if(whatTask=="search"){
  if(whatTask2.includes("&")){
  filter =whatTask4;
  var whatTask6=equalaftr[4].split("&",2);
  var whatTask7 = whatTask6[0];
  sortValue = whatTask7;
  if(sortValue=="id"){
    inputDropdown.value="id";
   }
   if(sortValue=="createdAt"){
    inputDropdown.value="createdAt";
    }
currentUrl = "https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/"+`?page=${start}&limit=${show_per_page}`+`&search=${filter}`+`&sortBy=${sortValue}&order=desc`;
console.log(currentUrl);
commonFetch(currentUrl);
  }
  else{
    filter=whatTask2;
    processChange();
   }
   
   inputSearch.value=filter;

  
 }
 else if(whatTask=="sortBy"){
  //var whatTask3=whatTask2.split("&",2);
 // var whatTask4=whatTask3[0];
 // console.log(whatTask4);
 //var input;
 // input= document.getElementById("sortBy");
 // console.log(input);
 if(equalaftr[4].includes("&")){
  sortValue = whatTask9;
  filter=whatTask10;
  inputSearch.value=filter;
  currentUrl = "https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/"+`?page=${start}&limit=${show_per_page}`+`&sortBy=${sortValue}&order=desc`+`&search=${filter}`; 
  commonFetch(currentUrl);
 }
 else{
  sortValue = whatTask4;
  sortBit =true;
sortChange();
 }
 if(sortValue=="id"){
  inputDropdown.value="id";
 }
 if(sortValue=="createdAt"){
  inputDropdown.value="createdAt";
  }
 

 }

 }

}
// else if(equalaftr[0]=="search"){
//   console.log("serach");
//   var finalfilter= equalaftr[1];
//   filter = finalfilter;
//   processChange();

// }
// else if(equalaftr[0]=="sortBy"){
//   console.log("sort");
//   var sorts = equalaftr[1].split("&",2);
//   var finalSort= sorts[0];
//   console.log(finalSort);
// sortValue = finalSort;
// sortBit =true;
// sortChange();


// }
    
//var pageLOC=location.search[6];
//if(pageLOC.isInteger)
//start = pageLOC;

  }
}
if(pageBit){

  console.log("2");
  var queryURL = "https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/"+`?page=${start}&limit=${show_per_page}`;
  
   var newurl = document.location.pathname +`?page=${start}&limit=${show_per_page}`;
   
   var nxtstate={};
   var nxtTitle ="";
   window.history.pushState(nxtstate,nxtTitle,newurl);
  
    fetch(queryURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(blogs) {
        console.log(blogs);
        hideLoading();
        var ss = document.getElementsByClassName("active");
        //console.log(ss[0]);
        ss[0].classList.remove("active");
        var nxt_btn=document.getElementsByClassName("controls");
        //console.log(start);
        nxt_btn[0].children[start].classList.add("active");
        buildTable(blogs);
        //nextBit=false;
        firstBit = false;
      })
      .catch(function(error) {
        console.log("Error during fetch: " + error.message);
        var tableBodyError = document.getElementById("full");
        tableBodyError.style.display="none";
        console.log(tableBodyError);
        var errorElement = document.getElementById("error");
        errorElement.textContent = "Error during fetch: " + `"${error.message}."`;

      });
}

   
      
  }
  let sno= 0;
  
  function buildTable(blogs) {
    blogs.forEach(function(curr) {
      addRowTable(curr.id,curr.createdAt,curr.title,curr.image);
    });
  }
  
  var tableBody;
  var newRow ;
  function addRowTable(ids,createdAt,title,image) {
     tableBody = document.querySelector("#tableBlogBody");
    newRow = tableBody.insertRow();
    var serialNo = newRow.insertCell();
    serialNo.innerHTML = ids ;
    var createdAtt = newRow.insertCell();
    createdAtt.innerHTML = createdAt;
    var titles = newRow.insertCell();
    titles.innerHTML = title;
    var images = newRow.insertCell();
    images.innerHTML = `<img src=${image} width="80" height="80">`;
    var actions=newRow.insertCell();
    actions.innerHTML=`<a href="view.html?id=${ids}">View</a> <a onclick='deleteDialog(this);' id=${ids}>Delete</a>`;
  
  }
  

function deleteDialog(uu){
  var idd=uu.id;
    if (confirm( `Do you want to delete item with id = ${idd}?`) == true) {
      deleteId(idd);
      } 
      else {
    }
}

function deleteId(idd){
  var deleteURL = `https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/${idd}`;

  fetch(deleteURL,{method:'DELETE'})
  .then(function(response) {
    location.reload();
    fetchBlogs();
  })
  .catch(function(error) {
    console.log("Error during fetch: " + error.message);
  });
}
const processChange = debounce(() => searchFunction());
function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
function searchFunction(){
  var input;
  input= document.getElementById("myInput");
if(input.value != ""){
  filter = input.value;
}
console.log(location.search);
var newsearchLoc = location.search;
if(newsearchLoc.includes("search")){
  var myarray=newsearchLoc.split("&",2);
  var agnSearch=myarray[0]+"&"+myarray[1];
  var sortInput=document.getElementById("sortBy");
  if(sortInput.value != ""){
    sortValue=sortInput.value;
    newsearchLoc = agnSearch+`&sortBy=${sortValue}&order=desc`;
  }else{
    newsearchLoc = agnSearch;
  }
}
  var searchUrl = "https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/"+newsearchLoc+`&search=${filter}`;
//var searchUrl = "https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/"+`?search=${filter}`;
console.log(searchUrl);

displayLoading();
var newurl = document.location.pathname +newsearchLoc+`&search=${filter}`;
   var nxtstate={};
   var nxtTitle ="";
   window.history.pushState(nxtstate,nxtTitle,newurl);
   currentUrl=searchUrl;
   commonDebounce();
   //commonFetch(searchUrl);
}
 function clearTable(){
  var tableHeaderRowCount = 0;
  var table = document.getElementById("tableBlogBody");
  var rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
      table.deleteRow(tableHeaderRowCount);
  }
 }

 const sortChange = debounce(() => mySort());
function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
 
 function mySort(sortObj){
  if(!sortBit){
    console.log("chup");
   sortValue = sortObj.value;
  }
  if(sortValue!=""){
    var zz = location.search;
    if(zz.includes("sortBy")){
      var myarray=zz.split("&",2);
      var agnSearch=myarray[0]+"&"+myarray[1];
     var input= document.getElementById("myInput");
     if(input!=""){
      filter=input.value;
      zz= agnSearch+`&search=${filter}`;
     }else{
      zz = agnSearch;
     }

     
    }
    var sortUrl="https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/"+ zz+`&sortBy=${sortValue}&order=desc`; 
displayLoading();

var newurl = document.location.pathname+zz+`&sortBy=${sortValue}&order=desc`;
console.log(newurl);
  }else{
    clearTable();
   // fetchBlogs();
  }

   var nxtstate={};
   var nxtTitle ="";
   window.history.pushState(nxtstate,nxtTitle,newurl);

fetch(sortUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(sortBlogs) {
        hideLoading();
        clearTable();
        buildTable(sortBlogs);
        sortBit=false;
      
      })
      .catch(function(error) {
        console.log("Error during fetch: " + error.message);
      });
    
 }