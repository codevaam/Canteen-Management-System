
$(document).on("click", ".student-info", function(e){
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
            for(var i=0;i<data.length;i++){
                pageContent+='<tr><td>' + data[i].name + '</td><td>'+ data[i].regno +'</td><td><button value='+ data[i].regno +' class="btn btn-danger delete-student">Delete</button></td></tr>'
            }
            pageContent+='<div class="single-item"></div></table>'
            $(".form-content").html(formContent);
            $(".page-content").html(pageContent);
        }
    })
})
$(document).on("click",  ".delete-student", function(e){
    e.preventDefault();
    const regno = $(this).val();
    console.log(regno);
    $.ajax({
        method: "GET",
        url: "/admin/delete",
        data: {
            "regno": regno
        },
        success: data=>{
            console.log(data);
            $(this).hide();
        }
    })
})

$(document).on("click",  ".delete-food", function(e){
    e.preventDefault();
    const id = $(this).val();
    console.log(id);
    $.ajax({
        method: "GET",
        url: "/admin/deleteFood",
        data: {
            "food_id": id
        },
        success: data=>{
            console.log(data);
            $(this).hide();
        }
    })
})

$(document).on("click", ".menu", function(e){
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
            for(var i=0;i<data.length;i++){
                pageContent+='<tr><td>'+ data[i].itemname +'</td><td>'+ data[i].cost +'</td><td><button value='+ data[i].id +' class="btn btn-danger delete-food">Delete</button></td></tr>'
            }
            pageContent+='</table>'
            console.log("adf");
            $(".form-content").html(formContent);
            $(".page-content").html(pageContent);
        },
        error: data=>{
            console.log(data);
        }
    })
})

$(document).on("click", ".add-food", function(){
    const itemName = $('#food-item').val();
    const cost = $('#cost').val();
    $.ajax({
        method: "POST",
        url: "admin/addFood",
        data: {
            "itemName": itemName,
            "cost": cost
        },
        success: data=>{
            console.log(data.id);
            if(data.message=="success"){
                console.log("added");
                var data = '<tr><td>'+ itemName +'</td><td>'+ cost +'</td><td><button value='+ itemName +' class="btn btn-danger delete-student">Delete</button></td></tr>'
                $("table").append(data);
            }
        }
    })
})

$(document).on("click", ".add-student", function(){
    const name = $('#name').val();
    const regno = $('#regno').val();
    $.ajax({
        method: "POST",
        url: "admin/addStudent",
        data: {
            "name": name,
            "regno": regno
        },
        success: data=>{
            if(data.message=="success"){
                console.log("added");
                var data = '<tr><td>' + name + '</td><td>'+ regno +'</td><td><button value='+ regno +' class="btn btn-danger delete-student">Delete</button></td></tr>'
                $("table").append(data);
            }
        }
    })
})