var randNum = function(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min
}

var randImg = randNum(1, 8)

function slideShow(){
  $('body').css({
    'background':'url("../../images/colorado/'+ randImg +'.jpg")',
    'background-size': 'cover',
    'background-repeat': 'no-repeat',
    'background-attachment': 'fixed',
    'background-color': 'black'
  })
}
slideShow();
