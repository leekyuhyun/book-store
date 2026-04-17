import {styled} from "styled-components";
import type {ButtonScheme, ButtonSize} from "../../style/theme.ts";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode;
    size: ButtonSize;
    scheme: ButtonScheme;
    disabled?: boolean;
    isLoading?: boolean;
}

interface ButtonStyleProps {
    $size: ButtonSize;
    $scheme: ButtonScheme;
    $isLoading?: boolean;
}

export default function Button ({children, size, scheme, disabled, isLoading, ...rest}: Props) {
    return (
        <ButtonStyle $size={size} $scheme={scheme} disabled={disabled} $isLoading={isLoading} {...rest}>
            {children}
        </ButtonStyle>
    )
}

const ButtonStyle = styled.button<ButtonStyleProps>`
  font-size: ${({theme, $size}) => theme.button[$size].fontSize};
  padding: ${({theme, $size}) => theme.button[$size].padding};
  color: ${({theme, $scheme}) => theme.buttonScheme[$scheme].color};
  background-color: ${({theme, $scheme}) => theme.buttonScheme[$scheme].backgroundColor};
  border: 0;
  border-radius: ${({theme}) => theme.borderRadius.default};
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
  pointer-events: ${({disabled}) => (disabled ? "none" : "auto")};
  cursor: ${({disabled}) => (disabled ? "none" : "pointer")};
`
