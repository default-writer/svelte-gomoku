<script>
  import Animation from "../components/Animation.svelte";
  import Title from "../components/Title.svelte";
  import TopMenu from "../components/TopMenu.svelte";
  import BottomMenu from "../components/BottomMenu.svelte";
  import { game } from "../data/store.js";
  import { push } from "svelte-spa-router";

  function newGame() {
    push("/");
  }
</script>

<TopMenu/>
  <Animation>
    <Title name="Gomoku"/>
    <h1>{$game.result}</h1>
  </Animation>
<BottomMenu on:click={newGame} text="New Game"/>