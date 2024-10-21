const Student = require('../models/Student');

exports.getInfo = (req, res) => {
  res.json({
    data: {
      fullName: "Huynh Gia Bao",
      studentCode: "QE170095"
    }
  });
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    const result = students.map(student => {
      const studentObj = student.toObject();
      delete studentObj.__v;
      return studentObj;
    });
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createStudent = async (req, res) => {
  const { fullName, studentCode, isActive } = req.body;
  try {
    const newStudent = new Student({ fullName, studentCode, isActive });
    await newStudent.save();
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: {
        _id: newStudent._id,
        name: newStudent.fullName,
        studentCode: newStudent.studentCode,
        isActive: newStudent.isActive
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateStudent = async (req, res) => {
  const { fullName, isActive } = req.body;
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { fullName, isActive },
      { new: true, runValidators: true }
    );
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.json({ success: true, message: 'Student updated successfully', data: student });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Invalid student ID format' });
    }
    res.status(500).json({ success: false, message: 'Something went wrong on the server' });
  }
};