/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('categories', (table) => {
    table.string('id').primary();
    table.string('user_id').notNullable().references('id').inTable('users');
    table.enum('type', ['income', 'expense']).notNullable();
    table.string('name').notNullable();
    table.bigInteger('limited').nullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('categories');
};
