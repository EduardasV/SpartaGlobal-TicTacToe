$(function(event) {

  drawBoard(3);
  //create board function
  function drawBoard(num) {
    //create row of the board
    for (var i = 0; i < num; i++) {
      //set html tags in variables
      var box = $("<div class='box'></div>");
      var row = $("<div class='row " + i + "'>");
      // create rows
      $('#board_section').append(row.eq(0).clone());
      // change the css
      $(".row").css({
        "height": ((100 / num) + "%")
      });
      // after the row is created add boxes inside the row
      for (var j = 0; j < num; j++) {
        // create box
        $('div.' + i).append(box.eq(0).clone());
        // chagne the width of the box
        $(".box").css({
          "width": ((95 / num) + "%")
        });
      }
    }
  }

})
