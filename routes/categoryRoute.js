import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
  unAuth,
  unAuthForDevs,
} from '../services/categoryService.js';
import {
  createValidator,
  getValidator,
  updateValidator,
  deleteValidator,
} from '../utils/validators/categoryValidators.js';

export default function routerAccess(Router, Mode) {
  if (Mode === 'Development') {
    Router.route('/')
      .get(getCategories)
      .post(createValidator, createCategory)
      .delete(deleteAllCategories);
    Router.route('/:id')
      .get(getValidator, getCategory)
      .put(updateValidator, updateCategory)
      .delete(deleteValidator, deleteCategory);
  } else if (Mode === 'Production') {
    Router.route('/')
      .get(getCategories)
      .post(createValidator, createCategory)
      .delete(unAuthForDevs);
    Router.route('/:id')
      .get(getValidator, getCategory)
      .put(updateValidator, updateCategory)
      .delete(unAuthForDevs);
  } else {
    Router.route('/').get(unAuth).post(unAuth).delete(unAuth);
    Router.route('/:id').get(unAuth).put(unAuth).delete(unAuth);
  }
}
