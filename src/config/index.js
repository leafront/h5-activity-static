const config = {
  dev: {
    hostPath: '',
    companyId: 30,
    platformId: 3,  //H5
    staticPath: ''
  },
  release: {
    hostPath: 'http://m.lyf.edu.laiyifen.com',
    companyId: 30,
    platformId: 3,  //H5
    staticPath: 'http://10.0.0.27:8080'
  },
  production: {
    hostPath:'http://m.lyf.edu.laiyifen.com',
    companyId: 30,
    platformId: 3,  //H5
    staticPath: 'http://m.static.laiyifen.com'
  }
}

const envConfig  = config[process.env.NODE_ENV]

export default envConfig
