import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: ' ',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O nome precisa ter entre 3 255 caracteres',
          },
        },
      },
      lastname: {
        type: Sequelize.STRING,
        defaultValue: ' ',
        validate: {
          len: {
            args: [3, 255],
            msg: 'O sobrenome precisa ter entre 3 255 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já existente',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },
      age: {
        type: Sequelize.INTEGER,
        defaultValue: ' ',
        validate: {
          isInt: {
            msg: 'Idade precisa ser um número inteiro',
          },
        },
      },
      wheight: {
        type: Sequelize.FLOAT,
        defaultValue: ' ',
        validate: {
          isFloat: 'Peso informado de maneira incorreta',
        },
      },
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.hasMany(models.File, { foreignKey: 'student_id' });
  }
}
