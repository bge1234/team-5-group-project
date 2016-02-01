exports.up = function(knex, Promise) {
  return knex.schema.createTable('sub_categories', function(table){
    table.increments();
    table.string('name');
    table.integer('top_category_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sub_categories');
};
