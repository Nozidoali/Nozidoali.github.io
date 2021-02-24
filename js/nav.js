$(function(){
    $("#nav div").click(function(){
        $("#display div").eq($("#nav div").index(this)).show().siblings("#display div").hide();
    });
});