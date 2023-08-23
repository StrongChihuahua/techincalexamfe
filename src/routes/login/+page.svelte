<script>
  import CustomInput from '../../components/CustomInput.svelte'
  import CustomPasswordInput from '../../components/CustomPasswordInput.svelte'
  import { login } from '../../services/user'
  import jwt_decode from 'jwt-decode'

  let hasError = false

  let payload = {
    username: '',
    password: '',
  }

  const handleOnLogin = async () => {
    try {
      const variables = {
        request: payload,
      }
      const mutation = `mutation Employee($request: LoginInput!) { login(request: $request) }`
      const res = await login(mutation, variables)

      const {
        data: { data },
      } = res

      if (!data) hasError = true

      const decoded = jwt_decode(data.login)
      // console.log(decoded)
      // user_payload.set({
      //   token: data,
      //   role: decoded.roles,
      //   username: decoded.username,
      // })

      localStorage.setItem('token', data.login)
      localStorage.setItem('role', decoded.roles)
      localStorage.setItem('username', decoded.username)
      hasError = false

      window.location.href = '/'
    } catch (error) {}
  }
</script>

<div class="bg-gray-100 flex justify-center items-center h-screen">
  <div class="bg-white shadow-md rounded-md p-8 w-96">
    <h1 class="text-2xl font-semibold mb-4">Sign In</h1>
    <form on:submit|preventDefault={handleOnLogin}>
      {#if hasError}
        <p class="text-red-500 mb-4">Invalid Credentials</p>
      {/if}

      <div class="mb-4">
        <CustomInput
          name={'username'}
          label={'Username'}
          value={payload.username}
          handleOnChange={(event) =>
            (payload[event.target.name] = event.target.value)}
        />
      </div>
      <div class="mb-4">
        <CustomPasswordInput
          name={'password'}
          label={'Password'}
          value={payload.password}
          handleOnChange={(event) =>
            (payload[event.target.name] = event.target.value)}
        />
      </div>

      <button
        class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
      >
        Sign In
      </button>
    </form>
  </div>
</div>
