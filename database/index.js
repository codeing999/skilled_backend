// import mysql from 'mysql2';
// import dotenv from 'dotenv';

// dotenv.config();

// const pool = mysql.createPool({
//     host: "express-database.ckacb6rukdh1.ap-northeast-2.rds.amazonaws.com",
//     user: "admin",
//     database: "express-database",
//     password: "1234qwer",
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
// });

// pool.getConnection(async (err, conn) => {
//     try {
//         conn.release();
//     } catch (err) {
//         err ? console.error(err) : console.log("db connect");
//     }
// });

// export default pool.promise();