<script async>
  // import Header from '../../../components/Header.svelte'
  // import CustomInput from '../../../components/CustomInput.svelte'
  // import CustomDateInput from '../../../components/CustomDateInput.svelte'
  // import CustomSelect from '../../../components/CustomSelect.svelte'
  import { saveEmployee } from '../../../services/employee'
  import { goto } from '$app/navigation'

  import NewEmployeeForm from '../../../components/NewEmployeeForm.svelte'

  const employee = {
    firstName: '',
    middleName: '',
    lastName: '',
    birthdate: '2019-12-12',
    gender: 'MALE',
    maritalStatus: 'DIVORCED',
    position: '',
    dateHired: '2020-12-12',
    contacts: [
      {
        value: '',
        isPrimary: true,
      },
    ],
    addresses: [
      {
        addressOne: '',
        addressTwo: '',
        isPrimary: true,
      },
    ],
  }

  const addContactInput = () => {
    if (employee.contacts.length < 4) {
      employee.contacts = [
        ...employee.contacts,
        {
          value: '',
          isPrimary: false,
        },
      ]
    }
  }

  const deleteContactInput = (index, primary) => {
    if (employee.contacts.length > 1 && !primary) {
      employee.contacts = employee.contacts.filter((_, i) => i !== index)
    }
  }

  const addAddressInput = () => {
    if (employee.addresses.length < 4) {
      employee.addresses = [
        ...employee.addresses,
        {
          addressOne: '',
          addressTwo: '',
          isPrimary: false,
        },
      ]
    }
  }

  const deleteAddressInput = (index, primary) => {
    if (employee.addresses.length > 1 && !primary) {
      employee.addresses = employee.addresses.filter((_, i) => i !== index)
    }
  }

  const handleOnContactInputChange = (event, index, type) => {
    const { value, name, checked = false } = event.target
    if (type && type === 'radio') {
      const updatedContacts = employee.contacts.map((c, _index) => {
        if (_index === index) {
          return { ...c, isPrimary: checked }
        } else {
          return { ...c, isPrimary: false }
        }
      })

      employee.contacts = updatedContacts
    } else {
      employee.contacts[index] = {
        ...employee.contacts[index],
        [name]: value,
      }
    }
  }

  const handleOnAddressInputChange = (event, index, type) => {
    const { value, name, checked = false } = event.target
    if (type && type === 'radio') {
      const updatedAddress = employee.addresses.map((c, _index) => {
        if (_index === index) {
          return { ...c, isPrimary: checked }
        } else {
          return { ...c, isPrimary: false }
        }
      })

      employee.addresses = updatedAddress
    } else {
      employee.addresses[index] = {
        ...employee.addresses[index],
        [name]: value,
      }
    }
  }

  const handleOnChange = (event) => {
    const { name, value } = event.target
    employee[name] = value
  }

  const handleOnSave = async () => {
    try {
      const variables = {
        request: employee,
      }
      const mutation = `mutation Employee($request: EmployeeInput!) { addEmployee(request: $request) { id } }`

      await saveEmployee(mutation, variables)
      goto('/')
    } catch (error) {
      console.log(error)
    }
  }
</script>

<section class="flex justify-center">
  <div class="w-full sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-4/5 p-6 rounded-lg mt-6">
    <NewEmployeeForm
      {employee}
      {handleOnSave}
      {handleOnChange}
      {handleOnContactInputChange}
      {deleteContactInput}
      {addContactInput}
      {handleOnAddressInputChange}
      {deleteAddressInput}
      {addAddressInput}
    />
  </div>
</section>
