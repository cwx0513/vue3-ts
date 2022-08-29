import {App} from 'vue'
import {registerElement,registerIcon} from './register-element'


//按需导入element-plus中的组件
export function registerApp(app:App):void{
  registerElement(app)//或者也可以app.use(registerElement)
  registerIcon(app) //全局导入icon图标
}
