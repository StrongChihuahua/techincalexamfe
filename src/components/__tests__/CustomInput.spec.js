import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/svelte'
import CustomInput from '../CustomInput.svelte'
import { describe, expect, it } from 'vitest'

describe('Custom Input Test', () => {
  it('With Input Value', async () => {
    const inputProps = {
      name: 'customInputName',
      value: 'Custom Input Value',
      label: 'Custom Input Label',
      handleOnChange: () => {},
      disabled: false,
    }

    const { container } = render(CustomInput, {
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

    await fireEvent.change(input, {
      target: { value: 'New Custom Input Value' },
    })

    // check input value after change event
    expect(input.value).toBe('New Custom Input Value')
  })
})
