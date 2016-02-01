exports.up = function(knex, Promise) {
  return knex.schema.createTable('freebies', function(table){
    table.increments();
    table.integer('category_id');
    table.integer('start_month');
    table.integer('start_day');
    table.integer('start_year');
    table.integer('end_month');
    table.integer('end_day');
    table.integer('end_year');
    table.integer('repetition_days')
    table.string('name');
    table.text('location');
    table.text('details');
    table.string('url');
    table.integer('creator_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('freebies');
};
