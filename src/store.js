import { writable } from 'svelte/store'
import { browser } from '$app/environment'

export const table_data = new writable([])

export const user_payload = new writable({})

let persistedRole = browser && localStorage.getItem('role')
export const role = new writable(persistedRole ? persistedRole : '')

// let persistedToken = browser && localStorage.getItem('token')

// export let token = new writable(persistedToken ? persistedToken : {})

if (browser) {
  role.subscribe((u) => (localStorage.role = u))
}
