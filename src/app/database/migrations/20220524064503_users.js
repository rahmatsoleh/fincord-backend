/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('username').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.dateTime('verified_at').nullable();
    table.string('token').nullable();
    table.string('profile').nullable();
    table.string('address').nullable();
    table.string('phone').nullable();

    // last login
    table.dateTime('last_login').nullable();

    table.unique('username');
    table.unique('email');
    table.unique('phone');

    table.dateTime('deleted_at').nullable();
    // default value for created_at and updated_at
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
