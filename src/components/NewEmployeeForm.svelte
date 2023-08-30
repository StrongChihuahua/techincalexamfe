<script>
  export let employee
  export let handleOnSave
  export let handleOnChange
  export let handleOnContactInputChange
  export let deleteContactInput
  export let addContactInput
  export let handleOnAddressInputChange
  export let deleteAddressInput
  export let addAddressInput

  import CustomInput from './CustomInput.svelte'
  import CustomDateInput from './CustomDateInput.svelte'
  import CustomSelect from './CustomSelect.svelte'
</script>

<div>
  <form id="new-employee-form" on:submit|preventDefault={handleOnSave}>
    <div class="flex flex-col sm:flex-row gap-10">
      <div class="w-full sm:w-1/2">
        <CustomInput
          label={'First Name'}
          name={'firstName'}
          value={employee.firstName}
          {handleOnChange}
        />
        <CustomInput
          label={'Middle Name'}
          name={'middleName'}
          value={employee.middleName}
          {handleOnChange}
        />
        <CustomInput
          label={'Last Name'}
          name={'lastName'}
          value={employee.lastName}
          {handleOnChange}
        />

        <CustomDateInput
          label={'Birth Date'}
          name={'birthdate'}
          value={employee.birthdate}
          {handleOnChange}
        />

        <CustomSelect
          name={'gender'}
          label={'Gender'}
          options={['Male', 'Female', 'Other']}
          {handleOnChange}
          value={employee.gender}
        />

        <CustomSelect
          name={'maritalStatus'}
          label={'Marital Status '}
          options={['Divorced', 'Married', 'Single', 'Widowed']}
          {handleOnChange}
          value={employee.maritalStatus}
        />

        <CustomInput
          label={'Position'}
          name={'position'}
          value={employee.position}
          {handleOnChange}
        />

        <CustomDateInput
          label={'Date Hired'}
          name={'dateHired'}
          value={employee.dateHired}
          {handleOnChange}
        />
      </div>
      <div class="w-full sm:w-1/2">
        <div class="mb-4">
          <div class="flex justify-between">
            <span class="block text-sm font-medium text-gray-700">
              Contact Info:</span
            >
            <div class="text-sm font-medium text-gray-700">Primary?</div>
          </div>
          <div class="mt-1 space-y-2">
            {#each employee.contacts as contact, index}
              <div class="flex items-center space-x-2" key={index}>
                <input
                  name="value"
                  type="text"
                  class="p-2 w-full border rounded mb-3"
                  placeholder="Value"
                  data-testid={`contact-${index}`}
                  maxlength="20"
                  required
                  bind:value={contact.value}
                  on:change={(event) =>
                    handleOnContactInputChange(event, index)}
                />
                <input
                  type="radio"
                  name="isPrimaryContact"
                  data-testid={`contact-${index}-radio`}
                  class="form-radio"
                  on:change={(event) =>
                    handleOnContactInputChange(event, index, 'radio')}
                  checked={contact.isPrimary}
                />
                <button
                  class="ml-2 text-red-500 hover:text-red-700"
                  type="button"
                  on:click={() => deleteContactInput(index, contact.isPrimary)}
                >
                  <i class="fas fa-trash" />
                </button>
              </div>
            {/each}
          </div>
          {#if employee.contacts.length !== 4}
            <button
              class="ml-2 text-blue-500 hover:text-blue-700"
              type="button"
              on:click={addContactInput}
            >
              <i class="fas fa-plus" />
              Add Contact
            </button>
          {/if}
        </div>
        <div>
          <div class="flex justify-between">
            <span class="block text-sm font-medium text-gray-700">
              Address Info:
            </span>
            <div class="text-sm font-medium text-gray-700">Primary?</div>
          </div>
          <div class="mt-1 space-y-2">
            {#each employee.addresses as addres, index}
              <div class="flex items-center space-x-2" key={index}>
                <input
                  type="text"
                  name="addressOne"
                  class="p-2 w-full border rounded mb-3"
                  placeholder="Address 1"
                  data-testid={`addressOne-${index}`}
                  bind:value={addres.addressOne}
                  maxlength="40"
                  on:change={(event) =>
                    handleOnAddressInputChange(event, index)}
                  required
                />
                <input
                  name="addressTwo"
                  type="text"
                  class="p-2 w-full border rounded mb-3"
                  placeholder="Address 2"
                  bind:value={addres.addressTwo}
                  data-testid={`addressTwo-${index}`}
                  maxlength="40"
                  on:change={(event) =>
                    handleOnAddressInputChange(event, index)}
                  required
                />

                <input
                  type="radio"
                  name="isPrimaryAddress"
                  class="form-radio primary-address"
                  data-testid={`address-${index}-radio`}
                  checked={addres.isPrimary}
                  on:change={(event) =>
                    handleOnAddressInputChange(event, index, 'radio')}
                />
                <button
                  class="ml-2 text-red-500 hover:text-red-700"
                  type="button"
                  on:click={() => deleteAddressInput(index, addres.isPrimary)}
                >
                  <i class="fas fa-trash" />
                </button>
              </div>
            {/each}
          </div>
          {#if employee.addresses.length !== 4}
            <button
              class="ml-2 text-blue-500 hover:text-blue-700"
              type="button"
              on:click={addAddressInput}
            >
              <i class="fas fa-plus" />
              Add Address
            </button>
          {/if}
        </div>
      </div>
    </div>
    <div class="flex items-center pt-6 space-x-2">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
      >
        Save
      </button>
      <button
        id="modal-delete-btn"
        type="button"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
      >
        Delete
      </button>
    </div>
  </form>
</div>
