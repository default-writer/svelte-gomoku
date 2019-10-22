<script>
  import Animation from "../components/Animation.svelte";
  import Title from "../components/Title.svelte";
  import TopMenu from "../components/TopMenu.svelte";
  import BottomMenu from "../components/BottomMenu.svelte";
  import { push } from "svelte-spa-router";

  import { R, G, B, game } from "../data/store.js";

  let r, g, b;
  function applySettings() {
    event.preventDefault();
    if (
      r.value >= 0 &&
      r.value <= 255 &&
      g.value >= 0 &&
      g.value <= 255 &&
      b.value >= 0 &&
      b.value <= 255
    ) {
      $R = r.value;
      $G = g.value;
      $B = b.value;
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
    <label for="r">R</label>
    <input bind:this="{r}"  id="r" type="number" value={$R} min="0" max="255"/>
    <p></p>
    <label for="g">G</label>
    <input bind:this="{g}"  id="g" type="number" value={$G} min="0" max="255"/>
    <p></p>
    <label for="b">B</label>
    <input bind:this="{b}"  id="b" type="number" value={$B} min="0" max="255"/>
    <p></p>
  </Animation>
<BottomMenu on:click={applySettings} text="Apply"/>