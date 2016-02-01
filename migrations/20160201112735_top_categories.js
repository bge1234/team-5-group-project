exports.up = function(knex, Promise) {
  return knex.schema.createTable('top_categories', function(table){
    table.increments();
    table.string('name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('top_categories');
};
