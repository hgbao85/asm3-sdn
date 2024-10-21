const express = require("express");
const router = express.Router();
const { getInfo, getStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require("../controllers/studentController");

router.get("/info", getInfo);
router.get("/students", getStudents);
router.get("/students/:id", getStudentById);
router.post("/students", createStudent);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);

module.exports = router;
