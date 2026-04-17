import {styled} from "styled-components";
import type {ToastItem} from "@/store/toastStore.ts";
import {FaBan, FaInfoCircle, FaPlus} from "react-icons/fa";
import {useState} from "react";
import useToastStore from "@/store/toastStore.ts";
import useTimeout from "@/hooks/useTimeout.ts";

export const TOAST_REMOVE_DELAY = 30000

export default function Toast({id, message, type}: ToastItem) {
    const removeToast = useToastStore((state)=> state.removeToast)
    const [isFadeOut, setIsFadeOut] = useState(false)

    const handleRemoveToast = () => {
        setIsFadeOut(true)
    }

    const handleAnimationEnd = () => {
        if (isFadeOut) {
            removeToast(id)
        }
    }

    useTimeout(() => {
        setIsFadeOut(true)
    }, TOAST_REMOVE_DELAY)

    return (
        <ToastStyle className={isFadeOut ? 'fade-out' : 'fade-in'} onAnimationEnd={handleAnimationEnd}>
            <p>
                {type === "info" && <FaInfoCircle/>}
                {type === "error" && <FaBan/>}
                {message}
            </p>
            <button onClick={handleRemoveToast}><FaPlus/></button>
        </ToastStyle>
    )
}

const ToastStyle = styled.div`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }
    
    &.fade-in {
      animation: fade-in 0.3s ease-in-out forwards;
    }

    &.fade-out {
      animation: fade-out 0.3s ease-in-out forwards;
    }
  
    background: ${({theme}) => theme.colors.background};
  padding: 12px;
  border-radius: ${({theme}) => theme.borderRadius.default};;
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 24px;
    opacity: 0;
    transition: all 0.3s ease-in-out;
  
  p {
    color: ${({theme}) => theme.colors.text};
    line-height: 1;
    margin: 0;
    flex: 1;
    display: flex;
    align-items: end;
    gap: 4px;
  }
  
  button {
    background: transparent;
    border: none;
    cursor:pointer;
    padding: 0;
    margin: 0;
    
    svg {
      transform: rotate(45deg);
    }
  }
`