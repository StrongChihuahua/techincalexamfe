import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/svelte'
import CustomTable from '../Table.svelte'

import { beforeAll, describe, expect, it } from 'vitest'

describe('Table Component Test', () => {
  // Mock data from API - 15 Items
  const mockData = [
    // 1st page
    {
      age: 28,
      id: 1,
      name: 'John Doe',
      primaryAddress: '123 Main St, Cityville',
      primaryContact: 'johndoe@example.com',
      yearsInTheCompany: 5,
    },
    {
      age: 35,
      id: 2,
      name: 'Jane Smith',
      primaryAddress: '456 Elm Rd, Townsville',
      primaryContact: 'janesmith@example.com',
      yearsInTheCompany: 8,
    },
    {
      age: 42,
      id: 3,
      name: 'Michael Johnson',
      primaryAddress: '789 Oak Ave, Villageland',
      primaryContact: 'michael@example.com',
      yearsInTheCompany: 12,
    },
    {
      age: 31,
      id: 4,
      name: 'Emily Brown',
      primaryAddress: '567 Pine Lane, Hamletown',
      primaryContact: 'emilybrown@example.com',
      yearsInTheCompany: 3,
    },
    {
      age: 27,
      id: 5,
      name: 'William Davis',
      primaryAddress: '890 Cedar St, Riverside',
      primaryContact: 'williamdavis@example.com',
      yearsInTheCompany: 7,
    },
    // 2nd page
    {
      age: 29,
      id: 6,
      name: 'Olivia Wilson',
      primaryAddress: '234 Birch Ave, Summitville',
      primaryContact: 'oliviawilson@example.com',
      yearsInTheCompany: 4,
    },
    {
      age: 38,
      id: 7,
      name: 'James Anderson',
      primaryAddress: '345 Maple Rd, Brookside',
      primaryContact: 'jamesanderson@example.com',
      yearsInTheCompany: 10,
    },
    {
      age: 25,
      id: 8,
      name: 'Sophia Martinez',
      primaryAddress: '678 Oak St, Lakeside',
      primaryContact: 'sophiamartinez@example.com',
      yearsInTheCompany: 2,
    },
    {
      age: 33,
      id: 9,
      name: 'Daniel Taylor',
      primaryAddress: '123 Elm Ave, Meadowland',
      primaryContact: 'danieltaylor@example.com',
      yearsInTheCompany: 6,
    },
    {
      age: 40,
      id: 10,
      name: 'Ava Garcia',
      primaryAddress: '456 Pine Rd, Oceanview',
      primaryContact: 'avagarcia@example.com',
      yearsInTheCompany: 9,
    },
    // 3rd page
    {
      age: 26,
      id: 11,
      name: 'Liam Hernandez',
      primaryAddress: '789 Maple Ave, Hillside',
      primaryContact: 'liamhernandez@example.com',
      yearsInTheCompany: 1,
    },
    {
      age: 32,
      id: 12,
      name: 'Isabella Miller',
      primaryAddress: '567 Oak Rd, Valleytown',
      primaryContact: 'isabellamiller@example.com',
      yearsInTheCompany: 7,
    },
    {
      age: 36,
      id: 13,
      name: 'Benjamin Jackson',
      primaryAddress: '890 Pine Ave, Mountainville',
      primaryContact: 'benjaminjackson@example.com',
      yearsInTheCompany: 11,
    },
    {
      age: 30,
      id: 14,
      name: 'Mia Brown',
      primaryAddress: '234 Cedar Rd, Meadowville',
      primaryContact: 'miabrown@example.com',
      yearsInTheCompany: 3,
    },
    {
      age: 29,
      id: 15,
      name: 'Ethan Wilson',
      primaryAddress: '456 Birch St, Lakeside',
      primaryContact: 'ethanwilson@example.com',
      yearsInTheCompany: 5,
    },
  ]

  it('Check if all data is loaded in the table [ADMIN]', () => {
    const { container } = render(CustomTable, {
      props: { items: mockData, _role: 'ROLE_ADMIN' },
    })

    // check if the containter is rendered
    expect(container).toBeTruthy()

    const total = screen.getByTestId('total-items')
    const totalItemCount = parseInt(total.querySelector('b').textContent, 10)

    const adminEditButtons = screen.getAllByTestId('admin-edit-btn')
    const adminDeleteButtons = screen.getAllByTestId('admin-delete-btn')

    // check RBAC if enforced
    expect(adminEditButtons.length).toBeGreaterThan(0)
    expect(adminDeleteButtons.length).toBeGreaterThan(0)

    //check if mockData items is equal to total count of the table
    expect(totalItemCount).toBe(mockData.length)
  })

  it('Check if all data is loaded in the table [USER]', () => {
    const { container } = render(CustomTable, {
      props: { items: mockData, _role: 'ROLE_USER' },
    })

    // check if the containter is rendered
    expect(container).toBeTruthy()

    const total = screen.getByTestId('total-items')
    const totalItemCount = parseInt(total.querySelector('b').textContent, 10)

    const userViewButtons = screen.getAllByTestId('user-view-btn')

    // check RBAC if enforced
    expect(userViewButtons.length).toBeGreaterThan(0)

    //check if mockData items is equal to total count of the table
    expect(totalItemCount).toBe(mockData.length)
  })

  it('Test Pagination "Next" button', async () => {
    const { container } = render(CustomTable, {
      props: { items: mockData, _role: 'ROLE_ADMIN' },
    })

    // check if the containter is rendered
    expect(container).toBeTruthy()

    // first item in the table
    const firstItemIndex = 0

    const firstItem = screen.getByTestId(`data-row-${firstItemIndex}`)
    const firstItemIdValue = firstItem.getAttribute('data-index')

    // check if the first item in the table is id = 1 (First Page)
    expect(firstItemIdValue).toBe((firstItemIndex + 1).toString())

    const nextBtn = screen.getByTestId('table-next-page')

    // next page (when next btn will trigger)
    await fireEvent.click(nextBtn)

    const nextItem = screen.getByTestId(`data-row-${firstItemIndex}`)
    const nextTtemIdValue = nextItem.getAttribute('data-index')

    // check if the next page is with id = 6 (Note that table items per page is set to 5)
    expect(nextTtemIdValue).toBe('6')
  })

  it('Test Pagination "Last" button', async () => {
    const { container } = render(CustomTable, {
      props: { items: mockData, _role: 'ROLE_ADMIN' },
    })

    // check if the containter is rendered
    expect(container).toBeTruthy()

    // first item in the table
    const firstItemIndex = 0

    const firstItem = screen.getByTestId(`data-row-${firstItemIndex}`)
    const firstItemIdValue = firstItem.getAttribute('data-index')

    // check if the first item in the table is id = 1 (First Page)
    expect(firstItemIdValue).toBe((firstItemIndex + 1).toString())

    const lastBtn = screen.getByTestId('table-last-page')

    // last page (when last btn will trigger)
    await fireEvent.click(lastBtn)

    const nextItem = screen.getByTestId(`data-row-${firstItemIndex}`)
    const nextTtemIdValue = nextItem.getAttribute('data-index')

    // check if the last page is with id = 11 (Note that table items per page is set to 5)
    expect(nextTtemIdValue).toBe('11')
  })

  describe('Testing First and Prev Pagination Buttons', () => {
    let container
    beforeEach(async () => {
      const { container: _container } = render(CustomTable, {
        props: { items: mockData, _role: 'ROLE_ADMIN' },
      })
      container = _container
      const lastBtn = screen.getByTestId('table-last-page')

      await fireEvent.click(lastBtn)
    })

    it('Test Pagination "Prev" button', async () => {
      // check if the containter is rendered
      expect(container).toBeTruthy()

      // first item in the table
      const firstItemIndex = 0

      const firstItem = screen.getByTestId(`data-row-${firstItemIndex}`)
      const firstItemIdValue = firstItem.getAttribute('data-index')

      // check if the first item in the table is id = 11 (Last Page)
      expect(firstItemIdValue).toBe('11')

      const prevBtn = screen.getByTestId('table-prev-page')

      // prev page (when prev btn will trigger)
      await fireEvent.click(prevBtn)

      const nextItem = screen.getByTestId(`data-row-${firstItemIndex}`)
      const nextTtemIdValue = nextItem.getAttribute('data-index')

      // check if the prev page is with id = 6 (Note that table items per page is set to 5)
      expect(nextTtemIdValue).toBe('6')
    })

    it('Test Pagination "First" button', async () => {
      // check if the containter is rendered
      expect(container).toBeTruthy()

      // first item in the table
      const firstItemIndex = 0

      const firstItem = screen.getByTestId(`data-row-${firstItemIndex}`)
      const firstItemIdValue = firstItem.getAttribute('data-index')

      // check if the first item in the table is id = 11 (Last Page)
      expect(firstItemIdValue).toBe('11')

      const prevBtn = screen.getByTestId('table-first-page')

      // first page (when first btn will trigger)
      await fireEvent.click(prevBtn)

      const nextItem = screen.getByTestId(`data-row-${firstItemIndex}`)
      const nextTtemIdValue = nextItem.getAttribute('data-index')

      // check if the first page is with id = 1 (Note that table items per page is set to 5)
      expect(nextTtemIdValue).toBe('1')
    })
  })
})
