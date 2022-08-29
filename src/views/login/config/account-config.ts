export const rules={
  name:[{
    required:true,
    message:'用户名必填',
    trigger:'blur'
    },
    {
      pattern:/^[a-z0-9]{4,10}$/,
      message:'用户名必须是4-10个数字或者字母',
      trigger:'blur'
    }],
  password:[{
    required:true,
    message:'密码必填',
    trigger:'blur'
    },
    {
      pattern:/^[a-z0-9]{3,}$/,
      message:'用户名必须是5-10个数字或者字母',
      trigger:'blur'
    }]
}

