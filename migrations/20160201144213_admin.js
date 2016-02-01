exports.up = function(knex, Promise) {
  return knex.schema.createTable('admin', function(table){
    table.increments();
    table.string('name');
    table.string('avatar');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('admin');
};
