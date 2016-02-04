exports.up = function(knex, Promise) {
  return knex.schema.table('freebies', function(table){
    table.float('lat');
    table.float('long');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('freebies');
};
