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
        console.log(itemSize);
        myNews(show_per_page);
      })
      .catch(function(error) {
        console.log("Error during fetch: " + error.message);
      });
  }
  var number_of_pages;
function myNews(show_per_page) {
  console.log(show_per_page);
  console.log(itemSize);
  number_of_pages = Math.ceil(itemSize/show_per_page);
  console.log(number_of_pages);
let cp = document.getElementById("currentpage");
  cp.value=0;
  


  var navigation_links = `<a class="prev" onclick="previous();">Previous</a>`;
  var current_link = 0;
 while (number_of_pages > current_link) {
    navigation_links += `<a class="page" onclick="page_range(' + ${current_link} + ');"moveHover="' + ${current_link}+ "'>`+ (current_link + 1) +  `</a>`;
    current_link++;
  }


  navigation_links += `<a class="next" onclick="next();">Next</a>`;
let controlClass= document.getElementById("control");
controlClass.innerHTML = navigation_links;
console.log(controlClass);


}
function previous(){
  if(start!= 1){
    clearTable();
    start--;
   console.log(start);
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
  console.log(start);
  fetchBlogs();
}
}


//var myLink= location.href;
//var newLink= myLink+`?page=${start}&limit=${end}`;
//console.log(newLink);
//location = newLink;

fetchBlogs();
function fetchBlogs() {
displayLoading(); 
 // var queryURL = "https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/";
   var queryURL = "https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/"+`?page=${start}&limit=${show_per_page}`;
  console.log(queryURL);
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
  console.log(uu.id);
  var idd=uu.id;
    if (confirm( `Do you want to delete item with id = ${idd}?`) == true) {
      deleteId(idd);
      
    } else {
      
    }

}
function deleteId(idd){
  var deleteURL = `https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/${idd}`;
  console.log(deleteURL);

  fetch(deleteURL,{method:'DELETE'})
  .then(function(response) {
    location.reload();
    fetchBlogs();
  })
  .catch(function(error) {
    console.log("Error during fetch: " + error.message);
  });
}

function searchFunction(){
  var input;
  input= document.getElementById("myInput");
  var filter = input.value.toUpperCase();
  //var searchUrl = "https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/"+`?page=${start}&limit=${show_per_page}`+`&search=${filter}`;
var searchUrl = "https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs/"+`?search=${filter}`;
console.log(searchUrl);
displayLoading();
fetch(searchUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(blogs) {
        console.log(blogs);
        hideLoading();
        clearTable();
 
        buildTable(blogs);
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