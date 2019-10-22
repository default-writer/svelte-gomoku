<script>
  import New from "../routes/New.svelte";
  import Play from "../routes/Play.svelte";
  import Settings from "../routes/Settings.svelte";
  import Error from "../routes/Error.svelte";
  import Result from "../routes/Result.svelte";
  import Router from "svelte-spa-router";
  import { push } from "svelte-spa-router";

  const routes = {
    // Exact path
    "/": New,
    "/play": Play,
    "/settings": Settings,
    "/result": Result,
    // Catch-all
    // This is optional, but if present it must be the last
    "*": Error
  };

  push("/");
</script>
<style>
  /*@import url("./fonts/Cousine-Regular.ttf");*/
  :global(body) {
    margin: 0;
    padding: 0;
  }
  :global(*) {
    margin: 0;
    padding: 0;
    font-family: "Cousine Regular", "Trebuchet MS", "Lucida Sans Unicode",
      "Lucida Grande", "Lucida Sans", Arial, sans-serif;
    -webkit-user-select: none; /* webkit (safari, chrome) browsers */
    -moz-user-select: none; /* mozilla browsers */
    -khtml-user-select: none; /* webkit (konqueror) browsers */
    -ms-user-select: none; /* IE10+ */
  }
  :global(h1) {
    font-size: 1.5em;
  }
  main {
    margin-top: 3em;
    margin: 0 auto;
    border: 0;
    margin: 0;
    padding: 0;
    text-align: center;
  }
</style>
<main>
  <Router {routes}/>
</main>
