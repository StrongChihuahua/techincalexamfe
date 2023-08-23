import { PUBLIC_URL } from '$env/static/public'
import axios from 'axios'

export const getTableData = async () => {
  return await axios({
    method: 'post',
    url: `${PUBLIC_URL}/graphql`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      query:
        '{employeeTable {    id  name   primaryAddress   primaryContact   age   yearsInTheCompany  }}',
    }),
  })
}

export const saveEmployee = async (query, variables) => {
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

export const getEmployee = async (id) => {
  const query = `
    query Employee($id: ID!) {
        employee(id: $id) {
            firstName,
            middleName,
            lastName,
            birthdate,
            gender,
            maritalStatus,
            position,
            dateHired,
            contacts {
                id,
                value,
                isPrimary
            }
            addresses {
                id,
                addressOne,
                addressTwo,
                isPrimary
            }
        }
    }
`
  return await axios({
    method: 'post',
    url: `${PUBLIC_URL}/graphql`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      query: query,
      variables: {
        id: parseInt(id),
      },
    }),
  })
}

export const deleteEmployee = async (id) => {
  const query = `
        mutation DeleteEmployee($id: ID!) {
            deleteEmployee(id: $id)
        }`
  return await axios({
    method: 'post',
    url: `${PUBLIC_URL}/graphql`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      query: query,
      variables: {
        id: parseInt(id),
      },
    }),
  })
}
