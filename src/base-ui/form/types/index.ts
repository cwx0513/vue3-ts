type IFormType='input'|'password'|'select'|'datepicker'

export interface IFormItem{
  field:string,
  type:IFormType,
  label:string,
  rules?:any[],
  placeholder?:any,
  //针对select
  options?:any[],
  //针对其他
  otherOptions?:any,
  isHidden?:boolean
}


export interface IForm{
  title:string,
  formItems:IFormItem[],
  labelWidth?:string,
  colLayout?:any,
  itemStyle?:any
}