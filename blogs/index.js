let start=1;
let show_per_page = 5;
let itemSize;
var prevBit=false;
var nextBit=false;
var  firstBit = false;
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
let cp = document.getElementById("currentpage");
  cp.value=0;
  

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
function previous(){
  if(start!= 1){
    clearTable();
    start--;
    nextBit=true;
   // var ss = document.getElementsByClassName("active");
    //var chkId = ss[0].id;
   // chkId--;
   // ss[0].classList.remove("active");
   // var prev_btn=document.getElementsByClassName("controls");

//prev_btn[0].children[chkId].classList.add("active");
   fetchBlogs();
  }

}
function next(){
if(start<number_of_pages){
  clearTable();
  start++;
  nextBit = true;
  //var ss = document.getElementsByClassName("active");
  //var chkId = ss[0].id;
 // chkId++;
  //ss[0].classList.remove("active");
//var nxt_btn=document.getElementsByClassName("controls");
//console.log(nxt_btn);

//nxt_btn[0].children[chkId].classList.add("active");
  fetchBlogs();
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
  fetchBlogs();
}

var filter="";
var sortValue="";
var sortBit = false;

function fetchBlogs() {

displayLoading();

if(!nextBit){
  //console.log(location.search.length);
  if(location.search.length){
    console.log(location.search);
    var pageLOC =location.search;
    //var xxxx=pageLOC.toString();
    var slicestring= pageLOC.split("?",2);
    console.log(slicestring);
    var mystring = slicestring[1];

var equalaftr= mystring.split("=",2);
console.log(equalaftr);
if(equalaftr[0]=="page"){
  console.log("page");
  var pages = equalaftr[1].split("&",2);
 var finalPage= pages[0];
 console.log(finalPage);
 start = finalPage;

}else if(equalaftr[0]=="search"){
  console.log("serach");
  var finalfilter= equalaftr[1];
  filter = finalfilter;
  processChange();

}else if(equalaftr[0]=="sortBy"){
  console.log("sort");
  var sorts = equalaftr[1].split("&",2);
  var finalSort= sorts[0];
  console.log(finalSort);
sortValue = finalSort;
sortBit =true;
mySort("");

}
    
//var pageLOC=location.search[6];
//if(pageLOC.isInteger)
//start = pageLOC;

  }
}


 // var queryURL = "https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/";
   var queryURL = "https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/"+`?page=${start}&limit=${show_per_page}`;
  
   var newurl = document.location.pathname +`?page=${start}&limit=${show_per_page}`;
   var cc = `?page=${start}&limit=${show_per_page}`;
   
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
        console.log(ss[0]);
        ss[0].classList.remove("active");
        var nxt_btn=document.getElementsByClassName("controls");
        console.log(start);
        nxt_btn[0].children[start].classList.add("active");
        buildTable(blogs);
        nextBit=false;
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
  //console.log(uu.id);
  var idd=uu.id;
    if (confirm( `Do you want to delete item with id = ${idd}?`) == true) {
      deleteId(idd);
      } 
      else {
    }
}

function deleteId(idd){
  var deleteURL = `https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/${idd}`;
  //console.log(deleteURL);

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
  //var inputDisabled= input.disabled;
   // document.getElementById("myInput").disabled = true;
if(input.value != ""){
  filter = input.value;
}
  
  //var searchUrl = "https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/"+`?page=${start}&limit=${show_per_page}`+`&search=${filter}`;
var searchUrl = "https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/"+`?search=${filter}`;
//console.log(searchUrl);

displayLoading();
var newurl = document.location.pathname +`?search=${filter}`;
   var nxtstate={};
   var nxtTitle ="";
   window.history.pushState(nxtstate,nxtTitle,newurl);

fetch(searchUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(blogs) {
        console.log(blogs);
        hideLoading();
        clearTable();
 
        buildTable(blogs);
       // document.getElementById("myInput").disabled = false;
      
      })
      .catch(function(error) {
        console.log("Error during fetch: " + error.message);
      });
}
 function clearTable(){
  var tableHeaderRowCount = 0;
  var table = document.getElementById("tableBlogBody");
  var rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
      table.deleteRow(tableHeaderRowCount);
  }
 }
 
 function mySort(sortObj){
  console.log(sortObj.value);
  if(!sortBit){
    console.log("chup");
   sortValue = sortObj.value;
  }
  if(sortValue!=""){
    console.log("chup1");
var sortUrl="https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/"+`?sortBy=${sortValue}&order=desc`;
displayLoading();

var newurl = document.location.pathname +`?sortBy=${sortValue}&order=desc`;
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
        //console.log(sortBlogs);
        hideLoading();
        clearTable();
        buildTable(sortBlogs);
        sortBit=false;
      
      })
      .catch(function(error) {
        console.log("Error during fetch: " + error.message);
      });
    
 }