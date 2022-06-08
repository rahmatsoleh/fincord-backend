/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('bill_records', (table) => {
        table.bigIncrements('id').primary();
        table.bigInteger('bill_plan_id').unsigned().notNullable();
        table.bigInteger('record_id').unsigned().notNullable();
        table.string('user_id').notNullable();
        table.string('name').notNullable();
        table.text('description').nullable();
        table.enum('status', ['done', 'due', 'cancled']).notNullable();

        table.foreign('bill_plan_id').references('id').inTable('bills');
        table.foreign('record_id').references('id').inTable('records');
        table.foreign('user_id').references('id').inTable('users');

        table.dateTime('deleted_at').nullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('bill_records');
};
