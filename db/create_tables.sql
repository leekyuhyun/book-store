-- 유저 테이블 시작--
-- 유저 테이블 생성 --
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL,
  name VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC)
);
-- 유저 테이블 끝--

-- 도서 테이블 시작 --
-- 도서 테이블 생성 --
CREATE TABLE `books` (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NOT NULL,
  `format` VARCHAR(45) NOT NULL,
  isbn VARCHAR(45) NOT NULL,
  summary VARCHAR(500) NULL,
  `description` LONGTEXT NULL,
  author VARCHAR(45) NOT NULL,
  pages INT NOT NULL,
  `index` LONGTEXT NULL,
  price INT NOT NULL,
  pub_date DATE NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `isbn_UNIQUE` (`isbn` ASC)
);
-- 예약어로 인한 컬럼명 수정 --
ALTER TABLE books CHANGE COLUMN `format` form VARCHAR(45) NOT NULL;
ALTER TABLE books CHANGE COLUMN `description` detail LONGTEXT NULL;
ALTER TABLE books CHANGE COLUMN `index` contents LONGTEXT NULL;
-- 컬럼 추가--
ALTER TABLE books ADD COLUMN img INT NULL AFTER title;
ALTER TABLE books ADD COLUMN category_id INT NULL AFTER img;
-- 도서 테이블 끝 --

-- 카테고리 테이블 시작 --
-- 카테고리 테이블 생성 --
CREATE TABLE category (
  id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY(id)
);