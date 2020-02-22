$(document).ready(function () {
    $("#displayScraps").on("click", () => {
        console.log("clicked start scraping");
        goScrap();
    });
    ;
    function goScrap() {
        scrapeNews(result => {
            getAllNews(scrap => {
                console.log("scrap", scrap);
                for (let i = 0; i < scrap.length; i++) {
                    $('.news').prepend
                        (`<row>
                        <div class="col-sm-12 mb-3">
                    <div class="card text-center">
                        <div class="card-header">
                            <h5 class="card-title" id="articleTitle">${scrap[i].title}</h5>
                        </div>
                    <div class="card-body">
                        
                        <a href="${scrap[i].link}" class="btn btn-lg" target="_blank" id="articleLink"><i class="fa fa-rocket"></i> Take me to the full article</a>
                        <br><br>
                        <div class="text-center">
                        <div class="input-group input-group-lg mb-3 col-sm-8 offset-2">
                        <input
                          type="text"
                          id="comment_${scrap[i]._id}"
                          class="form-control commentText"
                          placeholder="Text goes here "
                        />
                        <div class="input-group-append">
                          <button
                            class="btn postComment"
                            type="button"
                            data="${scrap[i]._id}"
                          ><i class="fa fa-comments"></i> Post a
                          comment</a>
                          </button>
                        </div>
                      </div>
                    </div>
                    </div>
                    <div class="commentArea" id="comments">
                    <h1>comment area</h1>
                </div>

                </div>
                </row>`);
                }
            });
        });
    }

    function scrapeNews(cb) {
        $.ajax({
            method: 'GET',
            url: '/api/scrape'
        }).then(result => {
            cb(result);
        });
    }

    function getAllNews(cb) {
        $.ajax({
            method: 'GET',
            url: '/api/all'
        }).then(result => {
            cb(result);
        });
    }

    function getByID(id, cb) {
        $.ajax({
            method: 'GET',
            url: `/api/find/${id}`
        }).then(result => {
            cb(result);
        });
    }

    $(document).on('click', function (e) {
        var id = e.target.getAttribute('data');
        var commentId = 'comment_' + id;
        console.log("commentid", commentId);
        e.preventDefault();
        let commentText = document.getElementById(commentId).value
        console.log("comment text", commentText);

        let data = id;
        console.log("data", data)
        $.ajax({
            method: "POST",
            url: `/api/comment/${data}`,
            data: { comments: { comment: commentText } }
        }).then((result) => {
            console.log("results after click", result);
            renderComments(result.comments);
        });
    });


    renderComments = (commentText) => {
        let allComments = commentText;
        console.log("all comments", allComments)
        $("#comments").empty();
        $('#comments').append(`
            <div class="card mt-2">
                <div class="card-body">
                   <h1>${allComments}</h1>
                </div>
            </div>`);

    }
});