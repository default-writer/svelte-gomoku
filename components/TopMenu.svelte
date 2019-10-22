<script>
  import { link, location, push } from "svelte-spa-router";
  import { game } from "../data/store.js";

  function playGame() {
    push("/play");
  }
  function settingsGame() {
    push("/settings");
  }
</script>
<style>
  /* The navigation bar */
  .navbar {
    overflow: hidden;
    background-color: rgb(22, 88, 38);
    top: 0; /* Position the navbar at the top of the page */
    width: 100%; /* Full width */
    height: auto;
  }

  /* Links inside the navbar */
  .navbar a {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 1em 2em;
    font-size: 1.5em;
    text-decoration: none;
  }
  .navbar div {
    float: right;
    display: block;
    color: #adadad;
    text-align: center;
    padding: 1em 2em;
    text-decoration: none;
    font-size: 1.5em;
  }

  /* Change background on mouse-over */
  .navbar a:hover {
    background: #ddd;
    color: black;
  }
</style>

<div id="topMenu" class="navbar">
  <a href="/play" on:click={playGame} use:link>Play</a>
  <a href="/settings" on:click={settingsGame} use:link>Settings</a>
  <div>/{$location == "/" ? "/new game" : $location}</div>
</div>