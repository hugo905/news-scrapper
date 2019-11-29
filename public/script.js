
// on page load
$.getJSON("/articles", function (data) {

    data.forEach(function (element, index) {
        $(".article-append").append(
            `
        <div class="card indexcard" style="width: 18rem;">
        <img src="${element.image_link}" class="card-img-top" alt="...">
        <div class="card-body">
          <a href="${element.web_link}"><h5 class="card-text">${element.title}</h5></a>
          <a href="#" class="btn btn-primary save" data-id="${element._id}">Save</a>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter${index}" data-id="${element._id}"> Note </button>  
          </div>
        </div>
        <div class="modal fade" id="exampleModalCenter${index}" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">View and Add your Notes</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                        <div class="form-group">
                        <label for="exampleFormControlTextarea1">Example textarea</label>
                        <textarea class="form-control" id="noteContent" rows="4" data-id="${element._id}note">${element.note}</textarea>
                      </div>
                    </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary notesave" data-id="${element._id}">Save & Close</button>
                        </div>
                    </div>
                </div>
            </div>`
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

$(document).on("click", ".notesave", function () {

    var thisId = $(this).attr("data-id");
    var noteContent = $("#noteContent").val();
    console.log("id" + thisId);
    console.log(noteContent);

    // $.ajax({
    //     method: "POST",
    //     url: "/save/article",
    //     data: {
    //         id: thisId
    //     }
    // })
    //     .then(function (data) {
    //         // Log the response
    //         console.log(data);
    //         location.reload();
    //         // // Empty the notes section
    //         // $("#notes").empty();
    //     });
});



