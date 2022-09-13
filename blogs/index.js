fetchBlogs();
function fetchBlogs() {
    var queryURL = "https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs";
  
    fetch(queryURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(blogs) {
        buildTable(blogs);
      })
      .catch(function(error) {
        console.log("Error during fetch: " + error.message);
      });
  }
  let sno= 1;
  
  
  function buildTable(blogs) {
    blogs.forEach(function(curr) {
      addRowTable(curr.id,curr.createdAt,curr.title,curr.image);
    });
  }
  
  function addRowTable(ids,createdAt,title,image) {
    var tableBody = document.querySelector("#tableBlogBody");
  
    var newRow = tableBody.insertRow();
    var serialNo = newRow.insertCell();
    serialNo.innerHTML = sno ;
    sno++;
    var createdAtt = newRow.insertCell();
    createdAtt.innerHTML = createdAt;
    var titles = newRow.insertCell();
    titles.innerHTML = title;
    var images = newRow.insertCell();
    images.innerHTML = `<img src=${image} width="100" height="100">`;
    // var img = new Image(100, 100);
    // img.src = image;
    // images.appendChild(img);

    var actions=newRow.insertCell();
    actions.innerHTML=`<a href="view.html?id=${ids}">View</button> <a onclick='deleteDialog(this);' id=${ids}>Delete</a>`;
  
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
 