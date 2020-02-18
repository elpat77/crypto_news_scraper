$(document).ready(function () {
    $("#displayScraps").on("click", () => {
        console.log("clicked start scraping");
        goScrap();
    });
    ;
    function goScrap() {
        scrapeNews(result => {
            getAllNews(scrap => {
                console.log(scrap);
                for (let i = 0; i < scrap.length; i++) {
                    $('.news').prepend
                        (`<row>
                        <div class="col-sm-12 mb-3">
                    <div class="card text-center">
                        <div class="card-header">
                            <h5 class="card-title" id="articleTitle">${scrap[i].title}</h5>
                        </div>
                    <div class="card-body">
                        
                        <a href="${scrap[i].link}" class="btn btn-lg"  target="_blank"  id="articleLink"><i class="fa fa-rocket"></i> Take me to the full article</a>
                        <br><br>
                        <div class="text-center">
                        <div class="input-group input-group-lg mb-3 col-sm-8 offset-2">
                        <input
                          type="text"
                          
                          class="form-control commentText"
                          placeholder="Text goes here"
                        />
                        <div class="input-group-append">
                          <button
                            class="btn postComment"
                            type="button"
                            id="${scrap[i]._id}"
                          ><i class="fa fa-comments"></i> Post a
                          comment</a>
                          </button>
                        </div>
                      </div>
                    </div>
                    </div>
                    <div class="commentArea">
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

    $(document).on('click', '.postComment', function (e) {
        e.preventDefault();
        // $(".postComment").on('click', function () {
        let commentText = $('.commentText').val();
        $('.commentText').val('');
        console.log("clicked post comment");
        console.log(commentText);
        $.ajax({
            method: "POST",
            url: "/api/new",
            data: { text: commentText }
        }).then(() => {
            console.log(data);
            // renderComments();
        });
    });

    renderComments = (scrapId) => {
        getByID(scrapId, result => {
            let comment = result[0].comment;
            console.log("newcomment", comment[i].userName)
            $('.commentArea').empty();
            for (let i = 0; i < comment.length; i++) {
                $('.commentArea').prepend(`
            <div class="card mt-2">
                <div class="card-body">
                    <h5 class="card-title">${comment[i].userName}</h5>
                    <p class="card-text">${comment[i].userComment}</p>
                    <button class="btn btn-danger deleteBtn" id="${comment[i]._id}" data="${scrapId}">Delete</button>
                </div>
            </div>`);
            }
        });
    }



});