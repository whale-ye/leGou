import request from '../../request'

/**
 * @name: indexaction
 * @msg:关键词和搜索历史获取数据接口 
 * @param {Object} data
 * @return {Promise}
 */
function indexaction(data){
    return request({
        url:'/bufan/search/indexaction',
        data
    });
}

/**
 * @name: clearhistoryAction
 * @msg: 清空搜索历史记录
 * @param {Object} data
 * @return {Promise}
 */
function clearhistoryAction(data){
    return request({
        url:'/bufan/search/clearhistoryAction',
        method:'post',
        data
    });
}

/**
 * @name: helperaction
 * @msg: 搜索提示接口
 * @param {Object} data
 * @return {Promise}
 */
function helperaction(data){
    return request({
        url:'/bufan/search/helperaction',
        data
    })
}

function addhistoryaction(data){
    return request({
        url:'/bufan/search/addhistoryaction',
        data,
        method:'post'
    })
}
export {indexaction,clearhistoryAction,helperaction,addhistoryaction}