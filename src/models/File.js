import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/app';

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
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('filename')}`;
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
