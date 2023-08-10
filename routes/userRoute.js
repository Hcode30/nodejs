import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
  unAuth,
  unAuthForDevs,
} from '../services/userService.js';

import { IdValidator } from '../utils/validators/idValidation.js';

export function routerAccess(Router, Mode) {
  if (Mode === 'Development') {
    Router.route('/').get(getUsers).post(createUser).delete(deleteAllUsers);
    Router.route('/:id')
      .get(IdValidator, getUser)
      .put(IdValidator, updateUser)
      .delete(IdValidator, deleteUser);
  } else if (Mode === 'Production') {
    Router.route('/').get(getUsers).post(createUser).delete(unAuthForDevs);
    Router.route('/:id')
      .get(IdValidator, getUser)
      .put(IdValidator, updateUser)
      .delete(unAuthForDevs);
  } else {
    Router.route('/').get(unAuth).post(unAuth).delete(unAuth);
    Router.route('/:id').get(unAuth).put(unAuth).delete(unAuth);
  }
}
