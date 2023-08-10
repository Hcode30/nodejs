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

export function routerAccess(Router, Mode) {
  if (Mode === 'Development') {
    Router.route('/').get(getUsers).post(createUser).delete(deleteAllUsers);
    Router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
  } else if (Mode === 'Production') {
    Router.route('/').get(getUsers).post(createUser).delete(unAuthForDevs);
    Router.route('/:id').get(getUser).put(updateUser).delete(unAuthForDevs);
  } else {
    Router.route('/').get(unAuth).post(unAuth).delete(unAuth);
    Router.route('/:id').get(unAuth).put(unAuth).delete(unAuth);
  }
}
