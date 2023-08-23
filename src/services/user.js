import { PUBLIC_URL } from '$env/static/public'
import axios from 'axios'

export const login = async (query, variables) => {
  return await axios({
    method: 'post',
    url: `${PUBLIC_URL}/graphql`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      query,
      variables,
    }),
  })
}
