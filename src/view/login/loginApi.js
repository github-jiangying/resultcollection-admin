import {server} from "../../tools/servers";


export class loginApi{
  static clientLogin(params){
    return server.connection('GET','/login1',params)
  }

  static adminLogin(params){
    return server.connection('GET', '/login2',params)
  }
}
