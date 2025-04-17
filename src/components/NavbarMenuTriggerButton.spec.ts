import { screen, render, fireEvent } from '@testing-library/vue'
import { userEvent } from '@testing-library/user-event'
import NavbarMenuTriggerButton from './NavbarMenuTriggerButton.vue'

describe('NavbarMenuTriggerButton', () => {
  const $user = userEvent.setup()
  const getButton = () => screen.getByRole('button')
  const getMenuIcon = () => screen.queryByTestId('menu-icon')
  const getCloseIcon = () => screen.queryByTestId('close-icon')

  it('renders the menu icon by default', async () => {
    render(NavbarMenuTriggerButton)

    expect(getMenuIcon()).toBeVisible()
    expect(getCloseIcon()).not.toBeVisible()
  })

  it('toggles the icon when clicked', async () => {
    render(NavbarMenuTriggerButton, {
      props: { show: false },
    })

    const button = getButton()

    expect(getMenuIcon()).toBeVisible()
    expect(getCloseIcon()).not.toBeVisible()

    await fireEvent.click(button)
    expect(getMenuIcon()).not.toBeVisible()
    expect(getCloseIcon()).toBeVisible()

    await $user.click(button)
    expect(getMenuIcon()).toBeVisible()
    expect(getCloseIcon()).not.toBeVisible()
  })
})
