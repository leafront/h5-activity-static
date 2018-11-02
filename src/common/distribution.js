
import utils from '@/widget/utils'

const SHANGJIA_SHARE_CODE = 'shareCode' //上家的sharecode

const distribution = {

  /**
   * 获取当前用户的上家sharecode，目前上家的sharecode会存储在cookie里。
   * @return {String} shareCode
   */
  getInviterShareCode () {
    return utils.getCookie(SHANGJIA_SHARE_CODE || "")
  },

  /**
   * 设置上家的
   * @param {String} sharecode
   */
  setInviterShareCode (shareCode) {
    if (shareCode) {
     utils.setCookie(SHANGJIA_SHARE_CODE, shareCode)
    }
  }
}

export default distribution
