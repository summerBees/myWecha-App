class request {

  constructor() {

    this._header = {

    }
  }

  /**
   * 设置统一的异常处理
   */
  setErrorHandler(handler) {
    this._errorHandler = handler;
  }

  /**
   * GET类型的网络请求
   */
  getRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'GET')
  }

  /**
   * DELETE类型的网络请求
   */
  deleteRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'DELETE')
  }

  /**
   * PUT类型的网络请求
   */
  putRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'PUT')
  }

  /**
   * POST类型的网络请求
   */
  postRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'POST')
  }

  /**
   * 网络请求（无header）
   */
  requestNoHeader(url, data, method) {
    var sessionId = wx.getStorageSync("sessionId")
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        method: method,
        success: (res => {
          if (res.statusCode === 200) {
            //200: 服务端业务处理正常结束
            if (res.data.header.statusCode === 0) {
              resolve(res)
            }
          } else {
            //其它错误，提示用户错误信息
            if (this._errorHandler != null) {
              //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
              this._errorHandler(res)
            }
            reject(res)
          }
        }),
        fail: (res => {
          if (this._errorHandler != null) {
            this._errorHandler(res)
          }
          reject(res)
        })
      })
    })
  }

  /**
   * 网络请求
   */
  requestAll(url, data, header, method) {
    var sessionId = wx.getStorageSync("sessionId")
    this._header = {
      "Cookie": "JSESSIONID=" + sessionId
    }
    header = this._header
    //console.warn("sessionID" + JSON.stringify(header))
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        header: header,
        method: method,
        success: (res => {
          console.log(res)
          if (res.statusCode === 200) {
            //200: 服务端业务处理正常结束
            if (res.data.header.statusCode === 301) {
              //此时需要重新获取session
              console.error("sessionId过期")
              //getApp().login()
            } else {
              resolve(res)
            }


          } else {
            //其它错误，提示用户错误信息
            if (this._errorHandler != null) {
              //如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
              this._errorHandler(res)
            }
            reject(res)
          }
        }),
        fail: (res => {
          if (this._errorHandler != null) {
            this._errorHandler(res)
          }
          reject(res)
        })
      })
    })
  }
}

export default request