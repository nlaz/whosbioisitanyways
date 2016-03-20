$("#input").keyup(function (e) {
  if (e.keyCode == 13) {
    var answer = $("#input").val();

    $.get(
      "/friend.json",
      function(result) {
        var user = JSON.parse(result);
        console.log(user);
        if (answer === user.name || answer === user.screen_name) {
          success(user);
        } else {
          failure(user);
        }
        revealReset(user);
      }
    );
    e.preventDefault();
  }
});

function success(friend) {
  $("#title").text("You got it!").css("color", "#55acee");
}

function failure(friend) {
  $("#title").text("Nope! You got it wrong! It's " + friend.name + "!").css("color", "#a31400");
}

function revealReset(friend) {
  $("#profile").attr("src", friend.profile_image_url.replace("_normal", ""));
  setTimeout(function () { 
    location.reload();
  }, 2000);
}