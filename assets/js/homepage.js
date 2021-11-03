var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector('#username');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');

var getUserRepos = function(user) {

    //format the github api url
    var apiUrl = "https://api.github.com/users/"+user+"/repos";
    //make request to the url
    fetch(apiUrl).then(function(response) {
        //if response is okay
       if(response.ok) {
           //return response in json format and call function to display data with displayRepos function
            response.json().then(function(data) {
            console.log(data);
            displayRepos(data, user);
        });
        } else {
        alert("Error: Github user not found");
        }
    }).catch(function(error) {
        //.catch() handles network errors and calls this function when there is a network issue
        alert("Unable to connect to Github.");
    });
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    var username = nameInputEl.value.trim();

    if(username) {
        getUserRepos(username);
        nameInputEl.value="";
    } else {
        alert("Please enter a Github Username");
    };
    console.log(event);
};

var displayRepos = function(repos, searchTerm) {

    //if api returns 0 repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found";
        return;
    }
    console.log(repos);
    console.log(searchTerm);
    //clear old content
    repoContainerEl.textContent = '';
    repoSearchTerm.textContent = searchTerm;

    //loop through length of repos
    for (var i=0; i<repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + '/' + repos[i].name;

        //create a container for each repo
        var repoEl = document.createElement('a');
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        //create a span element to hold repo name
        var titleEl = document.createElement('span');
        titleEl.textContent = repoName;

        //append to container
        repoEl.appendChild(titleEl);

        //create a status element
        var statusEl = document.createElement('span');
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append to new div container
        repoEl.appendChild(statusEl);

        //append to original div container to DOM
        repoContainerEl.appendChild(repoEl);
    }
};




userFormEl.addEventListener("submit",formSubmitHandler);