var trakt = require('./trakt.js');
var fanart = require('./fanart.js');
var items_array = [];
// fanart.getMoviesFanart(10195, function (obj) {
//     console.log(obj);
// })

var isEqual = function (item) {
    return item == null;
}

trakt.getMoviesPopularList(1, 98, function (obj) {
    window.logf = null;
    if (obj instanceof Object) {
        var str = '';

        obj.forEach(function (item, i, obj) {
            fanart.getMoviesFanart(item.ids.imdb, function (fanart) {
                // var title = document.getElementById('items_list').innerHTML;
                // title = title + "<img class='box' src='" + fanart.movieposter[0].url + "'></img>";
                // document.getElementById('items_list').innerHTML = title;
                items_array[i] = "<img class='box' src='" + fanart.movieposter[0].url + "'></img>";
                if (items_array.length === obj.length && items_array.findIndex(isEqual)) {
                    console.log(items_array);
                    var title = "";
                    for (var j = 0; j < items_array.length; j++) {
                        title = title + items_array[j];
                        console.log(title);
                    }
                    document.getElementById('items_list').innerHTML = title;
                }
            })
            //str = str + "<img class='box' src='http://assets.fanart.tv/fanart/movies/120/movieposter/the-lord-of-the-rings-the-fellowship-of-the-ring-528aa45a8633a.jpg'></img>"//str + '<br>' + item.title;
        });
        //document.getElementById('items_list').innerHTML = str;
        //console.log(str);
    } else {
        console.log("error: " + obj)
    }
});