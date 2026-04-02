import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const conn = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dateStrings: true,
  connectionLimit: 10,
  waitForConnections: true,
});

// 연결이 잘 되는지 테스트
conn.getConnection((err, connection) => {
  if (err) {
    console.error('❌ DB 연결 실패:', err.message);
  } else {
    console.log('✅ DB 연결 성공!');
    connection.release();
  }
});

export default conn;
