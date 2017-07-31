const $ = require('jquery');
var trakt = require('./trakt.js');
var fanart = require('./fanart.js');
var items_array = [];
var page = 1;
var page_size = 32;

$('#items_list').on('click', '.box', function () {
    console.log(this.id);
})

$('#main_area').scroll(function () {
    if ($('#main_area').scrollTop() + $(window).height() - 30 == $('#items_list').height()) {
        // console.log("bottom");
        
        trakt.getMoviesPopularList(page, page_size, function (obj) {
            if (obj instanceof Object) {
                var str = '';

                obj.forEach(function (item, i, obj) {
                    fanart.getMoviesFanart(item.ids.imdb, function (fanart) {
                        if (fanart.movieposter === undefined) {
                            items_array[(page_size * (page - 1)) + i] = "<div id='" + item.ids.imdb + "' class='box-undefined'></div>";
                            console.log(fanart);
                            return;
                        } else {
                            items_array[(page_size * (page - 1)) + i] = "<img id='" + item.ids.imdb + "' class='box' src='" + fanart.movieposter[0].url + "'></img>";
                        }
                        
                        if (items_array.length === (obj.length + (page_size * (page - 1))) && items_array.findIndex(isEqual) == -1) {
                            dataRecieved = true;
                            var title = document.getElementById('items_list').innerHTML;
                            //console.log(title);
                            for (var j = (page_size * (page - 1)); j < items_array.length; j++) {
                                title = title + items_array[j];
                            }
                            
                            document.getElementById('items_list').innerHTML = title;

                            page = page + 1;

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

var isEqual = function (item) {
    return item == null;
}

trakt.getMoviesPopularList(page, page_size, function (obj) {
    if (obj instanceof Object) {
        var str = '';

        obj.forEach(function (item, i, obj) {
            fanart.getMoviesFanart(item.ids.imdb, function (fanart) {
                items_array[i] = "<img id='" + item.ids.imdb + "' class='box' src='" + fanart.movieposter[0].url + "'></img>";

                if (items_array.length === obj.length && items_array.findIndex(isEqual) == -1) {
                    dataRecieved = true;
                    var title = "";
                    for (var j = 0; j < items_array.length; j++) {
                        title = title + items_array[j];
                    }
                    document.getElementById('items_list').innerHTML = title;

                    page = page + 1;

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

