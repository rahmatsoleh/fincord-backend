const Category = require('../models/Category');

class CategoryController {
  static async getAllByUserId(request, h) {
    const { query } = request;
    // need id of user

    const categories = await Category.getAllByUserId(query.id);

    return h.response({
      error: false,
      statusCode: 200,
      message: 'success',
      data: {
        categories,
      },
    }).code(200);
  }

  static async getCategoryByUserId(request, h) {
    const { type } = request.params;
    const { id } = request.query;

    const category = await Category.getCategoryByUserId({
      user_id: id,
      type,
    });
    console.log(category);

    return h.response({
      error: false,
      statusCode: 200,
      message: 'Success',
      data: {
        category,
      },
    }).code(200);
  }

  static async store(request, h) {
    const { payload } = request;
    // need id of user

    const category = await Category.create({
      name: payload.name,
      user_id: payload.user_id,
      type: payload.type,
    });

    return h.response({
      error: false,
      statusCode: 200,
      message: 'Success',
      data: {
        category,
      },
    }).code(200);
  }

  static async update(request, h) {
    const { payload } = request;
    // need id of user

    // id is the id of the category
    const category = await Category.update({
      id: payload.id,
      name: payload.name,
      user_id: payload.user_id,
      type: payload.type,
    });

    return h.response({
      error: false,
      statusCode: 200,
      message: 'Success',
      data: {
        category,
      },
    }).code(200);
  }

  static async delete(request, h) {
    const { type } = request.params;
    const { id } = request.query;

    // id is the id of the category
    const category = await Category.delete({
      id,
      type,
    });

    return h.response({
      error: false,
      statusCode: 200,
      message: 'Success',
      data: {
        category,
      },
    }).code(200);
  }
}

module.exports = CategoryController;
