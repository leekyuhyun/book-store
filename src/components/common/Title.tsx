import {styled} from "styled-components";
import type {ColorKey} from "../../style/theme.ts";

interface Props {
    children: React.ReactNode;
    size: "large" | "medium" | "small";
    color?: ColorKey
}

export default function Title({children, size}: Props) {
    return <TitleStyle size={size}>{children}</TitleStyle>
}

const TitleStyle = styled.h1<Omit<Props, "children">>`
    font-size: ${({theme, size}) => theme.heading[size].fontSize};
    color: ${({theme, color}) => color ? theme.colors[color] : theme.colors.primary};
`;