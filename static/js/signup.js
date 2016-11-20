$(document).ready(function(){
  $('button').on('click',function(e){
    e.preventDefault();
    var content = getContent();
    // if either email or password is empty
    if(content.email === '' || content.password === ''){
      return alert('Email or Password can not be empty');
    }
    // if email format is not correct
    if(/b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/.test(content.email)){
      return alert('Email not correct!!!')
    }
    // if password is less then 6 charaters
    if(content.password.length < 6){
      return alert('password should at least be 6 charaters long...')
    }
    // Todo: make ajax request to the server
    console.log(content);
    $.ajax({
      url: "/signup",
      method: 'POST',
      data: content,
      success: function(res){
        console.dir(res);
        $('form').text(res);
      }
    });
  })
})

var getContent = function(){
  var email = $('#email').val();
  var password = $('#password').val();
  return {
    email: email,
    password: password
  }
}
