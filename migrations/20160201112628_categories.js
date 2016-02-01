exports.up = function(knex, Promise) {
  return knex.schema.createTable('sub_categories', function(table){
    table.increments();
    table.string('name');
    table.integer('level');
    table.integer('parent');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sub_categories');
};
