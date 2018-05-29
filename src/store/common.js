import * as types from './mutation-types'

const state = {
	pageView: false,
  headerMenu: false,
  shareMenu: false,
  imageValidate: false
}

const getters = {

	getPageView: state => state.pageView,
  getHeaderMenu: state => state.headerMenu,
  getShareMenu: state => state.shareMenu,
  getImageValidate: state => state.imageValidate

}

const actions = {
	updatePageView ({commit}, info) {

		commit(types.UPDATE_PAGE_VIEW,info)

	},
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
	[types.UPDATE_PAGE_VIEW] (state,info) {
		state.pageView = info

	},
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
