$(function(){
    $("#output_nav div").click(function(){
        $("#output_display div").eq($("#output_nav div").index(this)).show().siblings("#output_display div").hide();
    });
});

$(function(){
    $("#input_nav div").click(function(){
        $("#input_display div").eq($("#input_nav div").index(this)).show().siblings("#input_display div").hide();
    });
});