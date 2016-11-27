$(document).ready(function(){
    $(".list-group-item .btn-warning").on("click", function(){
        var confirmDelete = window.confirm("Do you truely want to delete this poll???");
        if(confirmDelete){
            var PollId = $(this).closest(".list-group-item").data("id");
            console.log(PollId);
        }

        // ask the server to delete it
        $.ajax({
            type: "DELETE",
            url: "/poll",
            dataType: 'json',
            data: {id: PollId},
            success: function(data){
                console.log(data);
                if (typeof data.redirect == 'string')
                    window.location.replace(window.location.protocol + "//" + window.location.host + data.redirect);
            }
        });

    })
})