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
import {
  createValidator,
  getValidator,
  updateValidator,
  deleteValidator,
} from '../utils/validators/userValidators.js';

export function routerAccess(Router, Mode) {
  if (Mode === 'Development') {
    Router.route('/')
      .get(getUsers)
      .post(createValidator, createUser)
      .delete(deleteAllUsers);
    Router.route('/:id')
      .get(getValidator, getUser)
      .put(updateValidator, updateUser)
      .delete(deleteValidator, deleteUser);
  } else if (Mode === 'Production') {
    Router.route('/')
      .get(getUsers)
      .post(createValidator, createUser)
      .delete(unAuthForDevs);
    Router.route('/:id')
      .get(getValidator, getUser)
      .put(updateValidator, updateUser)
      .delete(unAuthForDevs);
  } else {
    Router.route('/').get(unAuth).post(unAuth).delete(unAuth);
    Router.route('/:id').get(unAuth).put(unAuth).delete(unAuth);
  }
}
