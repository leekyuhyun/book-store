-- 1. 유저 테이블 생성 --
CREATE TABLE users (
  user_id INT NOT NULL AUTO_INCREMENT, -- id -> user_id로 변경
  email VARCHAR(100) NOT NULL,
  name VARCHAR(45) NOT NULL,
  password VARCHAR(255) NOT NULL, -- 길이 확장 (암호화된 해시값이 길기 때문)
  salt VARCHAR(100) NOT NULL,     -- 추가됨 (백엔드 암호화 로직 필수 컬럼)
  PRIMARY KEY (user_id),
  UNIQUE INDEX email_UNIQUE (email ASC)
);

-- 2. 카테고리 테이블 생성 (books 테이블이 참조해야 하므로 먼저 생성) --
CREATE TABLE category (
  category_id INT NOT NULL, -- id -> category_id로 변경
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY(category_id)
);

-- 3. 도서 테이블 생성 --
CREATE TABLE books (
  book_id INT NOT NULL AUTO_INCREMENT, -- id -> book_id로 변경
  title VARCHAR(45) NOT NULL,
  img INT NULL,                        -- 추가됨
  category_id INT NULL,                -- 추가됨
  form VARCHAR(45) NOT NULL,           -- format -> form 변경
  isbn VARCHAR(45) NOT NULL,
  summary VARCHAR(500) NULL,
  detail LONGTEXT NULL,                -- description -> detail 변경
  author VARCHAR(45) NOT NULL,
  pages INT NOT NULL,
  contents LONGTEXT NULL,              -- index -> contents 변경
  price INT NOT NULL,
  pub_date DATE NULL,
  PRIMARY KEY (book_id),
  UNIQUE INDEX isbn_UNIQUE (isbn ASC),
  CONSTRAINT fk_books_category
    FOREIGN KEY (category_id) REFERENCES category (category_id)
);

-- 4. 좋아요 테이블 생성 --
CREATE TABLE likes (
  user_id INT NOT NULL,
  liked_book_id INT NOT NULL,
  INDEX user_id_idx (user_id ASC),
  INDEX liked_book_id_idx (liked_book_id ASC),
  CONSTRAINT fk_likes_user FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
  CONSTRAINT fk_likes_book FOREIGN KEY (liked_book_id) REFERENCES books (book_id) ON DELETE CASCADE
);

-- 5. 장바구니 테이블 생성 --
CREATE TABLE cart (
    cart_id INT NOT NULL AUTO_INCREMENT,
    book_id INT NOT NULL,
    user_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    PRIMARY KEY (cart_id),
    INDEX book_id_idx (book_id ASC),
    INDEX user_id_idx (user_id ASC),
    CONSTRAINT fk_cart_book FOREIGN KEY (book_id) REFERENCES books (book_id) ON DELETE CASCADE,
    CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

-- 6. 주문 배송 테이블 생성 --
CREATE TABLE delivery (
  delivery_id INT NOT NULL AUTO_INCREMENT,
  address VARCHAR(255) NOT NULL,
  receiver VARCHAR(100) NOT NULL,
  contact VARCHAR(100) NOT NULL,
  PRIMARY KEY (delivery_id)
);

-- 7. 주문 테이블 생성 --
CREATE TABLE orders (
  order_id INT NOT NULL AUTO_INCREMENT,
  book_title VARCHAR(255) NOT NULL, 
  total_quantity INT NOT NULL,  
  total_price INT NOT NULL,    
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL,
  delivery_id INT NOT NULL,    
  PRIMARY KEY (order_id), 
  CONSTRAINT fk_orders_users FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
  CONSTRAINT fk_orders_delivery FOREIGN KEY (delivery_id) REFERENCES delivery (delivery_id) ON DELETE CASCADE
);

-- 8. 주문된 도서 테이블 생성 --
CREATE TABLE orderedBook (
  ordered_book_id INT NOT NULL AUTO_INCREMENT,
  order_id INT NOT NULL,
  book_id INT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (ordered_book_id),
  CONSTRAINT fk_ordered_orders FOREIGN KEY (order_id) REFERENCES orders (order_id) ON DELETE CASCADE,
  CONSTRAINT fk_ordered_books FOREIGN KEY (book_id) REFERENCES books (book_id) ON DELETE CASCADE
);