const { nanoid } = require('nanoid');
const User = require('../../models/User');
const CategoryDefault = require('../../models/CategoryDefault');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL  existing entries
  await knex('categories').del();

  const users = await User.all();

  const type = ['income', 'expense'];
  const categories_default = await CategoryDefault.all();
  users.forEach(async (user) => {
    await type.forEach(async (t) => {
      await categories_default.forEach(async (category) => {
        await knex('categories').insert({
          id: nanoid(),
          user_id: user.id,
          type: t,
          name: category.name,
          limited: category.limited,
        });
      });
    });
  });
};
