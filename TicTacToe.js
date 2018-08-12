$(function(event) {
  //gameloop
  var cross_player_array = [];
  var circle_player_array = [];
  var winning_states = {};
  var board_size;

  setupGame();

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
        "height": ((92 / num) + "%")
      });
      // after the row is created add boxes inside the row
      for (var j = 0; j < num; j++) {
        // create box
        $('div.' + i).append(box.eq(0).clone());
        // chagne the width of the box
        $(".box").css({
          "width": ((92 / num) + "%")
        });
      }
    }
    createWinningStates(num);
  }
  //create all possible winning states
  function createWinningStates(num) {
    // setting variables for winning states
    var number = num;
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
  }
  //decide players turn and change box's to the correct symbol o or x
  function playerTurns(num) {
    //gets all the elemnts with box class and checks if they are clikced
    $(".box").on("click", function() {
      //if number (turns) is even then it is x's turn
      if (num % 2 == 0) {
        $(this).addClass('box playerCross');
        cross_player_array.push($(this).index(".box"));
        playerWon(cross_player_array, "crosses");
        //if number (turns) is odd then it is o's turn
      } else if (num % 2 == 1) {
        $(this).addClass('box playerCircle');
        circle_player_array.push($(this).index(".box"));
        playerWon(cross_player_array, "circles");
      }
      num++;
    })
  }
  //function to check which player won
  function playerWon(array, name) {
    //setting variables for player, count and set object length which contains winning states
    var player_array = array
    var count = 0;
    var object_length = objectLength(winning_states);
    //seperate each object property into arrays
    for (var i = 0; i < object_length; i++) {
      var winning_single_state = winning_states[i];
      //get the current property array and loop through checking if each element in inside players array
      for (var j = 0; j < winning_single_state.length; j++) {
        //if the player array has the property array element increment counter by 1
        if (player_array.includes(winning_single_state[j])) {
          count++;
        }
      }
      //check if counter is at board size if it is it initiates winning state
      if (count == board_size) {
        alert(name + " have won");
        setupGame();
        //if the player array is half + 1 length of all the elements inside the grid it will initiate a draw
      } else if (player_array.length == (Math.floor(((board_size * board_size) / 2) + 1))) {
        alert("This is a draw");
        setupGame();
        //if the count is less than board size and it resets the count so it could check other winning states
      } else if (count < board_size) {
        count = 0;
      }
    }
    //object length loop, gives number of properties in an object
    function objectLength(obj) {
      var count = 0;
      var i;

      for (i in obj) {
        if (obj.hasOwnProperty(i)) {
          count++;
        }
      }
      return count;
    }
  }
  //setsup the game
  function setupGame() {
    resetBoard();
    board_size = parseInt(prompt('Enter board size n x n:', '3'));
    drawBoard(board_size);
    playerTurns(0);
  }
  //resets all variables to initial values
  function resetBoard() {
    cross_player_array = [];
    circle_player_array = [];
    count = 0;
    $(".box").remove();
    $(".row").remove();
  }
})
