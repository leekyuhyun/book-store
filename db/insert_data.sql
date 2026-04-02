-- 1. 카테고리 테이블 데이터 추가 (books가 참조하므로 가장 먼저 실행) --
-- id 대신 category_id로 컬럼명 수정 반영
INSERT INTO category (category_id, name) 
VALUES 
  (0, '동화'),
  (1, '소설'),
  (2, '사회');

-- 2. 도서 테이블 데이터 추가 --
-- alter & update.sql에 있던 pub_date 업데이트 내용을 바로 반영했습니다.
INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("어린왕자들", "종이책", 0, "어리다..", "많이 어리다..", "김어림", 100, "목차입니다.", 20000, "2019-01-01");

INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("신데렐라들", "종이책", 1, "유리구두..", "투명한 유리구두..", "김구두", 100, "목차입니다.", 20000, "2023-12-01");

INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("백설공주들", "종이책", 2, "사과..", "빨간 사과..", "김사과", 100, "목차입니다.", 20000, "2023-11-01");

INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("흥부와 놀부들", "종이책", 3, "제비..", "까만 제비..", "김제비", 100, "목차입니다.", 20000, "2023-12-08");

INSERT INTO books (title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("콩쥐 팥쥐", 4, 0, "ebook", 4, "콩팥..", "콩심은데 콩나고..", "김콩팥", 100, "목차입니다.", 20000, "2024-06-15");

INSERT INTO books (title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("용궁에 간 토끼", 5, 1, "종이책", 5, "깡충..", "용왕님 하이..", "김거북", 100, "목차입니다.", 20000, "2025-02-10");

INSERT INTO books (title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("해님달님", 15, 2, "ebook", 6, "동앗줄..", "황금 동앗줄..!", "김해님", 100, "목차입니다.", 20000, "2025-11-20");

INSERT INTO books (title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("장화홍련전", 80, 0, "ebook", 7, "기억이 안나요..", "장화와 홍련이?..", "김장화", 100, "목차입니다.", 20000, "2026-01-19");

INSERT INTO books (title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("견우와 직녀", 8, 1, "ebook", 8, "오작교!!", "칠월 칠석!!", "김다리", 100, "목차입니다.", 20000, "2026-01-25");

INSERT INTO books (title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("효녀 심청", 12, 0, "종이책", 9, "심청아..", "공양미 삼백석..", "김심청", 100, "목차입니다.", 20000, "2026-02-05");

INSERT INTO books (title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("혹부리 영감", 22, 2, "ebook", 10, "노래 주머니..", "혹 두개 되버림..", "김영감", 100, "목차입니다.", 20000, "2026-02-15");

-- 🚨 (중요) 임시 유저 데이터 추가
-- 좋아요(likes)와 장바구니(cart) 테이블에 값을 넣으려면 회원(users) 데이터가 먼저 존재해야 에러가 나지 않습니다.
-- (프론트에서 직접 회원가입을 하실 예정이라면 이 부분은 생략하셔도 됩니다.)
INSERT INTO users (email, name, password, salt) VALUES ('test1@test.com', '테스터1', 'password123', 'salt1');
INSERT INTO users (email, name, password, salt) VALUES ('test2@test.com', '테스터2', 'password123', 'salt2');
INSERT INTO users (email, name, password, salt) VALUES ('test3@test.com', '테스터3', 'password123', 'salt3');
INSERT INTO users (email, name, password, salt) VALUES ('test4@test.com', '테스터4', 'password123', 'salt4');


-- 3. 좋아요 테이블 데이터 추가 --
INSERT INTO likes (user_id, liked_book_id) VALUES (1, 1);
INSERT INTO likes (user_id, liked_book_id) VALUES (1, 2);
INSERT INTO likes (user_id, liked_book_id) VALUES (1, 3);
INSERT INTO likes (user_id, liked_book_id) VALUES (3, 1);
INSERT INTO likes (user_id, liked_book_id) VALUES (4, 4);
INSERT INTO likes (user_id, liked_book_id) VALUES (2, 1);
INSERT INTO likes (user_id, liked_book_id) VALUES (2, 2);
INSERT INTO likes (user_id, liked_book_id) VALUES (2, 3);
INSERT INTO likes (user_id, liked_book_id) VALUES (2, 5);

-- 4. 장바구니 테이블 데이터 추가 --
INSERT INTO cart (book_id, quantity, user_id) VALUES (1, 1, 1);

-- 5. 배송 테이블 데이터 추가 --
INSERT INTO delivery (address, receiver, contact) VALUES ("경기도 시흥시", "이규현", "010-1234-5678");

-- 6. 주문 테이블 데이터 추가 --
INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) 
VALUES ("어린왕자들", 3, 60000, 1, 1);

-- 7. 주문된 도서 테이블 데이터 추가 --
INSERT INTO orderedBook (order_id, book_id, quantity) VALUES (2, 1, 1);
INSERT INTO orderedBook (order_id, book_id, quantity) VALUES (2, 3, 2);