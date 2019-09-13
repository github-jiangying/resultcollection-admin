/**
 * user
 */

// import {LoginApi} from '../../view/login/LoginApi';
// import {login} from '../../view/login/LoginApi'
import {Msg} from '../../tools/message';
import {Auth} from './auth';
import {store} from "../index";

const defaultUser = {userName: '', passWord: '',remember: false};

export default {
  state: {
    /** token */
    token: Auth.getToken() || null,
    /** 用户登陆角色信息 */
    userInfo: Auth.getUserInfo() || {},
    /** 用户登陆账户密码 */
    accountPwd: Auth.getAccountPwd() || defaultUser,
    /** 是否登陆 */
    isLogin: Auth.getLogin() || false,
    // 是否管理员
    isAdmin: Auth.getISAdmin() || false,
  },
  /** 计算属性 */
  getters: {
    // doneTodos: state => {
    //   return state.todos.filter(value => value.done)
    // }
  },
  /** 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation */
  mutations: {
    // 登录成功提交状态
    ACCOUNT_AUTH_STATUS_CHANGED(state, data) {
      const res = data.data;
      const param = data.params;
      if(res) {
        state.token = res.token;
        state.userInfo = param.userName;
        state.isLogin = true;
        state.isAdmin = param.isAdmin;
        Auth.setUserInfo(state.userInfo);
        Auth.setLogin(state.isLogin);
        Auth.setToken(state.token);
        Auth.setIsAdmin(state.isAdmin)
        // console.log('改变状态' + state.isLogin)
      }
    },
    ACCOUNT_LOGOUT_FAILURE(state) {
      state.isLogin = false;
      Auth.removeUserInfo();
      Auth.removeLogin();
      Auth.removeToken();
      Auth.removeIsAdmin();
    },
    handleRemember(state, data){
      const userInfo = data.params;
      if (userInfo && userInfo.remember) {
        this.state.accountPwd = userInfo; //记住用户名和密码
        Auth.setAccountPwd(this.state.accountPwd);
        Auth.setIsAdmin(userInfo.isAdmin); // 设置用户类型
      }
      else{
        Auth.removeAccountPwd();
      }
    },
  },
  /** Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。 */
  actions: {
    /** 登录 */
    accountLoginSubmit({commit}, params) {
      return new Promise((resolve, reject) => {

        //判断是管理员还是学生
        if(!params.isAdmin){

        }
        // 管理员
        else {
          LoginApi.login({userName: params.userName, password: params.password}).then((res) => {
            if(res.data.status) {

              var userName = 'h';


              console.log('%c 身份被服务器接受', 'color:#fa8c16');
              commit('ACCOUNT_AUTH_STATUS_CHANGED', {...res, params});
              commit('handleRemember', {...res, params});
              var {isLogin,token} = store.getters;
              resolve(res.data)

            }
            else {
              commit('ACCOUNT_LOGOUT_FAILURE');
              // Msg.error(res.data.message);
              // reject(res.data);
              resolve(res.data)
            }
          }).catch(err => {
            console.log('%c 身份被服务器拒绝', 'color:#fa8c16');
            // Msg.error(err);
            commit('ACCOUNT_LOGOUT_FAILURE');
          })
        }



      })
    },
    /** 登出 */
    accountLogoutSubmit({commit}) {
      return new Promise((resolve, reject) => {
        // LoginApi.logout().then(res => {
          commit('ACCOUNT_LOGOUT_FAILURE');
          resolve("true");
        // }).catch(err => {
        //   reject(err)
        // })
      })
    }
  }
}
