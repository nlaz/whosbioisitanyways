$("#input").keyup(function (e) {
  if (e.keyCode == 13) {
    var answer = $("#input").val();

    $.post(
      "/user", 
      { answer: answer },
      function(result) { 
        console.log(result);
    });
    e.preventDefault();
  }
});