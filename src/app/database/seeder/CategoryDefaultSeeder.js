/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
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
    { type: 'income', name: 'Hadiah' },
  ]);
  await knex('categories_default').insert([
    { type: 'expense', name: 'Belanja', limited: 10000000 },
    { type: 'expense', name: 'Hiburan', limited: 10000000 },
    { type: 'expense', name: 'Investasi', limited: 10000000 },
    { type: 'expense', name: 'Keluarga', limited: 10000000 },
    { type: 'expense', name: 'Kesehatan', limited: 10000000 },
    { type: 'expense', name: 'Makan dan Minum', limited: 10000000 },
    { type: 'expense', name: 'Pendidikan', limited: 10000000 },
    { type: 'expense', name: 'Cicilan', limited: 10000000 },
    { type: 'expense', name: 'Sedekah', limited: 10000000 },
    { type: 'expense', name: 'Pajak', limited: 10000000 },
    { type: 'expense', name: 'Tagihan', limited: 10000000 },
    { type: 'expense', name: 'Transportasi', limited: 10000000 },
  ]);
};
