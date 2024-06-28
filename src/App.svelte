<script lang="ts">
  import { onMount } from "svelte";
  import shopeeLogo from "./assets/shopee.svg";
  import Calculate from "./lib/Calculate.svelte";
  import { isLoggedIn } from "./lib/util";

  onMount(async () => {
    const authed = await isLoggedIn();
    console.log(authed);
  });
</script>

<main>
  <img src={shopeeLogo} class="logo shopee" alt="Shopee Logo" />
  <h1>Shopfee</h1>

  <div class="card">
    <Calculate />
  </div>
</main>

<style>
  h1 {
    margin: 0;
  }
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
</style>
