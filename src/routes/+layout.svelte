<script>
  import { page } from '$app/stores'
  import Header from '../components/Header.svelte'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  //   import { token } from '../store'

  let user_payload = ''
  let isAuthenticated = false

  onMount(async () => {
    user_payload = localStorage.getItem('token')

    if (!user_payload) {
      goto('/login')
      isAuthenticated = false
    }
    isAuthenticated = true
  })
</script>

{#if isAuthenticated && $page.url.pathname !== '/login'}
  <Header />
  <slot />
{:else}
  <slot />
{/if}
