// Declare Global variables
var player1 = true;
var player2 = false;
var player1Score = 0;
var player2Score = 0;

// declare size of grid
var gridSize = 6;

// set color for squared that have scored
// Color string var for other browser (Chrome 17.0.963.56 and Firefox 8.0 tested)
var colorToCompare = "rgb(230, 0, 0)";
// IE 7 output the hex value
if (navigator.appName === "Microsoft Internet Explorer") {
  colorToCompare = "#e60000";
}

// set color for squared that have played
// Color string var for other browser (Chrome 17.0.963.56 and Firefox 8.0 tested)
var colorForPlay = "rgb(144, 238, 144)";
// IE 7 output the hex value
if (navigator.appName === "Microsoft Internet Explorer") {
  colorForPlay = "#90ee90";
}

// set color for square background
// Color string var for other browser (Chrome 17.0.963.56 and Firefox 8.0 tested)
var colorForBackground = "rgb(214, 214, 214)";
// IE 7 output the hex value
if (navigator.appName === "Microsoft Internet Explorer") {
  colorForBackground = "#d6d6d6";
}

function checkGrid(gridID) {
    // if grid square already scored  then do not allow it to be set
    if (document.getElementById(gridID).style.backgroundColor != colorToCompare) {
      // if grid square already contains a value then do not allow it to be reset
      if (document.getElementById(gridID).innerHTML == "") {
        // set the currently clicked grid square to the Play Value
        document.getElementById(gridID).innerHTML =
          document.getElementById("playValue").value;
        // set background
        document.getElementById(gridID).style.backgroundColor = colorForPlay;
        // Check if grid square up sum to Target value
        checkUp(gridID);
        checkDown(gridID);
        checkLeft(gridID);
        checkRight(gridID);
        checkAdjacent(gridID);
        // get the next Play Value
        document.getElementById("playValue").value = getValue();
      }
    }
  }
  
  
function scoreGrid(value) {
  console.log("at scoreGrid");
  console.log(player1Score);
  console.log(player2Score);
  console.log(value);
  console.log(player1);

  if (player1) {
    player1Score = player1Score + value;
    document.getElementById("player1Label").value = player1Score;
  } else {
    player2Score = player2Score + value;
    document.getElementById("player2Label").value = player2Score;
  }
}

function changeTurn() {
  console.log("at changeTurn");
  if (player1) {
    player1 = false;
    player2 = true;
    player2label.style.fontWeight = "bold";
    player2label.style.fontSize = "x-large";
    player2label.style.color = "#eb144c";

    player1label.style.fontWeight = "normal";
    player1label.style.fontSize = "medium";
    player1label.style.color = "#000000";

    return player2;
  } else {
    player1 = true;
    player2 = false;
    player1label.style.fontWeight = "bold";
    player1label.style.fontSize = "x-large";
    player1label.style.color = "#eb144c";

    player2label.style.fontWeight = "normal";
    player2label.style.fontSize = "medium";
    player2label.style.color = "#000000";

    return player1;
  }
}

function currentPlayer() {
  console.log("at currentPlayer");
  if (player1) {
    return player1;
  } else {
    return player2;
  }
  console.log(player1);
  console.log(player2);
}

function getValue() {
  //	document.getElementById("playValue").value = Math.floor((Math.random() * 4) + 1) ;
  return Math.floor(Math.random() * (gridSize - 2) + 1);
}
function colorSquareRight(selected_row, start_col, end_col) {
  var row;
  var gridID;
  var s_col;
  var e_col;
  var col;
  console.log("at colorSquareRight");
  console.log(start_col);
  console.log(end_col);

  //convert indices to int
  s_col = parseInt(start_col, 10);
  e_col = parseInt(end_col, 10);
  row = parseInt(selected_row, 10);
  // set all scored squares to block
  for (col = s_col + 1; col <= e_col; col++) {
    gridID = row.toString().concat("-");
    gridID = gridID.concat(col);
    console.log(gridID);
    document.getElementById(gridID).innerHTML = "";
    document.getElementById(gridID).style.backgroundColor = colorToCompare;
  }
}

function checkRight(gridID) {
  var sum = 0;
  var selected_row = gridID.slice(0, gridID.indexOf("-"));
  var selected_column = gridID.charAt(gridID.indexOf("-") + 1);
  //convert indices to int
  var row = parseInt(selected_row, 10);
  var col = parseInt(selected_column, 10);
  console.log("at checkRight");
  console.log(row);
  console.log(col);

  do {
    if (document.getElementById(gridID).innerHTML != "") {
      sum = sum + parseInt(document.getElementById(gridID).innerHTML, 10);
      console.log("sum =");
      console.log(sum);

      if (sum == document.getElementById("target").innerHTML) {
        colorSquareRight(row, selected_column, col);
        console.log("sum =");
        console.log(sum);
        // add code here to update score
        scoreGrid(sum);
      }
      col = col + 1;
      gridID = row.toString().concat("-");
      gridID = gridID.concat(col);
    }
  } while (
    col <= gridSize &&
    document.getElementById(gridID).innerHTML != "" &&
    sum != parseInt(document.getElementById("target").innerHTML, 10)
  );
}

function colorSquareLeft(selected_row, start_col, end_col) {
  var row;
  var gridID;
  var s_col;
  var e_col;
  var col;
  console.log("at colorSquareLeft");

  //convert indices to int
  s_col = parseInt(start_col, 10);
  e_col = parseInt(end_col, 10);
  row = parseInt(selected_row, 10);
  // set all scored squares to block
  for (col = s_col - 1; col >= e_col; col--) {
    gridID = row.toString().concat("-");
    gridID = gridID.concat(col);
    console.log(gridID);
    document.getElementById(gridID).innerHTML = "";
    document.getElementById(gridID).style.backgroundColor = colorToCompare;
  }
}

function checkLeft(gridID) {
  var sum = 0;
  var selected_row = gridID.slice(0, gridID.indexOf("-"));
  var selected_column = gridID.charAt(gridID.indexOf("-") + 1);
  //convert indices to int
  var row = parseInt(selected_row, 10);
  var col = parseInt(selected_column, 10);
  console.log("at checkLeft");
  console.log(row);
  console.log(col);

  do {
    if (document.getElementById(gridID).innerHTML != "") {
      sum = sum + parseInt(document.getElementById(gridID).innerHTML, 10);
      console.log("sum =");
      console.log(sum);

      if (sum == document.getElementById("target").innerHTML) {
        colorSquareLeft(row, selected_column, col);
        console.log("sum =");
        console.log(sum);
        // add code here to update score
        scoreGrid(sum);
      }
      col = col - 1;
      gridID = row.toString().concat("-");
      gridID = gridID.concat(col);
    }
  } while (
    col > 0 &&
    document.getElementById(gridID).innerHTML != "" &&
    sum != parseInt(document.getElementById("target").innerHTML, 10)
  );
}

function colorSquareUp(start_row, end_row, column) {
  var row;
  var gridID;
  var s_row;
  var e_row;
  var col;

  //convert indices to int
  s_row = parseInt(start_row, 10);
  e_row = parseInt(end_row, 10);
  col = parseInt(column, 10);
  // set all scored squares to block
  for (row = s_row - 1; row >= e_row; row--) {
    gridID = row.toString().concat("-");
    gridID = gridID.concat(col);
    document.getElementById(gridID).innerHTML = "";
    document.getElementById(gridID).style.backgroundColor = colorToCompare;
  }
}

function checkUp(gridID) {
  var sum = 0;
  var selected_row = gridID.slice(0, gridID.indexOf("-"));
  var selected_column = gridID.charAt(gridID.indexOf("-") + 1);
  //convert indices to int
  var row = parseInt(selected_row, 10);
  var col = parseInt(selected_column, 10);

  do {
    if (document.getElementById(gridID).innerHTML != "") {
      sum = sum + parseInt(document.getElementById(gridID).innerHTML, 10);

      if (sum == document.getElementById("target").innerHTML) {
        colorSquareUp(selected_row, row, selected_column);
        console.log("sum =");
        console.log(sum);
        // add code here to update score
        scoreGrid(sum);
      }
      row = row - 1;
      gridID = row.toString().concat("-");
      gridID = gridID.concat(selected_column);
    }
  } while (
    row > 0 &&
    document.getElementById(gridID).innerHTML != "" &&
    sum != parseInt(document.getElementById("target").innerHTML, 10)
  );
}

function colorSquareDown(start_row, end_row, column) {
  var row;
  var gridID;
  var s_row;
  var e_row;
  var col;

  //convert indices to int
  s_row = parseInt(start_row, 10);
  e_row = parseInt(end_row, 10);
  col = parseInt(column, 10);
  console.log("at colorSquareDown");
  console.log(s_row);
  console.log(e_row);

  // set all scored squares to block
  for (row = s_row + 1; row < e_row; row++) {
    console.log("at colorSquareDown for loop");
    console.log(row);
    gridID = row.toString().concat("-");
    gridID = gridID.concat(col);
    document.getElementById(gridID).innerHTML = "";
    document.getElementById(gridID).style.backgroundColor = colorToCompare;
  }
}

function checkDown(gridID) {
  var sum = 0;
  var selected_row = gridID.slice(0, gridID.indexOf("-"));
  var selected_column = gridID.charAt(gridID.indexOf("-") + 1);

  //convert indices to int
  var row = parseInt(selected_row, 10) + 1;
  var col = parseInt(selected_column, 10);
  //	sum = sum + parseInt(document.getElementById(gridID).innerHTML,10);

  do {
    if (document.getElementById(gridID).innerHTML != "") {
      sum = sum + parseInt(document.getElementById(gridID).innerHTML, 10);
      if (sum == document.getElementById("target").innerHTML) {
        colorSquareDown(selected_row, row, selected_column);
        console.log("sum =");
        console.log(sum);
        // add code here to update score
        scoreGrid(sum);
      }
      gridID = row.toString().concat("-");
      gridID = gridID.concat(selected_column);
      row = row + 1;
    }
  } while (
    row <= gridSize &&
    document.getElementById(gridID).innerHTML != "" &&
    sum != parseInt(document.getElementById("target").innerHTML, 10)
  );
}

function checkAdjacent(gridID) {
  var sum = 0;
  var value = 0;
  var row_limit = 0;
  var right_col_limit = 0;
  var left_col_limit = 0;
  var selected_row = gridID.slice(0, gridID.indexOf("-"));
  var selected_column = gridID.charAt(gridID.indexOf("-") + 1);

  //convert indices to int
  var row = parseInt(selected_row, 10);
  var col = parseInt(selected_column, 10);

  var top_row = 0;
  var bottom_row = 0;
  var leftmost_column = 0;
  var rightmost_column = 0;

  // var swap_value = 0;

  console.log("at checkAdjacent");

  if (selected_row - 1 < 1) {
    // is current row the top row?
    console.log("at top row");
    top_row = 1;
  }

  if (selected_row >= gridSize) {
    // is current row the bottom row?
    console.log("at bottom row");
    bottom_row = 1;
  }

  if (selected_column - 1 < 1) {
    // is current column the leftmost column?
    console.log("at the leftmost column");
    leftmost_column = 1;
  }

  if (selected_column >= gridSize) {
    // is current column the rightmost column?
    console.log("at the rightmost column");
    rightmost_column = 1;
  }

  // Check if not along an edge
  if (
    top_row == 0 &&
    bottom_row == 0 &&
    leftmost_column == 0 &&
    rightmost_column == 0
  ) {
    console.log("not at top, bottom, leftmost or rightmost");

    // row = selected_row -1;
    // temp = (parseInt(selected_column, 10) + 1 ) ;

    for (
      row = parseInt(selected_row, 10) - 1;
      row <= parseInt(selected_row, 10) + 1;
      row++
    ) {
      for (
        col = parseInt(selected_column, 10) - 1;
        col <= parseInt(selected_column, 10) + 1;
        col++
      ) {
        gridID = row.toString().concat("-");
        gridID = gridID.concat(col);
        value = parseInt(document.getElementById(gridID).innerHTML, 10);
        if (value) {
          sum = sum + value;
        }
        // document.getElementById(gridID).style.backgroundColor = colorToCompare;
      }
    }

    if (sum == document.getElementById("target").innerHTML) {
      // colorSquareUp(selected_row, row, selected_column);

      for (
        row = parseInt(selected_row, 10) - 1;
        row <= parseInt(selected_row, 10) + 1;
        row++
      ) {
        for (
          col = parseInt(selected_column, 10) - 1;
          col <= parseInt(selected_column, 10) + 1;
          col++
        ) {
          gridID = row.toString().concat("-");
          gridID = gridID.concat(col);
          if (document.getElementById(gridID).innerHTML !== "") {
            document.getElementById(gridID).innerHTML = "";
            document.getElementById(gridID).style.backgroundColor =
              colorToCompare;
          }
        }
      }

      console.log("sum =");
      console.log(sum);
      // add code here to update score
      scoreGrid(sum);
    }

    console.log("value for r-1 row", sum);
  }
  // then check if top or bottom row
  else if (top_row == 1 || bottom_row == 1) {
    // if top or bottom row
    // if top row, then set the row limit to next row below top row else set it to the row above the bottom row
    if (top_row == 1) {
      row_limit = parseInt(selected_row, 10) + 1;
    }
    // swap the for loop vars
    else {
      row_limit = selected_row;
      selected_row = parseInt(selected_row, 10) - 1;
    }
    // Find the sum of the adjacent cells - Loop thru adjacent rows
    for (row = parseInt(selected_row, 10); row <= row_limit; row++) {
      //set the column limits based on left or right most column
      if (leftmost_column == 1) {
        left_col_limit = parseInt(selected_column, 10);
        right_col_limit = parseInt(selected_column, 10) + 1;
      } else if (rightmost_column == 1) {
        left_col_limit = parseInt(selected_column, 10) - 1;
        right_col_limit = parseInt(selected_column, 10);
      }
      // this is not a corner so set adjacent columns on both sides
      else {
        left_col_limit = parseInt(selected_column, 10) - 1;
        right_col_limit = parseInt(selected_column, 10) + 1;
      }
      // Find the sum of adjacent cells - loop thru columns
      for (col = left_col_limit; col <= right_col_limit; col++) {
        gridID = row.toString().concat("-");
        gridID = gridID.concat(col);
        value = parseInt(document.getElementById(gridID).innerHTML, 10);
        if (value) {
          sum = sum + value;
        }
        // document.getElementById(gridID).style.backgroundColor = colorToCompare;
      }
    }
    if (sum == document.getElementById("target").innerHTML) {
      console.log("Adjacent cells = Target Value");
      console.log("sum =", sum);
      // console.log(sum);
      colorAdjacent(
        gridID,
        left_col_limit,
        right_col_limit,
        selected_row,
        row_limit
      );

      // add code here to update score
      scoreGrid(sum);
    }
  } else if (leftmost_column == 1 || rightmost_column == 1) {
    // if left-most or right-most column
    // if top row, then set the row limit to next row below top row else set it to the row above the bottom row
    if (top_row == 1) {
      row_limit = parseInt(selected_row, 10) + 1;
    }
    // swap the for loop vars
    else {
      row_limit = selected_row;
      selected_row = parseInt(selected_row, 10) - 1;
    }

    // if left
    if (leftmost_column == 1) {
      // leftmost_column = (parseInt(selected_column, 10))
      rightmost_column = leftmost_column + 1;
    }
    // swap the for loop vars
    else {
      rightmost_column = gridSize;
      leftmost_column = rightmost_column - 1;
    }
    // Find the sum of the adjacent cells - Loop thru adjacent rows
    for (row = parseInt(selected_row, 10); row <= row_limit; row++) {
      //set the column limits based on left or right most column
      if (leftmost_column == 1) {
        left_col_limit = parseInt(selected_column, 10);
        right_col_limit = parseInt(selected_column, 10) + 1;
      } else if (rightmost_column == 1) {
        left_col_limit = parseInt(selected_column, 10) - 1;
        right_col_limit = parseInt(selected_column, 10);
      }
      // this is not a corner so set adjacent columns on both sides
      else {
        left_col_limit = parseInt(selected_column, 10) - 1;
        right_col_limit = parseInt(selected_column, 10) + 1;
      }
      // Find the sum of adjacent cells - loop thru columns
      for (col = left_col_limit; col <= right_col_limit; col++) {
        gridID = row.toString().concat("-");
        gridID = gridID.concat(col);
        value = parseInt(document.getElementById(gridID).innerHTML, 10);
        if (value) {
          sum = sum + value;
        }
        // document.getElementById(gridID).style.backgroundColor = colorToCompare;
      }
    }
    if (sum == document.getElementById("target").innerHTML) {
      console.log("Adjacent cells = Target Value");
      console.log("sum =", sum);
      // console.log(sum);
      colorAdjacent(
        gridID,
        left_col_limit,
        right_col_limit,
        selected_row,
        row_limit
      );

      // add code here to update score
      scoreGrid(sum);
    }
  }
}

function colorAdjacent(
  gridID,
  left_col_limit,
  right_col_limit,
  selected_row,
  row_limit
) {
  var row;
  // var gridID;
  // var s_row;
  // var e_row;
  var col;

  //convert indices to int
  // s_row = parseInt(selected_row, 10);
  // e_row = parseInt(row_limit, 10);
  // col = parseInt(column, 10);
  console.log(
    "at colorAdjacent",
    left_col_limit,
    right_col_limit,
    selected_row,
    row_limit
  );
  // console.log(s_row);
  // console.log(e_row);

  for (row = parseInt(selected_row, 10); row <= row_limit; row++) {
    for (col = left_col_limit; col <= right_col_limit; col++) {
      console.log("at colorSquareDown for loop");
      console.log(row, "-", col);
      gridID = row.toString().concat("-");
      gridID = gridID.concat(col);
      if (document.getElementById(gridID).innerHTML != "") {
        document.getElementById(gridID).innerHTML = "";
        document.getElementById(gridID).style.backgroundColor = colorToCompare;
      }
    }
  }
}

function clearBoard() {
  var gridID;
  var row;
  var col;
  var row_string;
  var col_string;

  for (i = 1; i <= gridSize; i++) {
    row = i;
    row_string = row.toString();
    for (j = 1; j <= gridSize; j++) {
      col = j;
      col_string = col.toString();
      gridID = row_string.concat("-");
      gridID = gridID.concat(col_string);
      document.getElementById(gridID).innerHTML = "";
      document.getElementById(gridID).style.backgroundColor =
        colorForBackground;
    }
  }
}

function startBoard() {
  var gridID;
  var numSeed = Math.floor(Math.random() * (gridSize - 2) + 1);
  var row;
  var col;
  var row_string;
  var col_string;
  var player1Score = 0;
  var player2Score = 0;

  // Clear all grid squares
  clearBoard();

  // Initialize each of the seed grid squares
  for (i = 1; i <= numSeed; i++) {
    row = Math.floor(Math.random() * (gridSize - 2) + 1);
    row_string = row.toString();
    col = Math.floor(Math.random() * (gridSize - 2) + 1);
    col_string = col.toString();
    gridID = row_string.concat("-");
    gridID = gridID.concat(col_string);
    document.getElementById(gridID).innerHTML = Math.floor(
      Math.random() * (gridSize - 2) + 1
    );
    document.getElementById(gridID).style.backgroundColor = colorForPlay;
  }
}

function startGame() {
  // Start game by clearing and seeding the board
  startBoard();

  // Initialize the first number to be played
  document.getElementById("playValue").value = getValue();

  // Set the Target Value
  // document.getElementById("target").innerHTML = Math.floor((Math.random() * (((gridSize - 3) * gridSize) / 2)) + 4)

  document.getElementById("target").innerHTML = Math.floor(
    Math.random() * (gridSize * 2 - gridSize) + gridSize
  );

  console.log("Number to Play = ", document.getElementById("playValue").value);
  console.log("Target = ", document.getElementById("target").innerHTML);
}
