let start=1;
let show_per_page = 5;
let itemSize;
var prevBit=false;
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
  

 navigation_links = `<a class="prev" onclick="previous();">Previous</a>`;
 current_link = 0;
while (number_of_pages > current_link) {
    navigation_links += `<a class="page" id="${current_link+1}" onclick="page_range(this);"moveHover="' + ${current_link}+ "'>`+ (current_link + 1) +  `</a>`;
    current_link++;
  }

navigation_links += `<a class="next" onclick="next();">Next</a>`;
controlClass= document.getElementById("control");
controlClass.innerHTML = navigation_links;
//console.log(controlClass);
btn_elements = document.getElementsByClassName("page");
//console.log(btn_elements);
btn_elements[0].classList.add("active");
}
function previous(){
  if(start!= 1){
    clearTable();
    start--;
    var ss = document.getElementsByClassName("active");
    var chkId = ss[0].id;
    chkId--;
    ss[0].classList.remove("active");
    var prev_btn=document.getElementsByClassName("controls");
//console.log(nxt_btn);

prev_btn[0].children[chkId].classList.add("active");
   fetchBlogs();
  }
//   let newPage = parseInt(cp.val(), 0) - 1;
// console.log(newPage);
//   if ($('.active').prev('.page').length == true) {
//     page_range(newPage);
 // }

}
function next(){
if(start<number_of_pages){
  clearTable();
  start++;
  var ss = document.getElementsByClassName("active");
  var chkId = ss[0].id;
  chkId++;
  ss[0].classList.remove("active");
var nxt_btn=document.getElementsByClassName("controls");
console.log(nxt_btn);

nxt_btn[0].children[chkId].classList.add("active");
  fetchBlogs();
}
}

function page_range(xy){
  console.log(xy.id);
  var ss = document.getElementsByClassName("active");
  ss[0].classList.remove("active");
  xy.classList.add("active");
  start = xy.id;
  clearTable();
  fetchBlogs();



}
//var myLink= location.href;
//var newLink= myLink+`?page=${start}&limit=${end}`;
//console.log(newLink);
//location = newLink;
//var stop =false;
fetchBlogs();
function fetchBlogs() {
  //controlClass= document.getElementById("control");
 // btn_elements = document.getElementsByClassName("page");
//console.log(btn_elements.length);
//btn_elements[0].classList.add("active");
displayLoading(); 
 // var queryURL = "https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/";
   var queryURL = "https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/"+`?page=${start}&limit=${show_per_page}`;
   //console.log(document.location );
   
   var newurl = document.location.pathname +`?page=${start}&limit=${show_per_page}`;
  var cc = `?page=${start}&limit=${show_per_page}`;
   //console.log(cc);
   var nxtstate={};
   var nxtTitle ="";
   window.history.pushState(nxtstate,nxtTitle,newurl);
  // console.log(newurl);
  // console.log(location.search);
  //  if (location.search!= cc){
  //  window.history.pushState(nxtstate,nxtTitle,newurl);

  //   console.log("hellOOO");
  //   }
  //   if (location.search== cc){
  //     window.history.pushState(nxtstate,nxtTitle,newurl);

  //     console.log("hell");
  //     }
    fetch(queryURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(blogs) {
        console.log(blogs);
        hideLoading();
        buildTable(blogs);
      })
      .catch(function(error) {
        console.log("Error during fetch: " + error.message);
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
    images.innerHTML = `<img src=${image} width="100" height="100">`;
    var actions=newRow.insertCell();
    actions.innerHTML=`<a href="view.html?id=${ids}">View</a> <a onclick='deleteDialog(this);' id=${ids}>Delete</a>`;
  
  }
  
/*function viewEachId(uu){
  console.log(uu.id);
  sessionStorage.setItem("id", uu.id);
  location.href='view.html';
   

}*/
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

  var filter = input.value;
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
  //console.log(sortObj.value);
  var sortValue = sortObj.value;
  if(sortValue!=""){
var sortUrl="https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/"+`?sortBy=${sortValue}&order=desc`;
displayLoading();
var newurl = document.location.pathname +`?sortBy=${sortValue}&order=desc`;
  }else{
    clearTable();
    fetchBlogs();
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
      })
      .catch(function(error) {
        console.log("Error during fetch: " + error.message);
      });
 }