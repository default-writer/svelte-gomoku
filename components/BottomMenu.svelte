<script>
  export let text;
</script>

<style>
  div {
    position: fixed;
    top: 100%;
    transform: translateY(-100%);
    width: 100%;
    background-color: black;
    display: block;
    color: #f2f2f2;
    text-align: center;
    margin: 0 0 0.5em 0;
    box-sizing: border-box;
    padding: 1em 2em;
    font-size: 1.5em;
    text-decoration: none;
  }
</style>

<div id="bottomMenu" on:click>{text}</div>