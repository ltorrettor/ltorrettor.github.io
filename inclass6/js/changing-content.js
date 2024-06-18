$(function() {
	$('li:contains(pine)').text('almonds');
	$('li.hot').html((i, oldHtml) => '<em>' + oldHtml + '</em>');
	$('li#one').remove();
});
