/***********************服务器地址********************************/
//export const baseUrl = 'http://127.0.0.1:8080';

/***********************用户相关********************************/
export const appLogin='/user/appLogin';
export const selectUserName='/user/selectUserName';
export const selectByUserPhoneAndMailbox='/user/selectByUserPhoneAndMailbox'
export const selectUserId='/user/selectUserId'
/********查询地址********/
export const selectAllAddress='/address/selectAllAddress'
export const selectUserIdByStateId='/address/selectUserIdByStateId'
//修改默认地址
export const updateAddressStateId='/address/updateAddressStateId'
//根据地址id查询
export const selectAddressId='/address/selectAddressId'
//修改地址
export const updateAddress='/address/updateAddress'
//添加地址
export const insertAddress='/address/insertAddress'
//删除地址
export const deleteAddress='/address/deleteAddress'



/********鲜花用途********/
export const getAllFloweruse='/Floweruse/getAllFloweruse'

  /********全部鲜花**************/
  export const getFlower ='/Flower/getFlower'


/********用户全部订单**************/
export const selectAllOrder='/order/selectAllOrder'
//添加订单
export const insertOrderByOrderId='/order/insertOrderByOrderId'
//修改订单状态
export const UpdateOrderState='/order/UpdateOrderState'


/********订单商品**************/
//添加订单商品
export const insertOrderflower='/orderflowerService/insertOrderflower'
export const insertOrderflowerOne='/orderflowerService/insertOrderflowerOne'


/********购物车**************/
export const selectAllCart='/cart/selectAllCart'
//修改购物车的数据
export const updateCartAmount='/cart/updateCartAmount'
//添加购物车
export const insertCart='/cart/insertCart'
//删除购物车
export const deleteCart='/cart/deleteCart'
//多删除购物车
export const deleteAllCart='/cart/deleteAll'


//显示收藏
export const selectCollectOne='/collect/selectCollectOne'
//添加收藏
export const insertCollect='/collect/insertCollect'
//删除收藏
export const deleteCollect='/collect/deleteCollect'
//查询收藏Id
export const selectCollectId='/collect/selectCollectId'
//查询用户的所有收藏
export const selectAllCollect='/collect/selectAllCollect'

//查询聊天
export const selectAllMessageContentByUserId='/MessageContent/selectAllMessageContentByUserId'
//添加
export const insertMessagecontent='/MessageContent/insertMessagecontent'

//添加Message
export const insertMessageApp='/Message/insertMessageApp'
//判断有没有记录
export const selectMessage='/Message/selectMessage'

//请求图片
export const url='http://www.wulingshan.club/img'
