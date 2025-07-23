import { Column, ColumnProps } from 'primereact/column'
import { DataTable, DataTableProps, DataTableValueArray } from 'primereact/datatable'

import { EmptyMessage } from '@/features/shared/components/empty-message'

import styles from './CompiledTable.module.scss'

type CompiledTableProps<T extends DataTableValueArray> = DataTableProps<T> & {
  columns: ColumnProps[]
}

export function CompiledTable<T extends DataTableValueArray>({
  value,
  columns = [],
  emptyMessage,
  ...restProps
}: CompiledTableProps<T>) {
  return (
    <DataTable
      value={value}
      emptyMessage={emptyMessage || <EmptyMessage />}
      tableClassName={styles['compiled-table']}
      {...restProps}
    >
      {columns.map((col) => (
        <Column key={col.columnKey} {...col} />
      ))}
    </DataTable>
  )
}
