import Sequelize from 'sequelize';
import databaseconfig from '../config/database';
import Student from '../models/Student';
import User from '../models/User';
import File from '../models/File';

const models = [Student, User, File];

const connection = new Sequelize(databaseconfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
