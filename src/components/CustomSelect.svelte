<script>
  export let options = []
  export let value
  export let handleOnChange
  export let name
  export let label
  export let disabled = false
</script>

<div>
  <label class="block text-sm font-medium text-gray-700 mb-3">
    <span data-testid={'input-label'}>{label}</span>
    <select
      id={name}
      {name}
      data-testid={name}
      class="mt-1 p-2 w-full border rounded"
      required
      bind:value
      on:change={handleOnChange}
      {disabled}
    >
      {#each options as opt, index}
        <option key={index} value={opt.toUpperCase()}>{opt}</option>
      {/each}
    </select>
  </label>
</div>
