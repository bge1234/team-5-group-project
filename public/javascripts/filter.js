$(document).ready(function() {
$('.options').hide();
$('.fa').click(function(){
  $(".options").animate({
  height: "toggle"
    }, 100, function() {
  });
})
  $('#cbox1').change(function() {
    this.checked ? console.log('Goods is checked!') : console.log('Goods is un-checked!');
  })
  $('#cbox2').change(function() {
    this.checked ? console.log('Music is checked!') : console.log('Music is un-checked!');
  })
  $('#cbox3').change(function() {
    this.checked ? console.log('Art & Culture is checked!') : console.log('Art & Culture is un-checked!');
  })
  $('#cbox4').change(function() {
    this.checked ? console.log('Outdoors is checked!') : console.log('Outdoors is un-checked!');
  })
  $('#cbox5').change(function() {
    this.checked ? console.log('Family is checked!') : console.log('Family is un-checked!');
  })
})
