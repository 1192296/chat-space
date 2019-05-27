$(function() {
  buildMessageHTML = function(message) {
   var htmlParent = '<div class="message" data-id=' + message.id + '>' +
                     '<div class="upper-message">' +
                       '<div class="upper-message__user-name">' +
                         message.user_name +
                       '</div>' +
                       '<div class="upper-message__date">' +
                         message.date +
                       '</div>' +
                     '</div>' 
   if (message.content && message.image) {
   var html = htmlParent + 
               '<div class="lower-message">' +
                 '<p class="lower-message__content">' +
                   message.content +  
                 '</p>' +
                 '<img src="' + message.image + '" class="lower-message__image" >' +
               '</div>' +
             '</div>'
   } else if (message.content) {
     var html = htmlParent + 
                 '<div class="lower-message">' +
                   '<p class="lower-message__content">' +
                     message.content +
                   '</p>' +
                 '</div>' +
               '</div>'
   } else if (message.image) {
     var html = htmlParent + 
                 '<div class="lower-message">' +
                   '<img src="' + message.image + '" class="lower-message__image" >' +
                 '</div>' +
               '</div>'
   };
   return html;
 };

  $('#new_message').on('submit', function(e){
    e.preventDefault(); 
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildMessageHTML(data);
      $('.messages').append(html);
      $('#message_content').val(''); 
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $(".form__submit").removeAttr("disabled");
    });
  });

  var reloadMessages = function() {
    var url = window.location.pathname ;  
    var url = url.replace("messages", "api/messages");
    last_message_id = $('.messages').children().last().data('id');
    if(window.location.href.match(/\/groups\/\d+\/messages/))
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(message) {
      var insertHTML = '';
      if (message.length !== 0){
        message.forEach(function(message){
        insertHTML += buildMessageHTML(message);
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
    }
      })
    .fail(function(message) {
      alert('エラーが発生したためメッセージは送信できませんでした。');
    }); 
  }
  setInterval(reloadMessages, 5000);
});
