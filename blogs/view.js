var queryString = location.search.substring(4);
console.log(queryString);
//var myId = sessionStorage.getItem('id');
viewBlogs();
function viewBlogs(){
    var queryURL = "https://631f09a058a1c0fe9f5e599a.mockapi.io/blogs";
  
    fetch(queryURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(blogs) {
        buildViewTable(blogs);
      })
      .catch(function(error) {
        console.log("Error during fetch: " + error.message);
      });

}
function buildViewTable(blogs) {
    for(var i =0; i<=blogs.length; i++){
        if(queryString == blogs[i].id){
            displayData(blogs[i]);
            break;
        }
    }
  }
  function displayData(data){
    var viewBody = document.querySelector("#tableViewBody");
    var newRow = viewBody.insertRow();
    var ids = newRow.insertCell();
    ids.innerHTML = data.id ;
    var createdAtt = newRow.insertCell();
    createdAtt.innerHTML = data.createdAt;
    var titles = newRow.insertCell();
    titles.innerHTML = data.title;
    var images = newRow.insertCell();
    images.innerHTML = `<img src=${data.image} width="100" height="100">`;
    var contents = newRow.insertCell();
    contents.innerHTML=data.content;
  }