exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.integer('phone_number');
    table.string('freebie_id');
    table.string('category_preferences_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
