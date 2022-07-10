import request from '../../request'


/**
 * @name: goodsList
 * @msg: 首页新品首发与人气推荐
 * @param {Object} data
 * @return {Promise}
 */
function goodsList(data){
    return request({
        url:'/bufan/goods/goodsList',
        data
    })
}
export {goodsList}