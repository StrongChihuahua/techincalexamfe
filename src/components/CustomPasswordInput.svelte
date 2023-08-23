<script>
  export let label
  export let value
  export let handleOnChange
  export let name
  export let disabled = false
</script>

<div>
  <label class="block text-sm font-medium text-gray-700 mb-3">
    <span>{label}</span>
    <input
      id={name}
      {name}
      type="password"
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
