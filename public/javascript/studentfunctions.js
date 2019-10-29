var total = 0;
var foodId = [];

var showMenu = function (data) {
    console.log(data);
    $(".page-content").html("");
    var pageContent = '';
    pageContent += '<div class="row no-gutters">'
    for (var i = 0; i < data.length; i++) {
        pageContent += '<div class="card mb-auto mx-3 my-3 col-md-2"><img src="/images/food1.jpg" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">' + data[i].itemname + '</h5><p class="card-text">Cost: <span class="cost">' + data[i].cost + '</span></p><a href="#" class="btn btn-danger remove-from-cart">-</a><span class="count px-2" id=' + data[i].id + '>0</span><a href="#" class="btn btn-primary add-to-cart">+</a></div></div>';
    }
    console.log("adf");
    pageContent += '</div>'
    pageContent += '<div class="d-flex order-bar position-absolute"><div class="p-3"><strong>Total: ₹<span class="total-cost"> 0</span></strong></div><div class="ml-auto p-1 pr-3"><button class="btn btn-success final-order">Order</button></div></div></div>'
    // $(".form-content").html(formContent);
    $(".page-content").html(pageContent);
    $(".page-content").css("scroll-y", "overflow");
}

$(document).on("click", ".menu", function (e) {
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
            showMenu(data);
        },
        error: data => {
            console.log(data);
        }
    })
})
$(document).on("click", ".add-to-cart", function (e) {

    e.preventDefault();
    var count = $(this).parent().children("span").html();
    count = parseInt(count) + 1
    $(this).parent().children(".count").html(count);
    var cost = $(this).parent().children().children(".cost").html();
    console.log(cost);
    total = total + parseInt(cost)
    $(".total-cost").html(total);
    fId = $(this).parent().children(".count").attr("id");
    if (foodId.length !== 0) {
        let result = foodId.map(a => a.id);
        if (result.includes(fId)) {
            objIndex = foodId.findIndex((obj => obj.id == fId));
            foodId[objIndex].count = count;
        }
        else {
            foodId.push({ "id": fId, "count": count })
        }
    }
    else {
        foodId.push({ "id": fId, "count": count })
    }
})

$(document).on("click", ".remove-from-cart", function (e) {
    e.preventDefault();
    var count = $(this).parent().children("span").html();
    count = parseInt(count) - 1
    $(this).parent().children(".count").html(count);
    var cost = $(this).parent().children().children(".cost").html();
    console.log(cost);
    total = total - parseInt(cost)
    $(".total-cost").html(total);
    fId = $(this).parent().children(".count").attr("id");
    if (foodId.length !== 0) {
        let result = foodId.map(a => a.id);
        if (result.includes(fId)) {
            objIndex = foodId.findIndex((obj => obj.id == fId));
            foodId[objIndex].count = count;
        }
        else {
            foodId.push({ "id": fId, "count": count })
        }
    }
    else {
        foodId.push({ "id": fId, "count": count })
    }
})

$(document).on("click", ".final-order", function () {
    var items = JSON.stringify(foodId);
    var cost = $(".total-cost").html();
    console.log(cost);
    $.ajax({
        method: "POST",
        url: "/addOrder",
        data: {
            "items": items,
            "cost": cost
        },
        success: data => {
            alert("food ordered");
        }
    })
})

$(document).on("click", "#view-orders", function (e) {
    e.preventDefault();
    $.ajax({
        method: "GET",
        url: "/viewOrders",
        success: data => {
            let pageContent = '';
            pageContent += '<h3 class="p-3 ml-5">Your food is getting ready</h3>'
            if(data.length == 0) {
                pageContent += '<h3 class="p-3 pl-5 ml-5" style="color: red">No Current Orders</h3>'
            }
            for (var i = 0; i < data.length; i++) {
                if (data[i].served == 'false')
                    pageContent += `<div class="card mb-auto mx-auto my-3 col-md-11"><div class="card-body"><h5 class="card-title"> ${data[i].timeOfOrder} </h5><p class="card-text"><span class="cost"> ${data[i].itemname}: ${data[i].quantity} </span></p></div></div>`;
            }
            pageContent += '<hr>'
            pageContent += '<h3 class="p-3 ml-5 mt-2">Served food</h3>'
            if(data.length == 0) {
                pageContent += '<h3 class="p-3 pl-5 ml-5" style="color: red">No Previous Orders</h3>'
            }
            for (var i = 0; i < data.length; i++) {
                if (data[i].served == 'true')
                    pageContent += `<div class="card mb-auto mx-auto my-3 col-md-11"><div class="card-body"><h5 class="card-title"> ${data[i].timeOfOrder} </h5><p class="card-text"><span class="cost"> ${data[i].itemname}: ${data[i].quantity} </span></p></div></div>`;
            }
            $(".page-content").html(pageContent);
            console.log(data);
        }
    })
})

$(document).on("click", ".order-button", function (e) {
    e.preventDefault();
    $(".menu").addClass("active");
    var mess = $(this).attr('id');
    console.log(mess);
    $.ajax({
        method: "GET",
        url: "/menu",
        data: {
            "mess": mess,
        },
        success: data => {
            showMenu(data);
        },
        error: data => {
            console.log(data);
        }
    })
})