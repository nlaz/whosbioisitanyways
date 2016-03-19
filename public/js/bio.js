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
        $("#profile").attr("src", user.profile_image_url.replace("_normal", ""));
    });
    e.preventDefault();
  }
});