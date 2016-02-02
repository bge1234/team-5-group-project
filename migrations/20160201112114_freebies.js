exports.up = function(knex, Promise) {
  return knex.schema.createTable('freebies', function(table){
    table.increments();
    table.integer('category_id');
    table.string('start_date');
    table.string('end_date');
    table.text('text');
    table.string('name');
    table.string('location');
    table.string('url');
    table.integer('creator_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('freebies');
};
