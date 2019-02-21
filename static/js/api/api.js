/***********************服务器地址********************************/
//export const baseUrl = 'http://127.0.0.1:8080';

/***********************用户相关********************************/
export const login='/user/userLogin';
export const selectUserName='/user/selectUserName';
export const selectByUserPhoneAndMailbox='/user/selectByUserPhoneAndMailbox'
export const selectUserId='/user/selectUserId'
/********查询地址********/
export const selectAllAddress='/address/selectAllAddress'


/********鲜花用途********/
export const getAllFloweruse='/Floweruse/getAllFloweruse'

  /********全部鲜花**************/
  export const getFlower ='/Flower/getFlower'


/********用户全部订单**************/
export const selectAllOrder='/order/selectAllOrder'

/********购物车**************/
export const selectAllCart='/cart/selectAllCart'
//修改购物车的数据
export const updateCartAmount='/cart/updateCartAmount'
