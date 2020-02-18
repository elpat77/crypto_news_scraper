$(document).ready(function () {
    $("#displayScraps").on("click", () => {
        console.log("clicked");
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
                        
                        <a href="${scrap[i].link}" class="btn"  target="_blank"  id="articleLink"><i class="fa fa-rocket"></i> Take me to the full article</a>
                        <br><br>
                        <div class="text-center">
                    <a href="" class="btn btn-rounded mb-4" data-toggle="modal" data-target="#modalContactForm" id="${scrap[i]._id}"><i class="fa fa-comments"></i> Make a
                    comment</a>
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

    function makeComment(id, userName, userEmail, userComment, cb) {
        $.ajax({
            method: 'POST',
            url: `/api/comment/${id}`,
            data: { userName: userName, userEmail: userEmail, userComment: userComment }
        }).then(result => {
            cb(result);
        })
    }


    $("#sendComment").on('click', function () {
        let userName = $('#userName').val();
        let userEmail = $('#userEmail').val();
        let userComment = $('#userComment').val();
        let scrapId = $(this).attr('id');
        $('#userName').val('');
        $('userEmail').val('');
        $('#userComment').val('');
        console.log("clicked");
        console.log(userName);
        console.log(userEmail);
        console.log(userComment);
        console.log(scrapId)
        getByID(scrapId, result => {
            makeComment(scrapId, userName, userEmail, userComment, commentResult => {
                renderComments(scrapId);
            });
        });
    });

    function renderComments(scrapId) {
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