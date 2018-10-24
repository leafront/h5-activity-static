
import request from '@/widget/request'

import config from '@/config/index'

import utils from '@/widget/utils'

const getTracker = (data) => request('/tracker/post', data)

const getParseUrl = (url) => {
  if (!url) {
    return
  }
  const REG_PARSE_URL = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
  let _obj = {}
  let _name = ['url','scheme','slash','host','port','path','query','hash']
  let _url = REG_PARSE_URL.exec(url)
  for (let i = 0; i< _name.length; i++) {
    _obj[_name[i]] = _url[i]
  }
  return _obj
}

export const sendTracker = ({
	pid = '',
  ppid = ''  // 前序页面id  需要放在data中 先注释
 } = {
 	pid: '',
 	ppid: ''
 }) => {
	const referrer = document.referrer
	const pageName = {
	 'index.html': {
		name: 'home'
	 }
  }
	const parmas = {
	  ev: '17',
	  did: '',
	  tv: '1.0',
	  v: '', //version 客户端版本号
	  ut: utils.getUserToken(),
	  uid: utils.generateUUID(),
	  pid, // 页面ID
	  inf: '', // inFrom 内部来源 上一个页面的page id
	  cha: 'H5', // channel 所属渠道编码：IOS／ANDROID／H5/APPLET（小程序）／WEBSITE（官网）
	  ct:  + new Date, // curTime 当前时间戳毫秒
	  bt: 'pv', //businessType 业务类型：init/pv/event
	  data: {
	  	ru: referrer,
	  	cpu: location.href
	  } 
	}
	if (ppid) {
		parmas.data.ppid = ppid
	}

	if (referrer) {
		const referrerPath = getParseUrl(referrer)
		if (pageName[referrerPath.path]) {
			parmas.inf = pageName[referrerPath.path].name
		}
	}
	parmas.data = JSON.stringify(parmas.data)
	getTracker({
		type: 'POST',
		data: parmas,
		hostPath: config.trackerPath
	})
}