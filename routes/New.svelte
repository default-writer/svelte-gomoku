<script>
  import Animation from "../components/Animation.svelte";
  import Title from "../components/Title.svelte";
  import TopMenu from "../components/TopMenu.svelte";
  import BottomMenu from "../components/BottomMenu.svelte";
  import { push } from "svelte-spa-router";
  import { name1, name2, game } from "../data/store.js";

  let player1;
  let player2;

  let player1Name = "";
  let player2Name = "";

  function newGame(event) {
    event.preventDefault();
    if (player1.value != "" && player2.value != "") {
      $name1 = player1.value;
      $name2 = player2.value;
      if ($game.render) {
        $game.render.remove();
      }
      $game.board = null;
      $game.result = "";
      push("/play");
    }
  }
</script>

<style>
  input {
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 1em;
    background-color: #f2f2f2;
    font-size: 1.5em;
    padding: 0.5em;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
  }
  label {
    font-size: 1.5em;
  }
</style>

<TopMenu/>
  <Animation>
    <Title name="Gomoku"/>
    <label for="player1">Player 1 Name</label>
    <input bind:this="{player1}" type="text" id="player1" value={$name1} />
    <p></p>
    <label for="player2">Player 2 Name</label>
    <input bind:this="{player2}" type="text" id="player2" value={$name2} />
    <p></p>
  </Animation>
<BottomMenu on:click={newGame} text="Start"/>
