# 📚 Book-Store Project

데브코스 북 스토어 프로젝트입니다. 이 프로젝트는 Node.js와 Express를 사용하여 구축된 온라인 서점의 백엔드 API 서버입니다.

## 🛠 기술 스택

- Runtime: Node.js (v18+)

- Framework: Express

- Database: MySQL (mysql2)

- Authentication: JSON Web Token (JWT)

- Validation: Express-Validator

- Environment Management: dotenv

## 📂 프로젝트 구조

`app.js`: 서버 진입점 및 미들웨어 설정

`routes/`: API 엔드포인트 정의 (`users`, `books`, `category`, `likes`, `carts`, `orders`)

`controller/`: 비즈니스 로직 처리

`db/`: 데이터베이스 연결 및 SQL 스키마

`middleware/`: 유효성 검사 등 공통 미들웨어

## 🚀 시작하기

### 1. 환경 변수 설정

프로젝트 루트 폴더에 `.env` 파일을 생성하고 아래 내용을 복사하여 정보를 입력합니다

```bash
PORT = your_port_number
DB_HOST = localhost
DB_USER = root
DB_PASS = your_password
DB_NAME = your_database_name
JWT_SECRET_KEY = your_secret_key
```

### 2. 패키지 설치 및 실행

```bash
npm install
npm run dev
```

## 📋 API 주요 기능

### 사용자 (Users)

- `POST /users/join`: 회원가입 (비밀번호 암호화 포함)

- `POST /users/login`: 로그인 및 JWT 토큰 발행 (Cookie 저장)

- `POST /users/reset`: 비밀번호 초기화 요청

- `PUT /users/reset`: 비밀번호 변경

### 도서 (Books)

- `GET /books`: 도서 전체 조회 (카테고리별, 신간 필터링 및 페이지네이션 지원)

- `GET /books/:id`: 도서 개별 상세 조회

### 카테고리 (Category)

- `GET /category`: 전체 카테고리 목록 조회

### 구현 예정 포함

- 좋아요 (Likes): 추가 및 삭제

- 장바구니 (Carts): 담기, 조회, 삭제

- 주문 (Orders): 주문하기, 목록 및 상세 조회

## 🗄 데이터베이스 설계 (ERD 요약)

- `users`: 이메일(Unique), 이름, 암호화된 비밀번호, salt 저장

- `books`: 제목, 카테고리 ID, 가격, 출판일 등 도서 정보

- `category`: 도서 분류 정보 (동화, 소설, 사회 등)
