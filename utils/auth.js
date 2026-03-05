import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

export const Authorization = (req) => {
  let receivedJwt = req.headers["authorization"];
  let decodedJwt = jwt.verify(receivedJwt, process.env.JWT_SECRET_KEY);
  return decodedJwt;
};

export const handleAuthError = (error) => {
  if (error.name === "TokenExpiredError") {
    return {
      status: StatusCodes.UNAUTHORIZED,
      message: "토큰이 만료되었습니다. 다시 로그인해주세요.",
      code: "TOKEN_EXPIRED",
    };
  }

  if (error.name === "JsonWebTokenError") {
    return {
      status: StatusCodes.UNAUTHORIZED,
      message: "유효하지 않은 토큰입니다.",
      code: "INVALID_TOKEN",
    };
  }

  return {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "인증 처리 중 오류가 발생했습니다.",
    code: "AUTH_ERROR",
  };
};
