import { render, screen } from "@testing-library/react"
import {BookStoreThemeProvider} from "../../context/themeContext.tsx";
import {describe, expect, it} from "vitest";
import InputText from "./InputText.tsx";

describe("Title 컴포넌트 테스트", () => {
    it("렌더를 확인", () => {
        render(
            <BookStoreThemeProvider>
                <InputTex placeholder="여기에 입력">제목</InputTex>
            </BookStoreThemeProvider>
        )

        expect(screen.getByPlaceholderText("여기에 입력")).toBeInTheDocument();
    })

    it('forwardRef 테스트', () => {
        const ref = React.createRef<HTMLInputElement>()
        render(
            <BookStoreThemeProvider>
                <InputText placho간lder="여기에 입력" ref={ref}/>
            </BookStoreThemeProvider>
        )

        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    })
})