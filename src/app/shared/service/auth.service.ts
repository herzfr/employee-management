import { ResponseLogin } from "src/app/shared/interface";

export class GetSetAuthService {

    setLoginSucces(respLogin: ResponseLogin) {
        sessionStorage.setItem('M', respLogin.token)
    }

    get isLogin() {
        let M = sessionStorage.getItem('M') || null
        return M != null ? true : false
    }

    get inToken() {
        return sessionStorage.getItem('M')
    }

    logout() {
        sessionStorage.clear()
    }
}