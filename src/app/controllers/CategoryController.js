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

  static async get(request, h) {
    const { query } = request;
    // need id of user

    const category = await Category.find(query.id);

    return h.response({
      error: false,
      statusCode: 200,
      message: 'Success',
      data: {
        category,
      },
    });
  }

  static async store(request, h) {
    const { payload } = request;
    // need id of user

    const category = await Category.create({
      id: payload.id,
      name: payload.name,
      user_id: payload.user_id,
      type: payload.type,
      limited: payload.limited || 0,
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
      type: payload.type,
      limited: payload.limited || 0,
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
    const { id } = request.payload;
    console.log(id);
    // id is the id of the category
    const category = await Category.delete({
      id,
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
