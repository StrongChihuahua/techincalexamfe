import { getTableData } from '../services/employee'
import { table_data } from '../store'
export const ssr = false
export const prerender = 'auto'

export async function load() {
  try {
    const res = await getTableData()
    const {
      data: {
        data: { employeeTable: data = [] },
      },
    } = res
    table_data.set(data)

    return { items: data || [] }
  } catch (error) {
    console.log(error)
  }
}
