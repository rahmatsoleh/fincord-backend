/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('saving_records', (table) => {
        table.bigIncrements('id').primary();
        table.string('user_id').notNullable().references('id').inTable('users');
        table.bigInteger('saving_plan_id').unsigned().notNullable().references('id').inTable('saving_plans');
        table.longText('save').nullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('saving_records');
};
