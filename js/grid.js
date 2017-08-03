const $ = require('jquery');
var trakt = require('./trakt.js');
var fanart = require('./fanart.js');
var themoviedb = require('./themoviedb.js');
var page = 1;
var page_size = 32;

var isEqual = function (item) {
    return item == null;
}

$('#items_list').on('click', '.box', function () {
    console.log(this.id);
})

$('#main_area').scroll(function () {
    if ($('#main_area').scrollTop() + $(window).height() - 30 == $('#items_list').height()) {
        // console.log("bottom");
        var buffer_array = [];
        trakt.getMoviesPopularList(page, page_size, function (obj) {
            page = page + 1;
            if (obj instanceof Object) {
                var str = '';
                obj.forEach(function (item, i, obj) {
                    fanart.getMoviesFanart(item.ids.imdb, function (fanart) {
                        if (fanart.movieposter === undefined) {
                            buffer_array[i] = "<div id='" + item.ids.imdb + "' class='box-undefined'></div>";
                            console.log(fanart);
                            return;
                        } else {
                            //buffer_array[i] = "<div id='" + item.ids.imdb + "' class='box-undefined'></div>";
                            poster_url = fanart.movieposter[0].url;
                            poster_url = poster_url.replace("/fanart", "/preview");
                            buffer_array[i] = "<img id='" + item.ids.imdb + "' class='box' src='" + poster_url + "'></img>";
                        }

                        if (buffer_array.length === obj.length && buffer_array.findIndex(isEqual) == -1) {
                            dataRecieved = true;
                            var title = document.getElementById('items_list').innerHTML;

                            //console.log(title);

                            for (var j = 0; j < buffer_array.length; j++) {
                                title = title + buffer_array[j];
                            }

                            document.getElementById('items_list').innerHTML = title;
                            $('#main_area').animate({ "scrollTop": $('#main_area').scrollTop() + 100 });

                            let images = document.getElementsByTagName("img");
                            for (let image of images) {
                                image.addEventListener("load", fadeImg);
                                image.style.opacity = "0";
                            }

                            function fadeImg() {
                                this.style.opacity = "1";
                            }
                        }
                    })
                });
            } else {
                console.log("error: " + obj)
            }
        });
    }
});

trakt.getMoviesPopularList(page, page_size, function (obj) {
    page = page + 1;
    if (obj instanceof Object) {
        var str = '';
        var buffer_array = [];
        obj.forEach(function (item, i, obj) {
            fanart.getMoviesFanart(item.ids.imdb, function (fanart) {

                if (fanart.movieposter === undefined) {
                    buffer_array[i] = "<div id='" + item.ids.imdb + "' class='box-undefined'></div>";
                    console.log(fanart);
                    return;
                } else {
                    //buffer_array[i] = "<div id='" + item.ids.imdb + "' class='box-undefined'></div>";
                    poster_url = fanart.movieposter[0].url;
                    poster_url = poster_url.replace("/fanart", "/preview");
                    buffer_array[i] = "<img id='" + item.ids.imdb + "' class='box' src='" + poster_url + "'></img>";
                }

                if (buffer_array.length === obj.length && buffer_array.findIndex(isEqual) == -1) {
                    dataRecieved = true;

                    var title = document.getElementById('items_list').innerHTML;

                    for (var j = 0; j < buffer_array.length; j++) {
                        title = title + buffer_array[j];
                    }

                    document.getElementById('items_list').innerHTML = title;

                    let images = document.getElementsByTagName("img");
                    for (let image of images) {
                        image.addEventListener("load", fadeImg);
                        image.style.opacity = "0";
                    }

                    function fadeImg() {
                        this.style.opacity = "1";
                    }
                }
            })
        });
    } else {
        console.log("error: " + obj)
    }
});

