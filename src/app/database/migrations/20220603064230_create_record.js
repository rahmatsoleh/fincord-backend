/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('records', (table) => {
    table.string('id').primary();
    table.string('user_id').notNullable().references('id').inTable('users');
    table.enum('type', ['income', 'expense']).notNullable();
    table.string('note').nullable();
    table.bigInteger('amount').notNullable();
    table.string('category_id').references('id').inTable('categories');
    table.date('date').nullable();

    // soft delete
    table.dateTime('deleted_at').nullable();

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('records');
};
