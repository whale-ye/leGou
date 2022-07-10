import request from '../request'

 /**
  * @name: listaction
  * @msg: 专题获取数据接口
  * @param {Object} data
  * @return {Promise}
  */

 function listaction(data) {
    return  request({
        url: '/bufan/topic/listaction',
        data
    });
}

/**
 * @name: detailaction
 * @msg: 详情加下方四个专题推荐
 * @return {Promise}
 */
function detailaction(data){
    return request({
        url:'/bufan/topic/detailaction',
        data
    })
}

export {
    listaction,detailaction
}