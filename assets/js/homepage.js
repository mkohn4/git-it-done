var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector('#username');

var getUserRepos = function(user) {

    //format the github api url
    var apiUrl = "https://api.github.com/users/"+user+"/repos";
    //make request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
        console.log(data);
        });
    });
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    var username = nameInputEl.ariaValueMax.trim();

    if(username) {
        getUserRepos(username);
        nameInputEl.value="";
    } else {
        alert("Please enter a Github Username");
    };
    console.log(event);
};




userFormEl.addEventListener("submit",formSubmitHandler);