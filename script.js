var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]; 
window.onload = getData;
$('.tab').click(selectTab);
$('.search').click(function() {
  $('.main').empty();
  let user = $('.input').val();
   let urlChannels = 'https://wind-bow.gomix.me/twitch-api/channels/' + user + '?callback=?';
   let urlStreams = 'https://wind-bow.gomix.me/twitch-api/streams/' + user + '?callback=?';

   $.getJSON(urlChannels, function(data) {
      let name = data.display_name;
      let logo = data.logo;
      let url = data.url; 
     if(data.name){
        $('.main').append('<a href="'+ url + '" target="_blank" class="user ' + user + '"></a>');
      $('.' + user).append('<div class="logo"><img width="200" src="' + logo +'"></div><div class="name">' + name + '</div>');
     } else {
       $('.main').html('Not found');
     }
     
    });
  
  $.getJSON(urlStreams, function(data) {
      if (data.stream) {
        let status = data.stream.channel.status;
        if (status.length > 30) {
          status = status.slice(0, 30) + '...';
        }
       
        $('.' + user).attr('title', data.stream.channel.status).addClass('online').append('<div class="status">' + status + '</div>');
      } else {
        $('.' + user).addClass('offline').append('<div class="status">Offline</div>');
      }
    });

}) 

function selectTab() {
  $('.tab').removeClass('active');
  $(this).addClass('active');
  let id = $('.active').attr('id');
  switch (id) {
    case 'on':
      $('.online').css('display', 'inline-block');
      $('.offline').css('display', 'none');
      break;
    case 'off': 
      $('.online').css('display', 'none');
      $('.offline').css('display', 'inline-block');
      break;
    case 'all':
  $('.offline').add('.online').css('display', 'inline-block');
  }
}

function getData() {
  $.each(users, function(i, user) {
    let urlChannel = 'https://wind-bow.gomix.me/twitch-api/channels/' + user + '?callback=?';
    
    $.getJSON(urlChannel, function(data) {
      let name = data.display_name;
      let logo = data.logo;
      let url = data.url;
      $('.main').append('<a href="'+ url + '" target="_blank" class="user ' + user + '"></a>');
      $('.' + user).append('<div class="logo"><img width="200" src="' + logo +'"></div><div class="name">' + name + '</div>');
    });
  });
 $.each(users, function(i, user) {
   let urlStreams = 'https://wind-bow.gomix.me/twitch-api/streams/' + user + '?callback=?'; 
   $.getJSON(urlStreams, function(data) {
      if (data.stream) {
        let status = data.stream.channel.status;
        if (status.length > 30) {
          status = status.slice(0, 30) + '...';
        }
        
        $('.' + user).attr('title', data.stream.channel.status).addClass('online').append('<div class="status">' + status + '</div>');
      } else {
        $('.' + user).addClass('offline').append('<div class="status">Offline</div>');
      }
    });
  });
 
}

