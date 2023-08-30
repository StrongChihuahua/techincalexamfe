<script>
  import { table_data, role } from '../store'
  import { goto } from '$app/navigation'

  import { deleteEmployee } from '../services/employee'

  export let items = []
  export let _role = ''

  let currentPage = 1
  let itemsPerPage = 5
  let totalPages = Math.ceil(items.length / itemsPerPage)
  let startIndex = (currentPage - 1) * itemsPerPage
  let endIndex = startIndex + itemsPerPage

  let displayedData = items.slice(startIndex, endIndex)

  const goToPage = (pageNumber) => {
    currentPage = pageNumber
    startIndex = (currentPage - 1) * itemsPerPage
    endIndex = startIndex + itemsPerPage
    displayedData = items.slice(startIndex, endIndex)
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  const goToFirstPage = () => {
    goToPage(1)
  }

  const goToLastPage = () => {
    goToPage(totalPages)
  }

  const handleOnClickEdit = (id) => {
    goto(`/employee/${id}`)
  }

  const handleOnClickDelete = async (id) => {
    await deleteEmployee(id)
    displayedData = displayedData.filter((i) => i.id !== id)
    items = items.filter((i) => i.id !== id)
    if (!displayedData.length) {
      totalPages = Math.ceil(items.length / itemsPerPage)
      goToPage(currentPage - 1)
    }
  }
</script>

<section class="overflow-x-auto">
  <div class="min-w-full">
    {#if _role.length}
      <table class="table min-w-full text-left text-sm font-light">
        <thead class="border-b font-medium dark:border-neutral-500">
          <tr>
            <th scope="col" class="px-6 py-4">Name</th>
            <th scope="col" class="px-6 py-4">Primary Address</th>
            <th scope="col" class="px-6 py-4">Primary Contact Info</th>
            <th scope="col" class="px-6 py-4">Age</th>
            <th scope="col" class="px-6 py-4"># of Year in the Company</th>
            <th scope="col" class="px-6 py-4">Action</th>
          </tr>
        </thead>
        <tbody id="table-body">
          {#each displayedData as emp, index}
            <tr
              key={index}
              data-index={emp.id}
              data-testid={`data-row-${index}`}
              class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
            >
              <td class="whitespace-nowrap px-6 py-4 font-medium">{emp.name}</td
              >
              <td class="whitespace-nowrap px-6 py-4 font-medium">
                {emp.primaryAddress}
              </td>
              <td class="whitespace-nowrap px-6 py-4 font-medium">
                {emp.primaryContact}
              </td>
              <td class="whitespace-nowrap px-6 py-4 font-medium">
                {emp.age}
              </td>
              <td class="whitespace-nowrap px-6 py-4 font-medium">
                {emp.yearsInTheCompany}
              </td>
              <td>
                {#if _role === 'ROLE_ADMIN'}
                  <button
                    data-testid={'admin-edit-btn'}
                    class="view-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-2"
                    on:click={() => handleOnClickEdit(emp.id)}>Edit</button
                  >
                  <button
                    data-testid={'admin-delete-btn'}
                    class="delete-btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                    on:click={() => handleOnClickDelete(emp.id)}>Delete</button
                  >
                {:else if _role === 'ROLE_USER'}
                  <button
                    data-testid={'user-view-btn'}
                    class="view-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-2"
                    on:click={() => handleOnClickEdit(emp.id)}>View</button
                  >
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      <div
        class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3"
      >
        <div class="sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p data-testid={'total-items'}>
              Total Items: <b>{items.length}</b>
            </p>
          </div>
          <div>
            <nav aria-label="Page navigation example">
              <ul class="inline-flex -space-x-px text-base h-10">
                <li>
                  <button
                    data-testid={'table-first-page'}
                    on:click={goToFirstPage}
                    disabled={currentPage === 1}
                    class={`${
                      currentPage === 1 ? 'disabled-button' : ''
                    } flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    >First</button
                  >
                </li>
                <li>
                  <button
                    data-testid={'table-prev-page'}
                    on:click={prevPage}
                    disabled={currentPage === 1}
                    class={`${
                      currentPage === 1 ? 'disabled-button' : ''
                    } flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    >Prev</button
                  >
                </li>

                <li>
                  <button
                    data-testid={'table-next-page'}
                    on:click={nextPage}
                    disabled={currentPage === totalPages}
                    class={`${
                      currentPage === totalPages ? 'disabled-button' : ''
                    } flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    >Next</button
                  >
                </li>
                <li>
                  <button
                    data-testid={'table-last-page'}
                    on:click={goToLastPage}
                    disabled={currentPage === totalPages}
                    class={`${
                      currentPage === totalPages ? 'disabled-button' : ''
                    } flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    >Last</button
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .disabled-button {
    background-color: #e2e2e2;
    color: #a0a0a0;
    cursor: not-allowed;
  }
</style>
