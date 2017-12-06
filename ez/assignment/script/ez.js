/*
EquityZen Programming Challenge - solution by John Celentano - john.celentano@gmail.com
*/
$(document).ready(function(){

/*** particle animation ***/
init = $('#init');
init.focus();

// validate input and set pattern for new animation
$('#set').click(e => {

  // validate input
  let invalid = /[^LRlr\.]/.test(init.val()) || !init.val().length;
  if(invalid){ return false; }
  val = init.val().toUpperCase();
  len = init.val().length;

  // create animation
  a = new Animation(val);
  $('#chamber').html(a.getString());
});

// run animation and display result
$('#animate').click(e => {
  speed = $('#speed').val();
  if(a && speed){
    a.animate(speed);
    $('#chamber').html(a.getString());
  }
});


/*** bar chart ***/
  $('#main-toggle').click((e) => {
    let newval = e.target.value === 'particle-animation' ?
        'bar-chart' : 'particle-animation';
    $('#main-toggle').val(newval);
    $('#main-toggle').text('show ' + newval.replace(/-/, ' '));
    $('.toggle').toggle();
  });

  $('#search').focus();

  // Source: https://stackoverflow.com/questions/1620602/how-to-trigger-an-onkeyup-event-thats-delayed-until-a-user-pauses-their-typing
  // $('#search').keyup(_.debounce(function(e){
  $('#go').click((e) => {
    startIndex = 0;
    // pageNum = 1;
    setSearchTerm();
    setUrl(e.target.value);
    validateSearchTerm() ? search(url, display) : console.log('Invalid search. Please try again.');
    });
  // }, 500));
  $('.pagination').click((e) => {
    console.log('clicked: ' + e.target.id)
    if(!Object.keys(headerLinks).length || $('#search').val() !== searchTerm){
      $('#go').click();
    }
    else{
      setSearchTerm();
      setUrl(e.target.value);
      validateSearchTerm() ? search(url, display) : console.log('Invalid search. Please try again.');
    }
  })
});
