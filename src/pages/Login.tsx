import Title from "../components/common/Title.tsx";
import InputText from "../components/common/InputText.tsx";
import Button from "../components/common/Button.tsx";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {SignupStyle} from "./Signup.tsx";
import {useAuthStore} from "../store/authStore.ts";
import {useAuth} from "@/hooks/useAuth.ts";

export interface LoginProps {
    email: string;
    password: string;
}

export default function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginProps>()
    const {userLogin} = useAuth()

    const {isLoggedIn, storeLogin, storeLogout} = useAuthStore()

    const onSubmit = (data: LoginProps) => {
        userLogin(data)
    }

    return(
        <>
            <Title size="large">로그인</Title>
            <SignupStyle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <InputText
                            placeholder="이메일"
                            inputType="email"
                            {...register("email", {required: true})}
                            inputMode="email"
                        />
                        {errors.email && <p className="error-text">
                            이메일을 입력해주세요.
                        </p>}
                    </fieldset>
                    <fieldset>
                        <InputText
                            placeholder="패스워드"
                            inputType="password"
                            {...register("password", {required: true})}
                            inputMode="text"
                        />
                        {errors.password && <p className="error-text">
                            비밀번호를 입력해주세요.
                        </p>}
                    </fieldset>
                    <fieldset>
                        <Button type="submit" size="medium" scheme="primary">로그인</Button>
                    </fieldset>
                    <div className="info">
                        <Link to="/reset">비밀번호 초기화</Link>
                    </div>
                </form>
            </SignupStyle>
        </>
    )
}

