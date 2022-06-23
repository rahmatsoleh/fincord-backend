const { nanoid } = require('nanoid');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('categories_default').del();
  await knex('categories_default').insert([
    { id: nanoid(), type: 'income', name: 'Gaji' },
    { id: nanoid(), type: 'income', name: 'Bonus' },
    { id: nanoid(), type: 'income', name: 'Bisnis' },
    { id: nanoid(), type: 'income', name: 'Investasi' },
    { id: nanoid(), type: 'income', name: 'Pemberian' },
    { id: nanoid(), type: 'income', name: 'Penjualan' },
    { id: nanoid(), type: 'income', name: 'Pinjaman' },
    { id: nanoid(), type: 'income', name: 'Hadiah' },
  ]);
  await knex('categories_default').insert([
    {
      id: nanoid(), type: 'expense', name: 'Belanja', limited: 900000,
    },
    {
      id: nanoid(), type: 'expense', name: 'Hiburan', limited: 2000000,
    },
    {
      id: nanoid(), type: 'expense', name: 'Investasi', limited: 400000,
    },
    {
      id: nanoid(), type: 'expense', name: 'Keluarga', limited: 6000000,
    },
    {
      id: nanoid(), type: 'expense', name: 'Kesehatan', limited: 5000000,
    },
    {
      id: nanoid(), type: 'expense', name: 'Makan dan Minum', limited: 700000,
    },
    {
      id: nanoid(), type: 'expense', name: 'Pendidikan', limited: 1440000,
    },
    {
      id: nanoid(), type: 'expense', name: 'Cicilan', limited: 98000000,
    },
    {
      id: nanoid(), type: 'expense', name: 'Sedekah', limited: 15000000,
    },
    {
      id: nanoid(), type: 'expense', name: 'Pajak', limited: 65000000,
    },
    {
      id: nanoid(), type: 'expense', name: 'Tagihan', limited: 16000000,
    },
    {
      id: nanoid(), type: 'expense', name: 'Transportasi', limited: 64000000,
    },
  ]);
};
