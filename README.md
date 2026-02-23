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

- `GET /books`: 도서 전체 조회
  - 서브쿼리를 사용하여 각 도서의 좋아요(likes) 개수 포함
  - 카테고리별 조회 및 신간(최근 1개월) 필터링 지원
  - 파라미터(`limit`, `currentPage`) 유무에 따라 선택적 페이지네이션 적용

- `GET /books/:id`: 도서 개별 상세 조회 (카테고리명 및 좋아요 수 포함)

### 카테고리 (Category)

- `GET /category`: 전체 카테고리 목록 조회

### 좋아요 (likes)

- `POST /likes/:liked_book_id`: 특정 도서에 좋아요 추가

- `DELETE /likes/:liked_book_id`: 좋아요 취소

### 장바구니 (Carts)

- `POST /carts`: 장바구니 담기 (도서 아이디, 수량, 사용자 아이디를 받아 장바구니에 저장)

- `GET /carts`: 장바구니 목록 조회 (특정 사용자의 전체 목록을 조회하며, 선택된 ID(`selected`)가 있을 경우 해당 상품들만 필터링하여 데이터를 반환)

- `DELETE /carts/:cart_id`: 장바구니 아이템 삭제 (장바구니 고유 ID(`cart_id`)를 통해 특정 항목을 삭제)

### 구현 예정

- 주문 (Orders): 주문하기, 목록 및 상세 조회

## 🗄 데이터베이스 설계 (ERD 요약)

- `users`: 이메일(Unique), 이름, 암호화된 비밀번호, salt 저장

- `books`: 제목, 카테고리 ID, 가격, 출판일 등 도서 정보

- `category`: 도서 분류 정보 (동화, 소설, 사회 등)

- `likes`: 사용자(`user_id`)와 도서(`liked_book_id`) 간의 좋아요 관계 저장

- `cart`: 사용자(`user_id`)와 도서(`book_id`) 간의 장바구니 정보 및 수량(`quantity`) 저장
