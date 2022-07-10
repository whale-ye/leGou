import request from '../request'

/**
 * @name: index
 * @msg: home主页中全部数据请求接口
 * @return {Promise}
 */

function index(){
    return request({
        url:'/bufan/index/index'
    });
}


export {
    index
} 