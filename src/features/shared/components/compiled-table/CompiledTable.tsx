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
  return (
    <DataTable
      lazy
      value={value}
      emptyMessage={emptyMessage || <EmptyMessage />}
      tableClassName={classNames(styles['compiled-table'], tableClassName)}
      className={classNames(styles['wrapper-compiled-table'], className)}
      {...restProps}
    >
      {columns.map((col) => (
        <Column key={col.columnKey} {...col} />
      ))}
    </DataTable>
  )
}
