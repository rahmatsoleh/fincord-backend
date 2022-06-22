/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('records', (table) => {
    table.bigIncrements('id').primary();
    table.string('user_id').notNullable().references('id').inTable('users');
    table.enum('type', ['income', 'expense']).notNullable();
    table.string('note').nullable();
    table.bigInteger('amount').notNullable();
    table.string('category').nullable();

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
