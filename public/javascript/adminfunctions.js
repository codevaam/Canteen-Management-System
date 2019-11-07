
// const socket = io('http://localhost:8080');
// socket.on('news', function(data) {
//     console.log(data);
// })


$(document).on("click", ".student-info", function (e) {
    $(".active").removeClass("active");
    $(this).addClass("active");
    e.preventDefault();
    $.ajax({
        method: "GET",
        url: "/admin/students",
        success: data => {
            console.log(data);
            $(".form-content").html("");
            console.log(data);
            var formContent = '<div class="col-sm-12 mx-4"><input type="text" placeholder="Name" class="form-control mb-2" id="name"><input type="text" placeholder="Registration Number" class="form-control mb-2" id="regno"><button class="btn btn-success form-control add-student">Add Student</button></div>'
            var pageContent = '<table class="table table-dark"><tr><th>Name</th> <th>Reg no</th><th>Delete Student</th></tr>'
            for (var i = 0; i < data.length; i++) {
                pageContent += '<tr><td>' + data[i].name + '</td><td>' + data[i].regno + '</td><td><button value=' + data[i].regno + ' class="btn btn-danger delete-student">Delete</button></td></tr>'
            }
            pageContent += '<div class="single-item"></div></table>'
            $(".form-content").html(formContent);
            $(".page-content").html(pageContent);
        }
    })
})
$(document).on("click", ".delete-student", function (e) {
    e.preventDefault();
    const regno = $(this).val();
    console.log(regno);
    $.ajax({
        method: "GET",
        url: "/admin/delete",
        data: {
            "regno": regno
        },
        success: data => {
            console.log(data);
            $(this).hide();
        }
    })
})

$(document).on("click", ".delete-food", function (e) {
    e.preventDefault();
    const id = $(this).val();
    console.log(id);
    $.ajax({
        method: "GET",
        url: "/admin/deleteFood",
        data: {
            "food_id": id
        },
        success: data => {
            console.log(data);
            $(this).hide();
        }
    })
})

$(document).on("click", ".menu", function (e) {
    e.preventDefault();
    $(".active").removeClass("active");
    $(this).addClass("active");
    var mess = $(this).attr('id');
    console.log(mess);
    $.ajax({
        method: "GET",
        url: "/admin/menu",
        data: {
            "mess": mess,
        },
        success: data => {
            console.log(data);
            $(".page-content").html("");
            var formContent = '<div class="col-sm-12 mx-4"><input type="text" id="food-item" placeholder="Food-item" class="form-control mb-2"><input type="text" id="cost" placeholder="Cost" class="form-control mb-2"><button class="btn btn-success form-control add-food">Add Food Item</button></div>'
            var pageContent = '<table class="table table-dark"><tr><th>Item</th><th>Cost</th><th>Delete Item</th></tr>'
            for (var i = 0; i < data.length; i++) {
                pageContent += '<tr><td>' + data[i].itemname + '</td><td>' + data[i].cost + '</td><td><button value=' + data[i].id + ' class="btn btn-danger delete-food">Delete</button></td></tr>'
            }
            pageContent += '</table>'
            console.log("adf");
            $(".form-content").html(formContent);
            $(".page-content").html(pageContent);
        },
        error: data => {
            console.log(data);
        }
    })
})

$(document).on("click", ".add-food", function () {
    const itemName = $('#food-item').val();
    const cost = $('#cost').val();
    $.ajax({
        method: "POST",
        url: "admin/addFood",
        data: {
            "itemName": itemName,
            "cost": cost
        },
        success: data => {
            console.log(data.id);
            if (data.message == "success") {
                console.log("added");
                var data = '<tr><td>' + itemName + '</td><td>' + cost + '</td><td><button value=' + itemName + ' class="btn btn-danger delete-student">Delete</button></td></tr>'
                $("table").append(data);
            }
        }
    })
})

$(document).on("click", ".add-student", function () {
    const name = $('#name').val();
    const regno = $('#regno').val();
    $.ajax({
        method: "POST",
        url: "admin/addStudent",
        data: {
            "name": name,
            "regno": regno
        },
        success: data => {
            if (data.message == "success") {
                console.log("added");
                var data = '<tr><td>' + name + '</td><td>' + regno + '</td><td><button value=' + regno + ' class="btn btn-danger delete-student">Delete</button></td></tr>'
                $("table").append(data);
            }
        }
    })
})

$(document).on("click", ".view-orders", function (e) {
    e.preventDefault();
    var messname = $(this).attr("id");
    $.ajax({
        method: "GET",
        url: "/admin/orders",
        success: data => {
            var pageContent = '';
            var i = 0;
            data = _.groupBy(data, 'id')
            Object.keys(data).forEach(key=>{
                var timeOfOrder;
                console.log(data[key][data[key].length-1])
                if(data[key][data[key].length-1].served=='false'){
                    pageContent += `<div class="card mb-auto mx-auto my-3 col-md-11"><div class="card-body"><h5 class="card-title">${data[key][0].id}</h5><p class="card-text"><span class="cost">`;
                    for(i=0;i<data[key].length;i++){
                        if(data[key][i].served == 'false'){
                            pageContent += `${data[key][i].itemname}: ${data[key][i].quantity} <br>`;
                            timeOfOrder = data[key][i].timeOfOrder;
                        }
                    }
                    pageContent += `<button value=${timeOfOrder} class="btn btn-success order-ready mt-3">Ready</button>`
                    pageContent += '</span></p></div></div>'             
                }
             });
            $(".page-content").html(pageContent);
            $(".form-content").html('');
        }
    })
})

function dateToISOLikeButLocal(date) {
    const offsetMs = date.getTimezoneOffset() * 60 * 1000;
    const msLocal = date.getTime() - offsetMs;
    const dateLocal = new Date(msLocal);
    const iso = dateLocal.toISOString();
    const isoLocal = iso.slice(0, 19);
    return isoLocal;
}

$(document).on("click", ".order-ready", function () {
    let time = $(this).val();
    time = new Date(time);
    time = dateToISOLikeButLocal(time);
    // time.toString();
    time = time.replace('T', ' ');
    time = time.replace('.000Z', '');

    console.log(time);
    $.ajax({
        method: "POST",
        url: "/admin/serve",
        data: {
            time: time
        },
        success: data => {
            $(this).hide();
        }
    })
})