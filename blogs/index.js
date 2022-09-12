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
    images.innerHTML = image;
  
  }
  