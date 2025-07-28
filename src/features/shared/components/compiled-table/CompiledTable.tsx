import { useTranslation } from 'react-i18next'

import { Column, ColumnProps } from 'primereact/column'
import { DataTable, DataTableProps, DataTableValueArray } from 'primereact/datatable'
import { classNames } from 'primereact/utils'

import { EmptyMessage } from '@/features/shared/components/empty-message'

import styles from './CompiledTable.module.scss'

type CompiledTableProps<T extends DataTableValueArray> = DataTableProps<T> & {
  columns: ColumnProps[]
}

export function CompiledTable<T extends DataTableValueArray>({
  value,
  columns = [],
  emptyMessage,
  tableClassName,
  className,
  ...restProps
}: CompiledTableProps<T>) {
  const { t } = useTranslation('shared')

  return (
    <DataTable
      lazy
      value={value}
      emptyMessage={emptyMessage || <EmptyMessage />}
      tableClassName={classNames(styles['compiled-table'], tableClassName)}
      className={classNames(styles['wrapper-compiled-table'], className)}
      paginatorTemplate='RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport'
      currentPageReportTemplate={t('shared_table_current_page_report_template')}
      scrollHeight='var(--table-scroll-height)'
      paginatorClassName={styles.paginator}
      rowsPerPageOptions={[10, 20, 50, 100]}
      removableSort
      scrollable
      {...restProps}
    >
      {columns.map((col) => (
        <Column key={col.columnKey} {...col} />
      ))}
    </DataTable>
  )
}
