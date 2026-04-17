import Footer from "../components/common/Footer.tsx";
import Header from "../components/common/Header.tsx";
import {styled} from "styled-components";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({children}): LayoutProps {
    return (
        <>
            <Header/>
            <main>{children}</main>
            <Footer/>
        </>
    )
}

const layoutStyle = styled.main`
width: 100%;
margin: 0 auto;
  max-width: ${({theme}) => theme.layout.width.large};
  padding: 20px 0;

  @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
    padding: 20px 12px;
  }
`