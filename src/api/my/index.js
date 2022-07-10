import request from '../request'

var openId=localStorage.getItem('openId');
var userInfo=JSON.parse(localStorage.getItem('userInfo'));
var name=userInfo.nickName;


function submitAction(data){
    var params=Object.assign({openId,name},data)
    return request({
        url:'/bufan/feedback/submitAction',
        method:'post',
        data:params
    })
}
export {submitAction}