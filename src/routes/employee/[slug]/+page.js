import { getEmployee } from '../../../services/employee'
export const prerender = true

export async function load({ params }) {
  try {
    const id = params.slug

    const res = await getEmployee(id)

    const {
      data: {
        data: { employee },
      },
    } = res

    if (!employee) throw Error('Employee Not Found')

    return { data: employee, id }
  } catch (error) {
    console.log(error)
  }
}
