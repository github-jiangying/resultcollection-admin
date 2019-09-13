import Cookies from 'js-cookie'
const sessionStorage = window.sessionStorage;
const localStorage = window.localStorage;

export class Auth {
  static setUserInfo(value = {}) {
    return sessionStorage.setItem('user.userInfo', JSON.stringify(value))
  }

  static getUserInfo() {
    return JSON.parse(sessionStorage.getItem('user.userInfo'))
  }

  static removeUserInfo() {
    return sessionStorage.removeItem('user.userInfo')
  }

  static setAccountPwd(value = {}) {
    return localStorage.setItem('user.accountPwd', JSON.stringify(value))
  }

  static getAccountPwd() {
    return JSON.parse(localStorage.getItem('user.accountPwd'))
  }

  static removeAccountPwd() {
    return localStorage.removeItem('user.accountPwd')
  }

  static setIsAdmin(value){
    return sessionStorage.setItem('user.isAdmin',value)
  }

  static getISAdmin(){
    return !!sessionStorage.getItem('user.isAdmin')
  }

  static removeIsAdmin(){
    return sessionStorage.removeItem('user.isAdmin')
  }

  static setLogin() {
    return sessionStorage.setItem('user.isLogin', true)
  }

  static getLogin() {
    return !!sessionStorage.getItem('user.isLogin')
  }

  static removeLogin() {
    return sessionStorage.removeItem('user.isLogin')
  }

  static setToken(value) {
    return Cookies.set('user.token', value)
  }

  static getToken() {
    return Cookies.get('user.token')
  }

  static removeToken() {
    return Cookies.remove('user.token')
  }





  static ACCOUNT_LOGOUT_FAILURE(state) {
    Auth.removeAccountPwd();
    Auth.removeUserInfo();
    Auth.removeLogin();
    Auth.removeIsAdmin();
  }
}
