/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('categories_default', (table) => {
    table.string('id').primary();
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
  return knex.schema.dropTable('categories_default');
};
