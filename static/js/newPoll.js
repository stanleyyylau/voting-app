/**
 * Created by Stanley on 11/26/16.
 */

$(document).ready(function(){
    $("#J_submit").on("click", function(ee){
        ee.preventDefault();
        var title = $("#pollName").val();
        var options = [];
        $("input.options").each(function(index, value){
            if($(value).val().trim() !== ''){
                options.push($(value).val())
            }
        })

        console.log({
            title: title,
            options: options
        })

        var dataToSend = {
            title: title,
            options: options
        }

        $.ajax({
            type: "POST",
            url: "/new",
            dataType: 'json',
            data: dataToSend,
            success: function(data){
                console.log(data);
                if (typeof data.redirect == 'string')
                    window.location.replace(window.location.protocol + "//" + window.location.host + data.redirect);
            }
        });

    })

    $("#J_moreOptions").on("click", function(ee){
        ee.preventDefault();
        $('<input class="form-control options" type="text" placeholder="new option">').appendTo('div.options');
    })



})