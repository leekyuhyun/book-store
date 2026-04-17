import {styled} from "styled-components"
import logo from '../../assets/hero.png'
import {FaAngleRight, FaBars, FaRegUser, FaSignInAlt, FaUserCircle} from "react-icons/fa";
import {Link} from "react-router-dom";
import {useCategory} from "../../hooks/useCategory.ts";
import {useAuthStore} from "../../store/authStore.ts";
import Dropdown from "@/components/common/Dropdown.tsx";
import ThemeSwitcher from "@/components/header/ThemeSwitcher.tsx";
import {useState} from "react";


export default function Header() {
    const {category} = useCategory();
    const {isLoggedIn, storeLogin, storeLogout} = useAuthStore()
    const {isMobileOpen, setIsMobileOpen} = useState(false)

    return (
        <HeaderStyle $isOpen={isMobileOpen}>
            <h1 className="logo">
                <Link to="/"><img src={logo} alt="vite"/></Link>
            </h1>
            <nav className="category">
                <button className="menu-button" onClick={() => {setIsMobileOpen(!isMobileOpen)}}>
                    {isMobileOpen ? <FaAngleRight/> : <FaBars/>}
                </button>
                <ul>
                    {category.map((item, index) => (
                        <li key={index}>
                            <a href={item.category_id === null ? '/books' : `/books?category_id=${item.category_id}`}>
                                {item.category_name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <nav className="auth">
                <Dropdown toggleButton={<FaUserCircle/>}>
                    <>
                        {
                            isLoggedIn && (
                                <ul>
                                    <li><Link to="/carts">장바구니</Link></li>
                                    <li><Link to="/orderlist">주문 내역</Link></li>
                                    <li><button onClick={storeLogout}>로그아웃</button></li>
                                </ul>
                            )
                        }
                        {
                            !isLoggedIn && (
                                <ul>
                                    <li>
                                        <a href="/login">
                                            <FaSignInAlt/>
                                            로그인</a>
                                    </li>
                                    <li>
                                        <a href="/login">
                                            <FaRegUser/>
                                            회원가입</a>
                                    </li>
                                </ul>
                            )
                        }
                        <ThemeSwitcher/>
                        </>
                </Dropdown>
            </nav>
        </HeaderStyle>
    )
}

interface HeaderStyleProps {
    $isOpen: boolean
}

const HeaderStyle = styled.header<HeaderStyleProps>`
    width: 100%;
  margin: 0 auto;
  max-width: ${({theme}) => theme.layout.width.large};
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid ${({theme}) => theme.colors.background};
  
  .logo {
    img {
      width: 200px;
    }
  }
  
  .category {
    .menu-button {
      display: none;
    }
    
    ul {
      display: flex;
      gap: 32px;
      
      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({theme}) => theme.colors.primary};
        }
      }
    }
  }
  
  .auth {
    ul {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100px;
      
      li {
        a, button {
          justify-content: center;
          width: 100px;
          font-size: 1rem;
          font-weight: 500;
          text-decoration: none;
          color: ${({theme}) => theme.colors.text};
          background: none;
          border: 0;
          cursor: pointer;
          
          &:hover {
            color: ${({theme}) => theme.colors.primary};
          }
        }
      }
    }
  }

  @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
    height: 52px;

    .logo {
      padding: 0 0 0 12px;

      img {
        width: 140px;
      }
    }

    .auth {
      position: absolute;
      top: 12px;
      right: 12px;
    }

    .category {
      .menu-button {
        display: flex;
        position: absolute;
        top: 12px;
        right: ${({$isOpen}) => $isOpen ? "62%" : "52px"};
        background: #fff;
        border: 0;
        font-size: 1.5rem;
      }
      
      ul {
        position: fixed;
        top: 0;
        right: ${({$isOpen}) => $isOpen ? "0" : "-100%"};
        width: 60%;
        height: 100vh;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        margin: 0;
        padding: 24px;
        z-index: 1000;
        flex-direction: column;
        gap: 16px;
        transition: right 0.3s ease-in-out;
      }
    }
  }
`