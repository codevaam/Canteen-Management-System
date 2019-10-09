
$(document).on("click", ".student-info", function(e){
    e.preventDefault();
    $.ajax({
        method: "GET",
        url: "/admin/students",
        success: data => {
            $(".form-content").html("");
            console.log(data);
            var pageContent = '<table class="table table-dark"><tr><th>Name</th> <th>Reg no</th><th>Delete Student</th></tr>'
            for(var i=0;i<data.length;i++){
                pageContent+='<tr><td>' + data[i].name + '</td><td>'+ data[i].regno +'</td><td><button value='+ data[i].regno +' class="btn btn-danger delete-student">Delete</button></td></tr>'
            }
            pageContent+='</table>'
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

$(document).on("click", ".menu", function(e){
    e.preventDefault();
    console.log($(this));
    var mess = $(this).attr('id');
    console.log(mess);
    $.ajax({
        method: "GET",
        url: "/admin/menu",
        data: {
            "mess": mess,
        },
        success: data => {
            $(".page-content").html("");
            var formContent = '<div class="col-sm-12 mx-4"><input type="text" placeholder="Food-item" class="form-control mb-2"><input type="text" placeholder="Cost" class="form-control mb-2"><button class="btn btn-success form-control add-food">Add Food Item</button></div>'
            var pageContent = '<table class="table table-dark"><tr><th>Food id</th> <th>Item</th><th>Cost</th></tr>'
            for(var i=0;i<data.length;i++){
                pageContent+='<tr><tr><td>'+ data[i].food_id +'</td><td>'+ data[i].name +'</td><td>'+ data[i].cost +'</td><td><button value='+ data[i].food_id +' class="btn btn-danger">Delete</button></td></tr></tr>'
            }
        pageContent+='</table>'
        $(".form-content").html(formContent);
        $(".page-content").html(pageContent);
        }
    })
})

// $(document).on("click", ".add-food", function(){
//     const foodItem =
//     $.ajax
// })

