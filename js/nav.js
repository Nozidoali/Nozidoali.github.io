$(function(){
    $("#nav a").click(function(){
        $("#display div").eq($("#nav a").index(this)).show().siblings("#display div").hide();
    });
});