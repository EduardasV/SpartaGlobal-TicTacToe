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

  createWinningStates(5);
  //create all possible winning states
  function createWinningStates(num) {
    // setting variables for winning states
    var number = num;
    var winning_states = {};
    var array_elements;
    var initial_length = ((number * 2) + 2);
    //looping through the length of winning states
    for (var i = 0; i < initial_length; i++) {
      //reset temporary variables and set the new object of a winning state.
      var temp_array = []
      var temp_element = i;
      winning_states[i] = [];
      // check which winning state it's on for diagonal line
      if (i == (initial_length - 1)) {
        //add winning state element to temp array
        array_elements = 0;
        for (var j = 0; j < num; j++) {
          temp_array.push(array_elements);
          array_elements += num + 1;
        }
        // add temp array to winning state on position i
        winning_states[i] = temp_array;
        // check which winning state it's on for diagonal line
      } else if (i == (initial_length - 2)) {
        //add winning state element to temp array
        array_elements = num - 1;
        for (var j = 0; j < num; j++) {
          temp_array.push(array_elements);
          array_elements += num - 1;
        }
        // add temp array to winning state on position i
        winning_states[i] = temp_array;
        // check which winning state it's on for horizontal line
      } else if (i < num) {
        temp_element *= num;
        for (var x = 0; x < num; x++) {
          temp_array.push(temp_element + x);
        }
        // add temp array to winning state on position i
        winning_states[i] = temp_array;
        // check which winning state it's on for vertical line
      } else if (i < (num * 2)) {
        for (var x = 0; x < num; x++) {
          array_elements = (num * x) + (i - num);
          temp_array.push(array_elements);
        }
        // add temp array to winning state on position i
        winning_states[i] = temp_array;
      }
    }
    console.log(winning_states[0]);
    console.log(winning_states);
  }

})
