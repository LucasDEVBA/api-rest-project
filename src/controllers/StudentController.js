import Student from '../models/Student';
import File from '../models/File';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll({
      attributes: ['id', 'name', 'email', 'age', 'wheight'],
      order: [['id', 'DESC'], [File, 'id', 'DESC']],
      include: {
        model: File,
        attributes: ['url', 'filename'],
      },
    });
    res.json(students);
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ['id is required'] });
      }

      const student = await Student.findByPk(id, {
        attributes: ['id', 'name', 'email', 'age', 'wheight'],
        order: [['id', 'DESC'], [File, 'id', 'DESC']],
        include: {
          model: File,
          attributes: ['url', 'filename'],
        },
      });

      if (!student) {
        return res.status(400).json({ errors: ['aluno não existe'] });
      }

      return res.json(student);
    } catch (error) {
      return res.status(400).json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async create(req, res) {
    try {
      const newStudent = await Student.create(req.body);
      const {
        id, name, email, age, wheight,
      } = newStudent;

      return res.json({
        id, name, email, age, wheight,
      });
    } catch (error) {
      return res.status(400).json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ['id is required'] });
      }

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(400).json({ errors: ['aluno não existe'] });
      }

      const newData = await student.update(req.body);
      const {
        name, email, age, wheight,
      } = newData;

      return res.json({
        name, email, age, wheight,
      });
    } catch (error) {
      return res.status(400).json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ['id is required'] });
      }

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(400).json({ errors: ['aluno não existe'] });
      }
      await student.destroy();
      return res.json('Aluno deleteado');
    } catch (error) {
      return res.status(400).json({ errors: error.errors.map((err) => err.message) });
    }
  }
}

export default new StudentController();
