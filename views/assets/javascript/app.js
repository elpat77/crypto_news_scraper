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
                        (`<div class="col-sm-12 mb-3">
                    <div class="card text-center">
                        <div class="card-header">
                            <h5 class="card-title" id="articleTitle">${scrap[i].title}</h5>
                        </div>
                    <div class="card-body">
                        <a href="${scrap[i].link}" class="card-text" id="articleLink">${scrap[i].link}</a>
                        <br><br>
                        <a href="#" class="btn" id="${scrap[i]._id}">Comment</a>
                    </div>
                </div>`);
                }
            });
        });
    }

    $(document).on('click', '.commentBtn', function () {
        $('.commentForm').empty();
        $('.commentForm').append(`            
        <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input type="text" class="form-control" id="name" aria-describedby="emailHelp">
        </div>
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Comment</label>
            <textarea class="form-control" id="Textarea" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary submitComment" id = ${$(this).attr('id')}>Submit</button>
    </form>`);
    });

    $(document).on('click', '.submitComment', function (e) {
        e.preventDefault();
        let name = $('#name').val();
        let comment = $('#Textarea').val();


    });
    function scrapeNews(cb) {
        $.ajax({
            method: 'GET',
            url: '/api/scrape'
        }).then(result => {
            cb(result);
        });
    }
    // function getNews() {
    //     $.ajax({
    //         method: 'GET',
    //         url: '/api/all'
    //     }).then(result => {
    //         console.log('Got latest news');
    //     });
    // }

    function getAllNews(cb) {
        $.ajax({
            method: 'GET',
            url: '/api/all'
        }).then(result => {
            cb(result);
        });
    }
});