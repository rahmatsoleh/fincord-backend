const { nanoid, random } = require('nanoid');
const { faker } = require('@faker-js/faker');
const User = require('../../models/User');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('notification_temps').del();

  const data = [];

  const users = await User.all();

  users.forEach((user) => {
    data.push({
      id: nanoid(),
      user_id: user.id,
    });
  });

  await knex('notification_temps').insert(data);
};
