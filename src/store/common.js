import * as types from './mutation-types'

const state = {
	pageView: false
}

const getters = {

	getPageView: state => state.pageView

}

const actions = {
	updatePageView ({commit}, info) {

		commit(types.UPDATE_PAGE_VIEW,info)

	}
}

const mutations = {
	[types.UPDATE_PAGE_VIEW] (state,info) {

		state.pageView = info

	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
