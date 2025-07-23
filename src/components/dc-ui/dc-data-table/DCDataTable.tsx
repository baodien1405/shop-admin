import { Column, ColumnProps } from 'primereact/column'
import { DataTable, DataTableProps, DataTableValueArray } from 'primereact/datatable'

import styles from './DCDataTable.module.scss'

type DCDataTableProps<T extends DataTableValueArray> = DataTableProps<T> & {
  columns: ColumnProps[]
}

export function DCDataTable<T extends DataTableValueArray>({ value, columns = [], ...restProps }: DCDataTableProps<T>) {
  return (
    <DataTable value={value} {...restProps} tableClassName={styles['compiled-table']}>
      {columns.map((col) => (
        <Column key={col.columnKey} {...col} />
      ))}
    </DataTable>
  )
}
