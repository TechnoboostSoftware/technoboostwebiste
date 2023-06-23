

function sendMessage(){


    
    var inputList=['#firstName','#lastName','#email','#message']
    var firstName=$("#firstName").val();
    var lastName=$("#lastName").val();
    var email=$("#email").val();
    var message=$("#message").val();

    var isError = false
        if(firstName == ""){
            addErrorBorder("#firstName")
            isError = true
        }
        if(lastName == ""){
            addErrorBorder("#lastName")
            isError =true
        }
        if(email == ""){
            addErrorBorder("#email")
            isError = true
        }
         if(message == ""){
            addErrorBorder("#message")
            isError = true
        }

    if(!isError){

        var emailBodyContent='<b>First Name :</b> '+firstName+'<br> ';
                emailBodyContent+='<b>Last Name :</b> '+lastName+'<br> ';
                emailBodyContent+='<b>Email : </b> '+email+'<br>';
                emailBodyContent+='<b>Message:</b>'+message;
    
            var jsondata={
                "token": "gUXMeJn%P8gRVxMHRcC",
                "emailSubjectLine": "Enquiry for business",
                "emailBodyContent": emailBodyContent
            }
    
            $("#sendMessageBtn").attr("disabled",true)
            $.ajax({
                type: "POST",
                url: "https://es.technoboost.in/api/v1/mail-send",
                data: JSON.stringify(jsondata),
                contentType: "application/json; charset=utf-8",
                success: function(result){
                $("#sendMessageBtn").attr("disabled",false)

                    $(".alert").toggle('alert')
                    $(".alert").addClass('show')
                    if(result.hasOwnProperty('status') && result.status=='NOT_FOUND' ){
                      
                        $(".alert").removeClass('alert-success')
                        $(".alert").addClass('alert-danger')

                        $("#alertMessage").html('<strong> Someting went wrong try again </b>')
                    }else{
                        $(".alert").addClass('alert-success')
                        $(".alert").removeClass('alert-danger')
                        $("#alertMessage").html(' <strong>Thankyou for contacting us!  </strong> Our team will get back to you.')

                    }
                },
                error:function(err){
                $("#sendMessageBtn").attr("disabled",false)
                    $(".alert").toggle('alert')
                    $(".alert").addClass('show')
                    $(".alert").removeClass('alert-success')
                    $(".alert").addClass('alert-danger')
                    
                    $("#alertMessage").html('<strong> Someting went wrong try again </b>')
                }
        });

    }
  }


  function addErrorBorder(id){  
    $(id).addClass("is-invalid")
}

function removeErrorBorder(id) {  
    $(id).removeClass("is-invalid")

}