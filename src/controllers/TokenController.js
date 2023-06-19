import Jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({ errors: ['Credenciais inválidas'] });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ errors: ['Usuário não existe'] });
    }

    if (!(await user.passwordValidate(password))) {
      return res.status(401).json({ errors: ['Senha inválida'] });
    }

    const { id } = user;
    const token = Jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRTAION,
    });

    return res.json({ token });
  }
}

export default new TokenController();
