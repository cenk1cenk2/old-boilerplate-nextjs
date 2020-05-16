import { faAddressBook } from '@fortawesome/free-solid-svg-icons'

import { NavigationItems } from '@components/template/index.interface'

export async function getNavigationItems (): Promise<NavigationItems[]> {
  return [
    {
      name: 'test', url: '/asd', icon: faAddressBook
    }
  ]
}