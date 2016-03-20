$("#input").keyup(function (e) {
  if (e.keyCode == 13) {
    var answer = $("#input").val();

    $.post(
      "/user", 
      { answer: answer },
      function(result) {
        var user = JSON.parse(result);
        console.log(result);
        console.log(user);
        success(user);
    }).fail( function(xhr) {
      if (xhr.status === 422)
        console.log('Error! Incorrect input!');
    });
    e.preventDefault();
  }
});

function success(friend) {
  $("#profile").attr("src", friend.profile_image_url.replace("_normal", ""));
  $("#title").text("You got it!").css("color", "#55acee");
  setTimeout(function () { 
    location.reload();
  }, 2000);
}