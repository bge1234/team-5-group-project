exports.up = function(knex, Promise) {
  return knex.schema.createTable('megausers', function(table){
    table.increments();
    table.string('name');
    table.string('url');
    table.string('username');
    table.string('password');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('megausers');
};
