import {useAuthStore} from "@/store/authStore.ts";
import type {LoginProps} from "@/pages/Login.tsx";
import {login, resetPassword, resetRequest, signup} from "@/api/auth.api.ts";
import {useAlert} from "@/hooks/useAlert.ts";
import {useNavigate} from "react-router-dom";
import type {SignupProps} from "@/pages/Signup.tsx";
import {useState} from "react";

export const useAuth = () => {
    const {storeLogin, storeLogout, isLoggedIn} = useAuthStore()
    const {showAlert} = useAlert()
    const navigate = useNavigate()

    const userLogin = (data: LoginProps) => {
        login(data).then((res) => {

                storeLogin(res.token);

                showAlert("로그인이 완료되었습니다.")
                navigate("/")
            }, (error) => {
                showAlert("로그인이 실패했습니다.")
            }
        )
    }

    const userSignup = (data: SignupProps) => {
        signup(data).then((res) => {
            showAlert("회원가입이 완료되었습니다.")
            navigate("/login")
        })
    }

    const userResetPassword = (data: SignupProps) => {
        resetPassword(data).then(() => {
            showAlert("비밀번호가 초기화되었습니다.")
            navigate("/login")
        })
    }

    const [resetRequested, setResetRequested] = useState(false)

    const userResetRequest = (data: SignupProps) => {
        resetRequest(data).then(() => {
            setResetRequested(true)
        })
    }

    return {userLogin, userSignup, userResetPassword, userResetRequest, resetRequested}
}