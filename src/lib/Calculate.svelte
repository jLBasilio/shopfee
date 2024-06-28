<script lang="ts">
  import { calculatePurchases, test } from "./util";

  let loading: boolean;
  let totalPurchases = 0;

  async function calculate() {
    loading = !loading;

    const { total, items } = await calculatePurchases();
    totalPurchases = total;
    loading = !loading;
  }
</script>

<div>
  <button on:click={calculate}> Calculate </button>
  {#if loading}
    <div>Loading...</div>
  {:else}
    <div>Total: {totalPurchases}</div>
  {/if}
</div>
