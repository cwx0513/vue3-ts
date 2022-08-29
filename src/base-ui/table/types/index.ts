export interface ITableItem {
  prop:string,
  label:string,
  minWidth?:string,
  slotName?:string
}


export interface ITable{
  title:string,
  propList:ITableItem[],
  showIndexColumn:boolean,
  showSelectColumn:boolean
}