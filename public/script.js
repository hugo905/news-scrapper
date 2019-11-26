

$.getJSON("/articles", function (data) {

    data.forEach(function (element) {
        $(".article-append").append(
            `
        <div class="card indexcard" style="width: 18rem;">
        <img src="${element.image_link}" class="card-img-top" alt="...">
        <div class="card-body">
          <a href="${element.web_link}"><h5 class="card-text">${element.title}</h5></a>
          <a href="#" class="btn btn-primary save" data-id="${element._id}">Save</a>
        </div>
        </div>
        `
        )
    })
});


$.getJSON("/article-saved", function (data) {

    data.forEach(function (element) {
        $(".article-saved").append(
            `
        <div class="card indexcard" style="width: 18rem;">
        <img src="${element.image_link}" class="card-img-top" alt="...">
        <div class="card-body">
          <a href="${element.web_link}"><h5 class="card-text">${element.title}</h5></a>
          <a href="#" class="btn btn-primary save" data-id="${element._id}">Save</a>
        </div>
        </div>
        `
        )
    })
});

$(document).on("click", ".save", function () {

    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/save/article",
        data: {
            id: thisId
        }
    })
        .then(function (data) {
            // Log the response
            console.log(data);
            location.reload();
            // // Empty the notes section
            // $("#notes").empty();
        });
});