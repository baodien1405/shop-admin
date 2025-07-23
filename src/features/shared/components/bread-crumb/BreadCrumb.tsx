import { Link, useLocation } from 'react-router-dom'

import { classNames } from 'primereact/utils'
import { BreadCrumb as PrimeBreadCrumb } from 'primereact/breadcrumb'

import { useBreadcrumb } from '@/features/shared/hooks'

export function BreadCrumb() {
  const location = useLocation()
  const breadcrumbMap = useBreadcrumb()
  const breadCrumbModel = location.pathname
    .split('/')
    .filter((path) => path !== '')
    .map((path, index, arr) => {
      const href = `/${arr.slice(0, index + 1).join('/')}`
      const label = breadcrumbMap[href] || path.charAt(0).toUpperCase() + path.slice(1)

      return {
        template: () => (
          <Link
            to={href}
            className={classNames('text-neutral-600', {
              'font-extrabold text-primary-500': index === breadCrumbModel.length - 1
            })}
          >
            {label}
          </Link>
        )
      }
    })

  return (
    <PrimeBreadCrumb
      model={breadCrumbModel}
      home={{ icon: <i className='pi pi-home text-gray-950' /> }}
      className='py-2 text-sm border-neutral-100 [&_.p-breadcrumb-list]:gap-2'
      separatorIcon={<i className='pi pi-chevron-right text-gray-950 text-sm' />}
    />
  )
}
