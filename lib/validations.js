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
  },

  duplicateUser: function(objInput, arrDatabaseObjs, arrKeys) {
    var arrFound = [];

    for (var i = 0; i < arrKeys.length; i++) {
      arrFound.push(false);

      for (var j = 0; j < arrDatabaseObjs.length; j++) {
        if (objInput[arrKeys[i]] === arrDatabaseObjs[j][arrKeys[i]])
          arrFound[arrFound.length - 1] = true;
      }
    }

    var found = true;

    //found = true only if every element of arrFound is true. Otherwise, return false.
    for (var i = 0; i < arrFound.length; i++) {
      if(arrFound[i] === false)
        found = false;
    }

    return found;
  },

  passwordsMatch(password1, password2) {
    return true;
  }
}
