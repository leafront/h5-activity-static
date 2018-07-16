import * as types from './mutation-types'

const state = {
  headerMenu: false,
  shareMenu: false,
  imageValidate: false
}

const getters = {

  getHeaderMenu: state => state.headerMenu,
  getShareMenu: state => state.shareMenu,
  getImageValidate: state => state.imageValidate
}

const actions = {
  updateHeaderMenu ({commit},info) {
	  commit(types.UPDATE_HEADER_MENU,info)
  },
  updateShareMenu ({commit},info) {
	  commit(types.UPDATE_SHARE_MENU,info)
  },
  updateImageValidate ({commit}, info) {
	  commit(types.UPDATE_IMAGE_VALIDATE,info)
  }
}

const mutations = {

  [types.UPDATE_HEADER_MENU] (state,info) {
    state.headerMenu = info
  },
  [types.UPDATE_SHARE_MENU] (state,info) {

	  state.shareMenu = info
  },
  [types.UPDATE_IMAGE_VALIDATE] (state,info) {

	  state.imageValidate = info
  }
}

export default {
	state,
	getters,
	actions,
	mutations
}
