/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('categories_default').del();
    await knex('categories_default').insert([
        { type: 'income', name: 'Gaji' },
        { type: 'income', name: 'Bonus' },
        { type: 'income', name: 'Bisnis' },
        { type: 'income', name: 'Investasi' },
        { type: 'income', name: 'Pemberian' },
        { type: 'income', name: 'Penjualan' },
        { type: 'income', name: 'Pinjaman' },
        { type: 'income', name: 'Hadiah'}
    ]);
    await knex('categories_default').insert([
        { type: 'expense', name: 'Belanja' },
        { type: 'expense', name: 'Hiburan' },
        { type: 'expense', name: 'Investasi' },
        { type: 'expense', name: 'Keluarga' },
        { type: 'expense', name: 'Kesehatan' },
        { type: 'expense', name: 'Makan dan Minum' },
        { type: 'expense', name: 'Pendidikan' },
        { type: 'expense', name: 'Cicilan' },
        { type: 'expense', name: 'Sedekah' },
        { type: 'expense', name: 'Pajak' },
        { type: 'expense', name: 'Tagihan' },
        { type: 'expense', name: 'Transportasi' },
    ]);
};
