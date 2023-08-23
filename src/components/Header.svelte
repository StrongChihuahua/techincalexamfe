<script>
  import { goto } from '$app/navigation'
  import { role } from '../store'

  let _role = ''
  role.subscribe((val) => (_role = val))
  let isMenuOpen = false

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    goto('/login')
  }
</script>

<header class="bg-blue-800 text-white">
  <div class="flex items-center justify-between p-4">
    <div class="md:hidden">
      <button class="text-white" on:click={toggleMenu}>
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>
    <nav class="hidden md:flex space-x-4">
      <a href="/" class="hover:text-gray-300">Home</a>
      {#if _role === 'ROLE_ADMIN'}
        <a href="/employee/create" class="hover:text-gray-300">New Employee</a>
      {/if}
    </nav>
    <button on:click={handleLogout} class="text-xl font-semibold">
      <i class="fa fa-sign-out" />
    </button>
  </div>
  <div class={isMenuOpen ? 'md:hidden' : 'hidden'}>
    <nav class="p-4 space-y-2">
      <a href="/" class="block hover:text-gray-300">Home</a>
      <a href="/employee/create" class="block hover:text-gray-300"
        >New Employee</a
      >
    </nav>
  </div>
</header>
