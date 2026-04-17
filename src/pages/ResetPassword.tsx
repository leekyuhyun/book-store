import {styled} from "styled-components";
import Title from "../components/common/Title.tsx";
import InputText from "../components/common/InputText.tsx";
import Button from "../components/common/Button.tsx";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {resetPassword, resetRequest, signup} from "../api/auth.api.ts";
import {useAlert} from "../hooks/useAlert.ts";
import {SignupStyle} from "./Signup.tsx";
import {useAuth} from "@/hooks/useAuth.ts";

export interface SignupProps {
    email: string;
    password: string;
}

export default function ResetPassword() {
    const {userResetPassword, userResetRequest, resetRequested} = useAuth()
    const {register, handleSubmit, formState: {errors}} = useForm<SignupProps>()

    const onSubmit = (data: SignupProps) => {
        resetRequested ? userResetPassword(data): userResetRequest(data)
    }

    return(
        <>
            <Title size="large">비밀번호 초기화</Title>
            <SignupStyle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <InputText
                            placeholder="이메일"
                            inputType="email"
                            {...register("email", {required: true})}
                        />
                        {errors.email && <p className="error-text">
                            이메일을 입력해주세요.
                        </p>}
                    </fieldset>
                    {resetRequested && (
                        <fieldset>
                            <InputText
                                placeholder="패스워드"
                                inputType="password"
                                {...register("password", {required: true})}
                            />
                            {errors.password && <p className="error-text">
                                비밀번호를 입력해주세요.
                            </p>}
                        </fieldset>
                    )}
                    <fieldset>
                        <Button type="submit" size="medium" scheme="primary">비밀번호 초기화</Button>
                    </fieldset>
                    <div className="info">
                        <Link to="/reset">
                            {
                                resetRequested ? "비밀번호 초기화": "초기화 요청"
                            }
                        </Link>
                    </div>
                </form>
            </SignupStyle>
        </>
    )
}