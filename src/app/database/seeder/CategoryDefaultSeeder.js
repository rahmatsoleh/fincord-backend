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
    { type: 'expense', name: 'Belanja', limited: 900000 },
    { type: 'expense', name: 'Hiburan', limited: 2000000 },
    { type: 'expense', name: 'Investasi', limited: 400000 },
    { type: 'expense', name: 'Keluarga', limited: 6000000 },
    { type: 'expense', name: 'Kesehatan', limited: 5000000 },
    { type: 'expense', name: 'Makan dan Minum', limited: 700000 },
    { type: 'expense', name: 'Pendidikan', limited: 1440000 },
    { type: 'expense', name: 'Cicilan', limited: 98000000 },
    { type: 'expense', name: 'Sedekah', limited: 15000000 },
    { type: 'expense', name: 'Pajak', limited: 65000000 },
    { type: 'expense', name: 'Tagihan', limited: 16000000 },
    { type: 'expense', name: 'Transportasi', limited: 64000000 },
  ]);
};
