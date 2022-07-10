import request from '../../request'

/**
 * @name: detailaction
 * @msg: 首页品牌制造商直供的详情数据
 * @param {Object} data
 * @return {Promise}
 */
function detailaction(data){
    return request({
        url:'/bufan/brand/detailaction',
        data
    })
}

/**
 * @name: listaction
 * @msg: 首页品牌制造商直供的详情内的列表数据
 * @param {Object} data
 * @return {Promise}
 */
function listaction(data){
    return request({
        url:'/bufan/brand/listaction',
        data
    })
}



export {
    detailaction,listaction
}