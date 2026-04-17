import React from "react";
import {styled} from "styled-components";

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
    placeholder?: string;
    inputType?: "email" | "text" | "password" | "number";
}

export default React.forwardRef<HTMLInputElement, Props>(
    ({ placeholder, inputType, ...props}, ref) => {
        return <InputTextStyle placeholder={placeholder} ref={ref} type={inputType} {...props}/>;
    }
);

const InputTextStyle = styled.input`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({theme}) => theme.colors.border};
  border-radius: ${({theme}) => theme.borderRadius.default};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({theme}) => theme.colors.text};
`
