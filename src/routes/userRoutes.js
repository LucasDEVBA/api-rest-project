import { Router } from 'express';
import userController from '../controllers/UserController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// router.get('/:id', userController.show);

router.get('/', userController.index);
router.post('/', userController.create);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;

/**
 * index -> lista todos usuarios -> get
 * store/create -> cria um novo usuario -> post
 * delete -> deleta um usuario -> delete
 * show -> mostra um usuario -> get
 * update -> atualiza um usuario -> patch ou put
 */
