type TableColumnAlignment = 'left' | 'center' | 'right';

interface TableColumn {
  headerTitle: string;
  textAlign: TableColumnAlignment;
  width?: string;
}

interface TableData {
  [key: string]: any;
}

export { TableColumn, TableData };
