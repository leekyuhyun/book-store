import { render, screen } from "@testing-library/react"
import {BookStoreThemeProvider} from "../../context/themeContext.tsx";
import Title from "./Title.tsx";
import {describe, expect, it} from "vitest";

describe("Title 컴포넌트 테스트", () => {
    it("렌더를 확인", () => {
        render(
            <BookStoreThemeProvider>
                <Title size="large">제목</Title>
            </BookStoreThemeProvider>
        )

        expect(screen.getByText("제목")).toBeInTheDocument()
    })

    it('size props 적용', () => {
        const {container} = render(
            <BookStoreThemeProvider>
                <Title size="large">제목</Title>
            </BookStoreThemeProvider>
        )

        expect(container?.firstChild).toHaveStyleRule("font-size", "2rem")
    })

    it('color props 적용', () => {
        const {container} = render(
            <BookStoreThemeProvider>
                <Title size="large">제목</Title>
            </BookStoreThemeProvider>
        )

        expect(container?.firstChild).toHaveStyleRule("color", "#ff5800")
    })

})