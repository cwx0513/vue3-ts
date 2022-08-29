//1.方式一：手动切换不同环境
// const BASE_URL='http://cwx.org/dev'
// const BASE_NAME='dev'

// const BASE_URL='http://cwx.org/prod'
// const BASE_NAME='prod'

// const BASE_URL='http://cwx.org/test'
// const BASE_NAME='test'




//2.方式二:根据process.env.NODE_ENV的值
//开发环境:development
//生产环境:production
//测试环境:test

let BASE_URL=""
const TIME_OUT=10000

if(process.env.NODE_ENV==='development'){
  BASE_URL='/api'
}else if(process.env.NODE_ENV==='production'){
  BASE_URL='http://cwx.org/prod'
}else{
  BASE_URL='http://cwx.org/test'
}

export {BASE_URL,TIME_OUT}





//3.方式三：通过创建.env.development/.env.production/.env.test三个文件

