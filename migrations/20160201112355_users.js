exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.integer('phone_number');
    table.text('freebie_faves');
    table.text('category_preferences');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
