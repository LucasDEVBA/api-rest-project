import Sequelize, { Model } from 'sequelize';

export default class File extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: ' ',
        validate: {
          notEmpty: {
            msg: 'O campo não pode estar vazio',
          },
        },
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: ' ',
        validate: {
          notEmpty: {
            msg: 'O campo não pode estar vazio',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'files',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id' });
  }
}
