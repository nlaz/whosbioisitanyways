$("#input").keyup(function (e) {
  if (e.keyCode == 13) {
    $.post("user", { answer: $("input").value },
      function(result) { 

    });
  }
});