import ajax from './ajax'

import app from '@/widget/app'

import utils from './utils'

export default function request (url,options){

  const ut = app.getUserToken()

 const data = Object.assign({ut},options.data)

  let defaultOpt = {
    isHeader:true,
    type: options.type,
    data,
    async: true,
    url:url,
    timeout: 6000,
    dataType: options.dataType || 'json',
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest"
    }
  }

  if (defaultOpt.type == 'GET') {

    defaultOpt.data.cashe = new Date().getTime()
  }

  if (options.headers) {
    defaultOpt.headers["Content-type"] = options.headers["Content-type"]
    defaultOpt.data = JSON.stringify(options.data)
  } else {

    defaultOpt.data = utils.queryStringify(defaultOpt.data)
  }

  if (app.loggedIn()) {

    defaultOpt.headers.ut = app.getUserToken()

  }

  if (defaultOpt.type == "GET") {

    defaultOpt.url =  defaultOpt.data ?  defaultOpt.url + '?' + defaultOpt.data: defaultOpt.url;

  }

  return new Promise((resolve, reject) => {

    ajax(defaultOpt).then((results) => {
      if (results.code == "99") {
        if (process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'release') {
          if (utils.isApp()) {
            app.login()
          } else {
            const from = utils.getRelatedUrl()
            window.location.href = `/login.html?from=` + encodeURIComponent(from);
          }
        }
      }
      resolve(results)
    })

  })

}
