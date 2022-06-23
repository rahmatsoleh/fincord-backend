/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable(
      'notification_temps',
      (table) => {
        table.string('id').primary();
        table.string('user_id').references('id').inTable('users');
        table.timestamps();
      },
    );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('notification_temps');
};
