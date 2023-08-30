import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/svelte'
import AddForm from '../NewEmployeeForm.svelte'

import { describe, expect, it } from 'vitest'

describe('Add Employee Component', () => {
  const formData = {
    firstName: 'John',
    middleName: 'Smith',
    lastName: 'Doe',
    birthdate: '2019-12-12',
    gender: 'MALE',
    maritalStatus: 'DIVORCED',
    position: 'IT Staff',
    dateHired: '2020-12-12',
    contacts: [
      {
        value: 'johndoe@example.com',
        isPrimary: true,
      },
    ],
    addresses: [
      {
        addressOne: 'Mississippi',
        addressTwo: 'Las Vegas',
        isPrimary: true,
      },
    ],
  }

  it('Add Employee Form Testing', () => {
    const { container } = render(AddForm, { props: { employee: formData } })

    expect(container).toBeTruthy()

    const firstName = screen.getByTestId('firstName')
    const middleName = screen.getByTestId('middleName')
    const lastName = screen.getByTestId('lastName')
    const birthdate = screen.getByTestId('birthdate')
    const gender = screen.getByTestId('gender')
    const maritalStatus = screen.getByTestId('maritalStatus')
    const position = screen.getByTestId('position')
    const dateHired = screen.getByTestId('dateHired')
    const firstContact = screen.getByTestId('contact-0')
    const firstContactRadio = screen.getByTestId('contact-0-radio')
    const firstAddressOne = screen.getByTestId('addressOne-0')
    const firstAddressTwo = screen.getByTestId('addressTwo-0')
    const firstAddressRadio = screen.getByTestId('address-0-radio')

    expect(firstName.value).toBe(formData.firstName)
    expect(middleName.value).toBe(formData.middleName)
    expect(lastName.value).toBe(formData.lastName)
    expect(birthdate.value).toBe(formData.birthdate)
    expect(gender.value).toBe(formData.gender)
    expect(maritalStatus.value).toBe(formData.maritalStatus)
    expect(position.value).toBe(formData.position)
    expect(dateHired.value).toBe(formData.dateHired)
    expect(firstContact.value).toBe(formData.contacts[0].value)
    expect(firstContactRadio.value).toBeTruthy(formData.contacts[0].isPrimary)
    expect(firstAddressOne.value).toBe(formData.addresses[0].addressOne)
    expect(firstAddressTwo.value).toBe(formData.addresses[0].addressTwo)
    expect(firstAddressRadio.value).toBeTruthy(formData.addresses[0].isPrimary)
  })
})
