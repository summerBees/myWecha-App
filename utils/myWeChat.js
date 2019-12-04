import request from './request.js'

class myWeChat {

  constructor() {
    this._baseUrl = 'http://127.0.0.1:8888/demo'
    this._demoLogin = "/user/login"
    this._demoUserInfo = "/user/UserInfo"
    this._userInfo = "/user/wxUserInfo"

    this._defaultHeader = {
      'data-tupe': 'application/json'
    }
    this._request = new request
    this._request.setErrorHandler(this.errorHander)
  }

  getdemoUserInfo(id){
    console.info("获取用户信息");
    let url = this._baseUrl + this._demoUserInfo;
    let data = {
      'id': id
    }  
    return this._request.postRequest(url, data).then(res => res.data)  
  }

  demoLogin(code){
    console.info("用户登陆");
    let url = this._baseUrl + this._demoLogin;
    let data = {
      'code': code
    }
    return this._request.postRequest(url, data).then(res => res.data)  
  }
  
  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
  }

}
export default myWeChat