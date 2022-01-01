const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

var mysqlConnection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true,
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connected!");
    } else {
        throw err;
    }
});

mysqlConnection.query(
    `
    USE 4Pix;
    CREATE TABLE IF NOT EXISTS users (
        id int auto_increment,
        username varchar(50),
        email varchar(100),
        hash_password char(60),
        PRIMARY KEY (id)
    );
    CREATE TABLE IF NOT EXISTS categories (
        category_id int auto_increment,
        name varchar(50),
        user_id int,
        PRIMARY KEY (category_id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS albums (
        album_id int auto_increment,
        name varchar(100),
        description text,
        category_id int,
        album_cover varchar(100),
        PRIMARY KEY (album_id),
        FOREIGN KEY (category_id) REFERENCES categories(category_id)
    );
    CREATE TABLE IF NOT EXISTS photos (
        photo_id int auto_increment,
        photo varchar(100),
        album_id int,
        PRIMARY KEY (photo_id),
        FOREIGN KEY (album_id) REFERENCES albums(album_id)
    );`,
    (err, results) => {
        if (err) {
            console.log(err);
        }
        // for (let i = 0; i < results.length; i++) {
        //     results[i].album_cover = undefined;
        // }
        console.log(results);
    }
);

module.exports = mysqlConnection;
