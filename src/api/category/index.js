import request from '../request'
/**
 * @name: indexaction
 * @msg: 分类导航数据获取
 * @return {Promise}
 */
function indexaction(){
    return   request({
        url:'/bufan/category/indexaction'
    })
}

/**
 * @name: currentaction
 * @msg: 通过分类的id来查询分类列表数据
 * @param {Object} data
 * @return {Promise}
 */
function currentaction(data){
    return request({
        url:'/bufan/category/currentaction',
        data
    })
}

/**
 * @name: goodsList
 * @msg: 获取分类商品列表
 * @param {Object} data
 * @return {Promise}
 */
function goodsList(data){
    return request({
        url:'/bufan/goods/goodsList',
        data
    })
}

/**
 * @name: categoryNav
 * @msg: 获取导航数据
 * @param {Object} data
 * @return {Promise}
 */
function categoryNav(data){
    return request({
        url:'/bufan/category/categoryNav',
        data
    })
}
export {
    indexaction,currentaction,goodsList,categoryNav
}