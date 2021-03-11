// ### Init
// * Asks for players' names.
// * Creates a new game
// * Displays the board.

$(document).ready(function () {
  let p1;
  let p2;

  function playersNames() {
    p1 = window.prompt("First player's name", "P1");
    p2 = window.prompt("Second player's name", "P2");
  }
  playersNames();

  while (
    p1 == p2 ||
    p1.length == 0 ||
    p2.length == 0 ||
    p1.trim().length == 0 ||
    p2.trim().length == 0
  ) {
    alert("Error: give different names to players");
    playersNames();
  }

  let game = new ConnectFour(p1, p2);
  $("#message-pane").html(
    game.currentPlayer() +
      ", your turn. Click/tap on column where you want to drop your disc."
  );
  $("#board").html(game.getColumnsDOM());

  $("#board").on("click", ".column", function (e) {
    let index = $(this).index();
    let status = game.dropByCurrentPlayer(index);

    if (status === "column-filled") {
      // Column is already filled!
      $("#message-pane").html(
        game.currentPlayer() + ", try some other column !"
      );
    } else if (status === "all-columns-filled") {
      // All Columns are already filled! Time for new game.
      $("#message-pane").html("Game Over. Nobody Wins :(");
      game = new ConnectFour(p1, p2);
    } else if (status === p1 || status === p2) {
      // Game over. Show message with result and starts new game.
      // Also, halts the view for user to see the end status just after win.
      $("#message-pane").html(
        "Game Over. Winner is " +
          status +
          " !" +
          " Click on any column to start a new game."
      );

      setTimeout(function () {
        game = new ConnectFour(p1, p2);
      }, 500);
    } else {
      // Continue, display the message wrt to whose turn it is
      $("#message-pane").html(
        game.currentPlayer() +
          ", your turn. Click/tap on column where you want to drop your disc."
      );
    }
    // Re-Display the board
    $("#board").html(game.getColumnsDOM());
    $("." + p1).css({ "background-color": "yellow" });
    $("." + p2).css({ "background-color": "red" });
  });
});
