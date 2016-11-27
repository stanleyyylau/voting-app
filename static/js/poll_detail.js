/**
 * Created by Stanley on 11/27/16.
 */

$(document).ready(function(req, res){
    $("#J_createOption").on("click", function(e){
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

    // todo: add J_vote to poll_detail.pug template
    $("#J_vote").on("click", function(e){
        if($('input:checked').length === 0){
            alert("pls select an option!!!");
        }else{
            // get value and send to server
            var pollId = $(this).closest(".col-md-4").data("vote-id");
            var option = $('input:checked').val();
            // make ajax call now
            $.ajax({
                type: "POST",
                url: "/vote",
                dataType: 'json',
                data: {
                    pollId: pollId,
                    option: option
                },
                success: function(data){
                    console.log(data);
                    if (typeof data.redirect == 'string')
                        window.location.replace(window.location.protocol + "//" + window.location.host + data.redirect);
                }
            });
        }
    })
})
