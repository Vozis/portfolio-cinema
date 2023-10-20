export interface ITableItem {
  id: number;
  editUrl: string;
  items: string[];
}

export interface IAdminTableItem {
  tableItem: ITableItem;
  removeHandler: () => void;
}
