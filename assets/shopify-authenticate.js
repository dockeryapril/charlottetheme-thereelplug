$(document).ready(function(){
  $.ajax({url: "https://team.dropshiplifestyle.com/shopify-authenticate/search-contact-result.php?store_url=&email=jeno@dropshiplifestyle.com&theme_version=", success: function(result){
    //$("body").prepend(result);
    console.log(result); 
    if($(result).filter("#success").val() == "1") {
      //alert("You are a user");
      $(result).filter("script").insertAfter("#shopify-authenticate");    
    }   
    else {
      $(result).filter("script").insertAfter("#shopify-authenticate");    
      $("#Purchase-popup ").css("display","none");   
      $("#exit-popup ").css("display","none");       
      
           alert("This is a non-authenticated copy of the theme. Please buy the licensed copy."); 
           $("#shopify-authenticate-error").show();
           $("body").css("overflow","hidden");}
  }});
});