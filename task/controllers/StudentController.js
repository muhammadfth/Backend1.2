// import model student
const Student = require("../models/Students")

class StudentController {
    async index(req, res) {
        const students = await Student.all();
        // data array lebih dari 0
        if (students.length>0){
            const data = {
                message: "Menampilkan data student",
                data:students
            };

            res.status(200).json(data);
        }
        else{
            const data = {
                massage : "Students is empety",
            };
            res.status(200).json(data);
        }
    }

    async store(req, res) {
        /**
         * TODO 2: memanggil method create.
         * Method create mengembalikan data yang baru diinsert.
         * Mengembalikan response dalam bentuk json.
         */

        // destructing object req.boyd
        const { nama, nim, email, jurusan } = req.body

        //jika data unfined maka kirim response error
        if (!nama || !nim || !email || !jurusan){
            const data = {
                message : "Semua data harus dikirim"
            };

            return res.status(422).json(data);
        }
        //else
        const students = await Student.create(req.body);
        
        const data = {
            message: "Menambahkan data student",
            data: students
        };

        res.status(201).json(data);
    }


    async update(req, res) {
        /**
         * check id students
         * jika ada, lakukan update
         * jika tidak, kirim data tidak ada
         */
        const { id } = req.params;

        const students = await Student.find(id);

        if (students) {
            // update data
            const studentUpdated = await Student.update(id, req.body);
            const data = {
                message: "Mengupdate data student",
                data: studentUpdated,
            };

            res.status(200).json(data);
        }
        else {
            // kirim data tidak ada
            const data = {
                message: "Data tidak ada",
            };

            res.status(404).json(data);
        }



    }

    async destroy(req, res) {
        const { id } = req.params;

        /**
         * cari id
         * jika ada, hapus data
         * jika tidak, kirim data tidak ada
         */

        const student = await Student.find(id);

        if (student) {
            // hapus data
            await Student.delete(id);
            const data = {
                message: "Menghapus data student",
            };

            res.status(200).json(data);
        }
        else {
            // data tidak ada
            const data = {
                message: "Data tidak ada",
            };

            res.status(404).json(data);
        }
    }

    async show(req, res) {
        /**
         * cari id
         * jika ada, kirim datanya
         * jika tidak, kirim data tidak ada
         */
        const { id } = req.params;

        const student = await Student.find(id);

        if (student) {
            const data = {
                message: "Menampilkan detail data student",
                data: student,
            };

            res.status(200).json(data);
        }
        else {
            const data = {
                message: "Data tidak ada",
            };

            res.status(404).json(data);
        }

    }
}

// make an object Student Controller
const object = new StudentController();

// export object
module.exports = object;