exports.up = function(knex, Promise) {
  return knex.schema.createTable('freebies', function(table){
    table.increments();
    table.integer('category_id');
    table.integer('month');
    table.integer('day');
    table.integer('year');
    table.string('name');
    table.text('location');
    table.text('details');
    table.string('url');
    table.integer('user_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('freebies');
};
