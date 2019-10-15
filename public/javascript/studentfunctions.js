$(document).on("click", ".menu", function(e){
    e.preventDefault();
    $(".active").removeClass("active");
    $(this).addClass("active");
    var mess = $(this).attr('id');
    console.log(mess);
    $.ajax({
        method: "GET",
        url: "/menu",
        data: {
            "mess": mess,
        },
        success: data => {
            console.log(data);
            $(".page-content").html("");
            var pageContent = '';
            pageContent+='<div class="row no-gutters">'
            for(var i=0;i<data.length;i++){
                pageContent+='<div class="card mb-auto ml-5 mt-3" style="width: 18rem;"><img src="/images/food1.jpg" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+ data[i].itemname +'</h5><p class="card-text">Cost: '+ data[i].cost +'</p><a href="#" class="btn btn-primary add-to-cart" id='+ data[i].id +'>Add to cart</a></div></div>';
            }
            console.log("adf");
            pageContent+='</div>'
            $(".page-content").addClass("row conatiner");
            // $(".form-content").html(formContent);
            $(".page-content").html(pageContent);
            $(".page-content").css("scroll-y", "overflow");
        },
        error: data=>{
            console.log(data);
        }
    })
})
$(document).on("click", "add-to-cart", function(){
    $.ajax({
        method: "POST",
        url: "/orderadd",
        success: data => {
            console.log(data);
        }
    })
})