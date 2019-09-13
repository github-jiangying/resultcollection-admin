export const getters = {
  userInfo: state => state.user.userInfo,
  isLogin: state => state.user.isLogin,
  token: state => state.user.token,
  accountPwd: state => state.user.accountPwd,
  isAdmin: state => state.user.isAdmin
};
