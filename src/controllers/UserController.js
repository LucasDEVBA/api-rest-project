import User from '../models/User';

class UserController {
  async create(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { id, name, email } = newUser;

      return res.json({ id, name, email });
    } catch (error) {
      return res.status(400).json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
      return res.json(users);
    } catch (error) {
      return res.json(null);
    }
  }

  // async show(req, res) {
  //   try {
  //     const user = await User.findByPk(req.params.id);

  //     const { id, name, email } = user;
  //     return res.json({ id, name, email });
  //   } catch (error) {
  //     return res.json(null);
  //   }
  // }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({ errors: ['Usuário não existe.'] });
      }
      const newData = await user.update(req.body);
      const { id, name, email } = newData;
      return res.json({ id, name, email });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ errors: error.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({ errors: ['Usuário não existe.'] });
      }
      await user.destroy();
      return res.json('Usuário deleteado com sucesso');
    } catch (error) {
      console.log(error);
      return res.status(400).json({ errors: error.errors.map((err) => err.message) });
    }
  }
}

export default new UserController();
