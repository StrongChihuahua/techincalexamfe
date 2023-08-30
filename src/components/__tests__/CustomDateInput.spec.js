import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/svelte'
import CustomDateInput from '../CustomDateInput.svelte'
import { describe, expect, it } from 'vitest'

describe('Custom Date Input Test', () => {
  it('With Input Value', async () => {
    const inputProps = {
      name: 'testLabel',
      value: '2020-12-12',
      label: 'Test Label',
      handleOnChange: () => {},
      disabled: false,
    }

    const { container } = render(CustomDateInput, {
      props: {
        ...inputProps,
      },
    })

    expect(container)

    const input = screen.getByTestId(inputProps.name)
    const inputLabel = screen.getByTestId('input-label')

    // check initial value
    expect(input.value).toBe(inputProps.value)
    expect(input.disabled).toBe(inputProps.disabled)
    // check label
    expect(inputLabel.textContent).toBe(inputProps.label)

    await fireEvent.change(input, { target: { value: '2019-09-09' } })

    // check input value after change event
    expect(input.value).toBe('2019-09-09')
  })
})
