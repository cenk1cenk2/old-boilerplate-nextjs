import { faBackspace, faBackward, faForward } from '@fortawesome/free-solid-svg-icons'

import { NavigationItems } from '@components/template/index.interface'

export async function getNavigationItems (): Promise<NavigationItems[]> {
  return [
    {
      name: 'frontend', url: '/frontend', icon: faForward
    },
    {
      name: 'backend', url: '/backend', icon: faBackward
    },
    {
      name: 'empty', url: '/empty', icon: faBackspace
    }
  ]
}