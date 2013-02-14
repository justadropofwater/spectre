$(".bar").animate({width:'100%'},{duration:5000,step:function(now,fx){
    var pc = parseInt(now)+'%';
    $(".percent").html(pc);}
});