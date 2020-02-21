function setTitle(){
  var fullTitle = document.getElementsByTagName('title')[0].innerHTML;

  var regexTags = /\[(.*?)\]/g;
  var tags = '';
  for (var match of fullTitle.matchAll(regexTags)) {
    tags += '<span>' + match[1] + '</span>';
  }
  document.getElementById('mainTags').innerHTML = tags;

  var regexTitle = /^(.+?)[\n#\[]/;
  var title = fullTitle.match(regexTitle)[1];
  document.getElementById('mainTitle').innerHTML = title;

  var regexBTags = /#(\w+)/g;
  var bTags = '';
  for (var match of fullTitle.matchAll(regexBTags)) {
    bTags += '<a>' + match[1] + '</a>';
  }
  document.getElementById('bottomTags').innerHTML = bTags;
}
function configurePage(){
  $('#author').load('/post/author.html');
  $('#footer').load('/post/footer.html');
  $.get('/post/head.html', function(data){
    $('head').append(data);
  });
}
function loadPosts(){
	var MAX_POSTS = 2;
  var set = new Set([1]);
  
  $('#list').load('/post/list.html');

  while(set.size < 3 && MAX_POSTS >= 3){
  	var random = Math.floor(Math.random() * (MAX_POSTS)) + 1;
  	set.add(random);
  }
  
  var index = 0;
  set.forEach(function(val){
  	index += 1;
  	var post = 'https://iaco.me/post/' + ("00" + val).slice(-3);
    
    $.get(post, function(data){
      var title = $(data).filter('title').text().replace(/[#\[](.*)/g, '');
      $('#title-' + index).html(title);
  	});
    $('#img-' + index).attr('src', post + '/cover.jpg');
    $('#link-' + index).attr('href', post);
  });
}
