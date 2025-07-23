import { Paginator, PaginatorProps, PaginatorRowsPerPageDropdownOptions } from 'primereact/paginator'
import { classNames } from 'primereact/utils'

import { DCDropdown } from '@/components/dc-ui/dc-dropdown'
import styles from './DCPaginator.module.scss'

interface DCPaginatorProps extends PaginatorProps {}

export function DCPaginator({ className: externalClassName, ...props }: DCPaginatorProps) {
  const className = classNames(styles.paginator, externalClassName)

  const template = {
    layout: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
    RowsPerPageDropdown: (options: PaginatorRowsPerPageDropdownOptions) => {
      const dropdownOptions = [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
        { label: 'All', value: options.totalRecords }
      ]

      return (
        <DCDropdown
          value={options.value}
          options={dropdownOptions}
          onChange={options.onChange}
          className={styles['rows-per-page-dropdown']}
        />
      )
    }
  }

  return <Paginator className={className} {...props} template={template} />
}
