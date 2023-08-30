<script>
  export let label
  export let value
  export let handleOnChange
  export let name
  export let disabled = false
</script>

<div>
  <label class="block text-sm font-medium text-gray-700 mb-3">
    <span data-testid={'input-label'}>{label}</span>
    <input
      id={name}
      data-testid={name}
      {name}
      type="text"
      class="mt-1 p-2.5 w-full border rounded"
      placeholder={label}
      maxlength="20"
      required
      bind:value
      on:change|preventDefault={handleOnChange}
      {disabled}
    />
  </label>
</div>
