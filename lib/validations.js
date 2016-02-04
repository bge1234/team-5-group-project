module.exports = {
  nameIsNotBlank: function(input) {
    console.log(input);
    return !input.trim() ? 'Name cannot be blank' : '';
  },
  locationIsNotBlank: function(input) {
    return !input.trim() ? 'Location cannot be blank' : '';
  },
  startDateIsNotBlank: function(input) {
    return !input.trim() ? 'Start date cannot be blank' : '';
  },
  detailsNotBlank: function(input) {
    return !input.trim() ? 'Details cannot be blank' : '';
  },
  urlNotBlank: function(input) {
    return !input.trim() ? 'First name cannot be blank' : '';
  }
}
