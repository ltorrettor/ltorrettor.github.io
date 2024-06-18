$(function() {
	$('ul').before('<p>Just updated</p>');
	$('li.hot').prepend('+ ');
	let newElem = $('<li><em>gluten-free</em> soy sauce</li>');
	$('li:last-child').after(newElem);

});
