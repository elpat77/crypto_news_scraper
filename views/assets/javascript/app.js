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
            url: `/api/getID/${id}`,

        }).then(result => {
            cb(result);
        });
    }

    function makeComment(id, userName, userEmail, userComment, cb) {
        $.ajax({
            method: 'POST',
            url: `/api/comment/${id}`,
            data: { id: id }
        }).then(result => {
            cb(result);
        })
    }

    $(document).on('click', '.sendComment', function (e) {
        e.preventDefault();
        let name = $('#userName').val();
        let email = $('#userEmail').val();
        let comment = $('#userComment').val();
    });

});