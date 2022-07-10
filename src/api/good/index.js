import request from '@/api/request'

var openId=localStorage.getItem('openId');
/**
 * @name: detailaction
 * @msg: 商品详情接口
 * @param {Object} data
 * @return {*}
 */
function detailaction(data){
    var openId=localStorage.getItem('openId');
    // console.log('openId',openId);
    var params=Object.assign({openId:'66'},data)
    return request({
        url:'/bufan/goods/detailaction',
        data:params
    })
}

/**
 * @name: addcollect
 * @msg: 添加收藏
 * @param {Object} data
 * @return {Promise}
 */
function addcollect(data){
    var openId=localStorage.getItem('openId');
    var params=Object.assign({openId:'66'},data)
    return request({
        url:'/bufan/collect/addcollect',
        method:'post',
        data:params
    })
}


/**
 * @name: cartList
 * @msg: 获取购物车列表
 * @return {Promise}
 */
function cartList(){
    return request({
        url:'/bufan/cart/cartList',
        data:{
            openId
        }
    })
}

/**
 * @name: addCart
 * @msg: 添加到购物车
 * @param {Object} data
 * @return {Promise}
 */
function addCart(data){
    var params=Object.assign({openId},data)
    return request({
        url:'/bufan/cart/addCart',
        data:params,
        method:'post'
    })
}

/**
 * @name: submitAction
 * @msg: 提交订单
 * @param {Object} data
 * @return {Promise}
 */
function submitAction(data){
    var params=Object.assign({openId},data)
    return request({
        url:'/bufan/order/submitAction',
        method:'post',
        data:params
    })
}
/**
 * @name: detailAction
 * @msg: 订单确认界面数据获取
 * @param {Object} data
 * @return {Promise}
 */
function detailAction(data){
    var params=Object.assign({openId},data)
    return request({
        url:'/bufan/order/detailAction',
        data:params
    })
}

/**
 * @name: getListAction
 * @msg: 获取收货地址列表
 * @return {Promise}
 */
function getListAction(){
    return request({
        url:'/bufan/address/getListAction',
        data:{
            openId
        }
    })
}

/**
 * @name: deleteAction
 * @msg: 删除购物车商品
 * @param {Object} data
 * @return {Promise}
 */
function deleteAction(data){
    return request({
        url:'/bufan/cart/deleteAction',
        data
    })
}

/**
 * @name: saveAction
 * @msg: 保存和跟添加收货地址
 * @param {Object} data
 * @return {Promise}
 */
function saveAction(data){
    var params=Object.assign({openId},data)
    return request({
        url:'/bufan/address/saveAction',
        data:params,
        method:'post'
    })
}

/**
 * @name: deleteAction
 * @msg: 删除收货地址
 * @param {Objec} data
 * @return {Promise}
 */
function deleteActionOfAddress(data){
    return request({
        url:'/bufan/address/deleteAction',
        data
    })
}
/**
 * @name: listAction
 * @msg: 获取收藏列表
 * @return {Promise}
 */
function listAction(){
    return request({
        url:'/bufan/collect/listAction',
        data:{
            openId
        }
    })
}
export {detailaction,addcollect,cartList,addCart,submitAction,detailAction,
    getListAction,deleteAction,saveAction,deleteActionOfAddress,listAction
}