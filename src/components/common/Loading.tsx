import {styled} from "styled-components";
import {FaSpinner} from "react-icons/fa";

export default function Loading() {
    return (
        <LoadingStyle>
            <FaSpinner/>
        </LoadingStyle>
    )
}

const LoadingStyle = styled.div`
  padding: 40px 0;
  text-align: center;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
    0% {
      transform: rotate(0deg);
    }
  }
  
  svg {
    width: 70px;
    height: 70px;
    fill: #ccc;
    animation: rotate 2s linear infinite;
  }
`