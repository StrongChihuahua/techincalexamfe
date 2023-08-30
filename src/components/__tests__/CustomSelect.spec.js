import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/svelte'
import CustomSelect from '../CustomSelect.svelte'
import { describe, expect, it } from 'vitest'

describe('Custom Select Input Test', () => {
  it('With Input Value', async () => {
    const inputProps = {
      name: 'customSelectName',
      value: 'OPTION 2',
      label: 'Custom Select Label',
      handleOnChange: () => {},
      disabled: false,
      options: ['OPTION 1', 'OPTION 2', 'OPTION 3'],
    }

    const { container } = render(CustomSelect, {
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
      target: { value: 'OPTION 3' },
    })

    // check input value after change event
    expect(input.value).toBe('OPTION 3')
  })
})
