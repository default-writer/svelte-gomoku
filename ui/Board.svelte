<script>
  import p5 from "../utils/p5.min.js";
  import { R, G, B, name1, name2, game, alphabet } from "../data/store.js";
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";

  export let board;

  let id;
  let result = "";

  const columns = 20;
  const rows = 20;

  function initialize() {
    if (!board) {
      $game.current_player = 2; // black first
      board = new Array(columns);
      for (let i = 0; i < columns; i++) {
        board[i] = new Array(rows);
      }

      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          board[i][j] = 0;
        }
      }
    }
  }

  function isGameOver(i, j) {
    let board = $game.board;
    let color = board[i][j];
    if (color !== 0) {
      let count1 =
        lookForward(i, j, color, 0, 1) + lookForward(i, j, color, 0, -1);
      let count2 =
        lookForward(i, j, color, 1, 0) + lookForward(i, j, color, -1, 0);
      let count3 =
        lookForward(i, j, color, 1, 1) + lookForward(i, j, color, -1, -1);
      let count4 =
        lookForward(i, j, color, -1, 1) + lookForward(i, j, color, 1, -1);
      if (count1 > 5 || count2 > 5 || count3 > 5 || count4 > 5) return true;
    }
    return false;
  }

  function lookForward(x, y, color, di, dj) {
    let count = 0;
    let i = x;
    let j = y;
    while (i > 0 && i < columns && j > 0 && j < rows) {
      if (board[i][j] === color) {
        count++;
      } else {
        break;
      }
      i = i + di;
      j = j + dj;
    }
    return count;
  }

  function click() {
    if ($game.current_player === 0) {
      return false;
    }
    let p5 = $game.render;
    let board = $game.board;
    let cellWidth = $game.cellWidth;
    if (
      p5.mouseX <= 0 ||
      p5.mouseX >= columns * cellWidth ||
      p5.mouseY <= 0 ||
      p5.mouseY >= rows * cellWidth
    ) {
      return false;
    }

    const i = p5.floor((p5.mouseX + cellWidth / 2) / cellWidth);
    const j = p5.floor((p5.mouseY + cellWidth / 2) / cellWidth);

    if (i <= 0 || j <= 0 || i >= columns || j >= rows) {
      return false;
    }

    // if not the end of the game
    if ($game.current_player !== 0) {
      if (board[i][j] === 0) {
        board[i][j] = $game.current_player;
        $game.current_player = $game.current_player === 1 ? 2 : 1;
      }
    }

    p5.draw();

    if (isGameOver(i, j)) {
      $game.result =
        "game over " +
        ($game.current_player === 1 ? $name1 + " (black)" : $name2 + " (white)") +
        " wins";
      $game.current_player = 0;
      push("/result");
    }
  }

  let title;

  let render = function(p5) {
    let img;
    let board = $game.board;
    let cellWidth;
    let textSize;
    let strokeWidth;
    let white = p5.color(255);
    let black = p5.color(0);
    p5.setup = () => {
      let max = p5.floor(
        p5.min(
          p5.windowWidth,
          p5.windowHeight -
            document.getElementById("topMenu").offsetHeight -
            document.getElementById("bottomMenu").offsetHeight -
            document.getElementById("title").offsetHeight
        )
      );

      textSize = document.getElementById("topMenu").offsetHeight / 3;
      cellWidth = p5.floor(max / 20);

      // save settings for mouse interaction;
      $game.cellWidth = cellWidth;

      strokeWidth = p5.floor(cellWidth / 32);
      p5.createCanvas(cellWidth * 20, cellWidth * 20);
      p5.noLoop();
    };
    p5.draw = () => {
      p5.push();
      p5.smooth();
      p5.background($R, $G, $B);
      p5.fill($R, $G, $B);
      p5.strokeWeight(0.5);
      p5.rect(0, 0, columns * cellWidth - 1, rows * cellWidth - 1);
      for (let i = 1; i < columns - 1; i++) {
        for (let j = 1; j < rows - 1; j++) {
          p5.push();
          p5.fill($R, $G, $B);
          p5.rect(i * cellWidth, j * cellWidth, cellWidth - 1, cellWidth - 1);
          p5.pop();
        }
      }
      for (let i = 4; i < columns - 1; i += 6) {
        for (let j = 4; j < rows - 1; j += 6) {
          p5.push();
          p5.noStroke();
          p5.fill(89, 50, 25);
          p5.circle(i * cellWidth, j * cellWidth, cellWidth / 6 - 1);
          p5.pop();
        }
      }
      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          if (board[i][j] == 1) {
            p5.push();
            p5.fill(223, 223, 223);
            p5.noStroke();
            p5.circle(i * cellWidth, j * cellWidth, (cellWidth / 2.2) * 2 - 1);
            p5.fill(255, 255, 255, 63);
            p5.circle(
              i * cellWidth - cellWidth / 64,
              j * cellWidth - cellWidth / 64,
              (cellWidth / 2.2 - cellWidth / 32) * 2 - 1
            );
            p5.fill(255, 255, 255, 127);
            p5.circle(
              i * cellWidth - cellWidth / 32,
              j * cellWidth - cellWidth / 32,
              (cellWidth / 2.2 - cellWidth / 16) * 2 - 1
            );
            p5.fill(255, 255, 255, 127);
            p5.circle(
              i * cellWidth - cellWidth / 16,
              j * cellWidth - cellWidth / 16,
              (cellWidth / 2.2 - cellWidth / 8) * 2 - 1
            );
            p5.fill(255, 255, 255, 7);
            p5.circle(
              i * cellWidth - cellWidth / 16,
              j * cellWidth - cellWidth / 16,
              (cellWidth / 2.2 - cellWidth / 8) * 2 - 1
            );
            p5.fill(0, 0, 0, 7);
            p5.circle(
              i * cellWidth - cellWidth / 16,
              j * cellWidth - cellWidth / 16,
              (cellWidth / 2.2 - cellWidth / 4) * 2 - 1
            );
            p5.pop();
          }
          if (board[i][j] == 2) {
            p5.push();
            p5.fill(31, 31, 31);
            p5.noStroke();
            p5.circle(i * cellWidth, j * cellWidth, (cellWidth / 2.2) * 2 - 1);
            p5.fill(63, 63, 63, 63);
            p5.circle(
              i * cellWidth - cellWidth / 64,
              j * cellWidth - cellWidth / 64,
              (cellWidth / 2.2 - cellWidth / 32) * 2 - 1
            );
            p5.fill(63, 63, 63, 127);
            p5.circle(
              i * cellWidth - cellWidth / 32,
              j * cellWidth - cellWidth / 32,
              (cellWidth / 2.2 - cellWidth / 16) * 2 - 1
            );
            p5.fill(63, 63, 63, 127);
            p5.circle(
              i * cellWidth - cellWidth / 16,
              j * cellWidth - cellWidth / 16,
              (cellWidth / 2.2 - cellWidth / 8) * 2 - 1
            );
            p5.fill(255, 255, 255, 7);
            p5.circle(
              i * cellWidth - cellWidth / 16,
              j * cellWidth - cellWidth / 16,
              (cellWidth / 2.2 - cellWidth / 8) * 2 - 1
            );
            p5.fill(255, 255, 255, 7);
            p5.circle(
              i * cellWidth - cellWidth / 16,
              j * cellWidth - cellWidth / 16,
              (cellWidth / 2.2 - cellWidth / 4) * 2 - 1
            );
            p5.pop();
          }
        }
      }
      for (let j = columns - 1; j > 0; j--) {
        p5.push();
        p5.strokeWeight(2);
        p5.fill(black);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.textStyle(p5.BOLD);
        p5.textFont("Cousine Regular");
        p5.textSize(cellWidth / 3);
        p5.text(columns - j, cellWidth / 3, j * cellWidth);
        p5.pop();
      }
      for (let i = 1; i < rows; i++) {
        p5.push();
        p5.fill(black);
        p5.textStyle(p5.BOLD);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.textFont("Cousine Regular");
        p5.textSize(cellWidth / 3);
        p5.text(alphabet[i - 1], i * cellWidth, cellWidth - 2 * (cellWidth / 3));
        p5.pop();
      }
      p5.pop();
    };
  };


  onMount(function() {
    initialize();
    $game.result = result;
    $game.board = board;
    $game.render = new p5(render, id);  
  });

</script>

<style>
	div {
	  width: auto;
	  height: auto;
	  margin: 0 auto;
	  z-index: -1;
	}
</style>

<div bind:this={id} on:click={click}></div>