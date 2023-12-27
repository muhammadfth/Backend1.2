// import database
const db = require("../config/database");

// make Student model
class Student {
    static all() {
        return new Promise((resolve, reject) => {
            // lakukan query ke db untuk ambil data
            const query = "SELECT * FROM students";
            db.query(query, (err, results) => {
                resolve(results);
            });
        });
    }

    /**
  * TODO 1: Buat fungsi untuk insert data.
  * Method menerima parameter data yang akan diinsert.
  * Method mengembalikan data student yang baru diinsert.
  */
    static create(Student) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO students SET ?";
            db.query(query, Student, (err, results) => {
                resolve(this.show(results.insertId));
            });
        });
    }

    static show(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM students WHERE id = ${id} `;
            db.query(sql, (err, results) => {
                resolve(results);
            });
        });
    }


}


// export model
module.exports = Student;