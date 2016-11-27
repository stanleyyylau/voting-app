/**
 * Created by Stanley on 11/27/16.
 */

$(document).ready(function(req, res){
    $("#J_createOption").on("click", function(req, res){
        if(!isLogIn){
            alert("You have to login to create your own custom option")
        }else{
            $(this).closest('.col-md-4').html('<input class="form-control" id="newOption" type="text" placeholder="Enter your new option here"><a class="btn btn-primary" id="J_addNewOption">Confirm</a>')
            $("#J_addNewOption").on("click", function(){
                var newOption = $("#newOption").val().trim();
                if(newOption){
                    console.log('About to send this hit to server, confirm???')
                    console.log(newOption);
                    $.ajax({
                        type: "POST",
                        url: "/newoption",
                        dataType: 'json',
                        data: {
                            voteId: $('.col-md-4.text-left').data('vote-id'),
                            newOption: newOption
                        },
                        success: function(data){
                            console.log(data);
                            if (typeof data.redirect == 'string')
                                window.location.replace(window.location.protocol + "//" + window.location.host + data.redirect);
                        }
                    });
                }
            })
        }
    })
})
