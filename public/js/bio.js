var inputForm = document.getElementById("input");

fetch_user();

inputForm.onkeyup = function(e) {
  e = e || window.event;

  if (e.keyCode == 13) {
    var answer = inputForm.value;

    var request = new XMLHttpRequest();
    request.open('GET', '/friend.json', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var user = JSON.parse(request.responseText);
        if (answer === user.name || answer === user.screen_name) {
          success(user);
        } else {
          failure(user);
        }
        revealReset(user);
      }
    };

    request.send();
    e.preventDefault();
  }
};

function fetch_user() {
  var request = new XMLHttpRequest();
  request.open('GET', '/new_user.json', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var user = JSON.parse(request.responseText);
      console.log(user);
      var bio = document.getElementById("bio");
      bio.innerHTML = user.description;
    }
  };

  request.send();
}

function success(friend) {
  var title = document.getElementById("title");
  title.innerHTML = "Correct! It's " + friend.name + "!";
  title.style.color = "#55acee";
}

function failure(friend) {
  var title = document.getElementById("title");
  title.innerHTML = "Wrong! It's actually " + friend.name + "!";
  title.style.color = "#a31400";
}

function revealReset(friend) {
  document.getElementById("profile").src = friend.profile_image_url.replace("_normal", "");
  resetForm(3000);
}

var timer;

function resetForm(time) {
  document.getElementById("countdown").innerHTML = time/1000;
  var timeLeft = time - 1000;
  clearTimeout(timer);
  timer = setTimeout(function () { 
    if (time <= 0){
      document.getElementById("profile").src = "img/placeholder.png";
      document.getElementById("title").innerHTML = "Whose bio is it anyway?";
      document.getElementById("title").style.color = "#000";
      document.getElementById("input").value = "";
      fetch_user();
    } else {
      resetForm(timeLeft);
    }
  }, 1000);
}

var engine = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: '/friends.json'
});

$('.typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'friends',
  source: engine
});