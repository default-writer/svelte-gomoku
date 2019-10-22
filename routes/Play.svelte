<script>
  import Animation from "../components/Animation.svelte";
  import TopMenu from "../components/TopMenu.svelte";
  import Title from "../components/Title.svelte";
  import BottomMenu from "../components/BottomMenu.svelte";
  import Board from "../ui/Board.svelte";
  import { game  } from "../data/store.js";
  import { push } from "svelte-spa-router";

  function newGame() {
    push("/");
  }
</script>

<TopMenu/>
  <Animation>
    <Title name="Gomoku"/>
    <Board board={$game.board} />
  </Animation>
<BottomMenu on:click={newGame} text="New Game"/>

