

var request = require('request')
var client_id = '56cd92ded7bb9705b3675b6c7563e18f75be189239aa48c41d65b3e9175c3602'
var client_secret = 'ee7f2125e80fcb2b45368ab4119e4d6348cf46de04ba5f37e78af5ead8f14517'
// request({
//   method: 'GET',
//   url: 'https://api-staging.trakt.tv/movies/popular',
//   headers: {
//     'Content-Type': 'application/json',
//     'trakt-api-version': '2',
//     'trakt-api-key': client_id
//   }
// }, function (error, response, body) {
//   console.log('Status:', response.statusCode);
//   console.log('Headers:', JSON.stringify(response.headers));
//   console.log('Response:', body);
//   var obj = JSON.parse(body);
//   var str = '';
//   obj.forEach(function (item, i, obj) {
//     str = str + '<br>' + item.title;
//   });
//   document.getElementById('text').innerHTML = str;
// });


var basic_request = function (url_string, callback) {
    request({
        method: 'GET',
        url: 'https://api-staging.trakt.tv/' + url_string,
        headers: {
            'Content-Type': 'application/json',
            'trakt-api-version': '2',
            'trakt-api-key': client_id
        }
    }, function (error, response, body) {
        console.log('Status:', response.statusCode);
        console.log('Headers:', JSON.stringify(response.headers));
        console.log('Response:', body);
        if (response.statusCode < 400) {
            callback(JSON.parse(body));
        } else {
            callback(response.statusCode);
        }
    });
}

module.exports = {

    // {
    //   "name": "Action",
    //   "slug": "action"
    // }
    getGenresList: function () {
        var url_string = 'genres/movies';
        basic_request(url_string, function (obj) {
            if (obj instanceof Object) {
                var str = '';
                obj.forEach(function (item, i, obj) {
                    str = str + '<br>' + item.name;
                });
                document.getElementById('text').innerHTML = str;
            } else if (obj instanceof Number) {
                document.getElementById('text').innerHTML = "Error: " + obj;
            } else {
                document.getElementById('text').innerHTML = "Undefied Error";
            }
        });
    },

    // {
    //   "name": "Action",
    //   "slug": "action"
    // }
    getGenresList: function () {
        var url_string = 'genres/shows';
        basic_request(url_string, function (obj) {
            if (obj instanceof Object) {
                var str = '';
                obj.forEach(function (item, i, obj) {
                    str = str + '<br>' + item.name;
                });
                document.getElementById('text').innerHTML = str;
            } else if (obj instanceof Number) {
                document.getElementById('text').innerHTML = "Error: " + obj;
            } else {
                document.getElementById('text').innerHTML = "Undefied Error";
            }
        });
    },

    //  {
    //     "watchers": 21,
    //     "movie": {
    //       "title": "TRON: Legacy",
    //       "year": 2010,
    //       "ids": {
    //         "trakt": 1,
    //         "slug": "tron-legacy-2010",
    //         "imdb": "tt1104001",
    //         "tmdb": 20526
    //       }
    //     }
    //   }
    // Add pagination, extended info, filters
    getMoviesTrendingsList: function () {
        var url_string = 'movies/trending';
        basic_request(url_string, function (obj) {
            if (obj instanceof Object) {
                var str = '';
                obj.forEach(function (item, i, obj) {
                    str = str + '<br>' + item.movie.title;
                });
                document.getElementById('text').innerHTML = str;
            } else if (obj instanceof Number) {
                document.getElementById('text').innerHTML = "Error: " + obj;
            } else {
                document.getElementById('text').innerHTML = "Undefied Error";
            }
        });
    },

    // {
    //   "title": "The Dark Knight",
    //   "year": 2008,
    //   "ids": {
    //     "trakt": 16,
    //     "slug": "the-dark-knight-2008",
    //     "imdb": "tt0468569",
    //     "tmdb": 155
    //   }
    // }
    // Add pagination, extended info, filters
    getMoviesPopularList: function (page, limit, callback) {
        var url_string = 'movies/popular' + '?page=' + page + '&limit=' + limit;
        basic_request(url_string, function (obj) {
            // if (obj instanceof Object) {
            //     var str = '';
            //     obj.forEach(function (item, i, obj) {
            //         str = str + '<br>' + item.title;
            //     });
            //     document.getElementById('text').innerHTML = str;
            // } else if (obj instanceof Number) {
            //     document.getElementById('text').innerHTML = "Error: " + obj;
            // } else {
            //     document.getElementById('text').innerHTML = "Undefied Error";
            // }
            callback(obj);
        });
    },

    // {
    //   "watcher_count": 66667,
    //   "play_count": 109736,
    //   "collected_count": 27584,
    //   "movie": {
    //     "title": "Frozen",
    //     "year": 2013,
    //     "ids": {
    //       "trakt": 77349,
    //       "slug": "frozen-2013",
    //       "imdb": "tt2294629",
    //       "tmdb": 109445
    //     }
    //   }
    // }
    // Add pagination, extended info, filters
    // Add period
    getMoviesPlayedList: function () {
        var url_string = 'movies/played';
        basic_request(url_string, function (obj) {
            if (obj instanceof Object) {
                var str = '';
                obj.forEach(function (item, i, obj) {
                    str = str + '<br>' + item.movie.title;
                });
                document.getElementById('text').innerHTML = str;
            } else if (obj instanceof Number) {
                document.getElementById('text').innerHTML = "Error: " + obj;
            } else {
                document.getElementById('text').innerHTML = "Undefied Error";
            }
        });
    },

    // {
    //   "watcher_count": 66667,
    //   "play_count": 109736,
    //   "collected_count": 27584,
    //   "movie": {
    //     "title": "Frozen",
    //     "year": 2013,
    //     "ids": {
    //       "trakt": 77349,
    //       "slug": "frozen-2013",
    //       "imdb": "tt2294629",
    //       "tmdb": 109445
    //     }
    //   }
    // }
    // Add pagination, extended info, filters
    // Add period
    getMoviesWatchedList: function () {
        var url_string = 'movies/watched';
        basic_request(url_string, function (obj) {
            if (obj instanceof Object) {
                var str = '';
                obj.forEach(function (item, i, obj) {
                    str = str + '<br>' + item.movie.title;
                });
                document.getElementById('text').innerHTML = str;
            } else if (obj instanceof Number) {
                document.getElementById('text').innerHTML = "Error: " + obj;
            } else {
                document.getElementById('text').innerHTML = "Undefied Error";
            }
        });
    },

    // {
    //   "watcher_count": 66667,
    //   "play_count": 109736,
    //   "collected_count": 27584,
    //   "movie": {
    //     "title": "Frozen",
    //     "year": 2013,
    //     "ids": {
    //       "trakt": 77349,
    //       "slug": "frozen-2013",
    //       "imdb": "tt2294629",
    //       "tmdb": 109445
    //     }
    //   }
    // }
    // Add pagination, extended info, filters
    // Add period
    getMoviesCollectedList: function () {
        var url_string = 'movies/collected';
        basic_request(url_string, function (obj) {
            if (obj instanceof Object) {
                var str = '';
                obj.forEach(function (item, i, obj) {
                    str = str + '<br>' + item.movie.title;
                });
                document.getElementById('text').innerHTML = str;
            } else if (obj instanceof Number) {
                document.getElementById('text').innerHTML = "Error: " + obj;
            } else {
                document.getElementById('text').innerHTML = "Undefied Error";
            }
        });
    },

    // {
    //   "list_count": 5362,
    //   "movie": {
    //     "title": "The Hunger Games: Mockingjay - Part 2",
    //     "year": 2015,
    //     "ids": {
    //       "trakt": 89543,
    //       "slug": "the-hunger-games-mockingjay-part-2-2015",
    //       "imdb": "tt1951266",
    //       "tmdb": 131634
    //     }
    //   }
    // }
    // Add pagination, extended info, filters

    getMoviesAnticipatedList: function () {
        var url_string = 'movies/anticipated';
        basic_request(url_string, function (obj) {
            if (obj instanceof Object) {
                var str = '';
                obj.forEach(function (item, i, obj) {
                    str = str + '<br>' + item.movie.title;
                });
                document.getElementById('text').innerHTML = str;
            } else if (obj instanceof Number) {
                document.getElementById('text').innerHTML = "Error: " + obj;
            } else {
                document.getElementById('text').innerHTML = "Undefied Error";
            }
        });
    },

    // {
    //   "revenue": 48464322,
    //   "movie": {
    //     "title": "Hotel Transylvania 2",
    //     "year": 2015,
    //     "ids": {
    //       "trakt": 103449,
    //       "slug": "hotel-transylvania-2-2015",
    //       "imdb": "tt2510894",
    //       "tmdb": 159824
    //     }
    //   }
    // }
    // Add extended info
    getMoviesBoxOffice10TopList: function () {
        var url_string = 'movies/boxoffice';
        basic_request(url_string, function (obj) {
            if (obj instanceof Object) {
                var str = '';
                obj.forEach(function (item, i, obj) {
                    str = str + '<br>' + item.movie.title;
                });
                document.getElementById('text').innerHTML = str;
            } else if (obj instanceof Number) {
                document.getElementById('text').innerHTML = "Error: " + obj;
            } else {
                document.getElementById('text').innerHTML = "Undefied Error";
            }
        });
    },

    // {
    //   "updated_at": "2014-09-22T21:56:03.000Z",
    //   "movie": {
    //     "title": "TRON: Legacy",
    //     "year": 2010,
    //     "ids": {
    //       "trakt": 1,
    //       "slug": "tron-legacy-2010",
    //       "imdb": "tt1104001",
    //       "tmdb": 20526
    //     }
    //   }
    // }
    // Add pagination, extended info 
    getMoviesUpdatesList: function (date) {
        var url_string = 'movies/updates/' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        basic_request(url_string, function (obj) {
            if (obj instanceof Object) {
                var str = '';
                obj.forEach(function (item, i, obj) {
                    str = str + '<br>' + item.movie.title;
                });
                document.getElementById('text').innerHTML = str;
            } else if (obj instanceof Number) {
                document.getElementById('text').innerHTML = "Error: " + obj;
            } else {
                document.getElementById('text').innerHTML = "Undefied Error";
            }
        });
    },

    // {
    //   "title": "TRON: Legacy",
    //   "year": 2010,
    //   "ids": {
    //     "trakt": 1,
    //     "slug": "tron-legacy-2010",
    //     "imdb": "tt1104001",
    //     "tmdb": 20526
    //   }
    // }
    // Add extended info
    getMovie: function (id) {
        var url_string = 'movies/' + id;
        basic_request(url_string, function (obj) {
            if (obj instanceof Object) {
                document.getElementById('text').innerHTML = obj.title;
            } else if (obj instanceof Number) {
                document.getElementById('text').innerHTML = "Error: " + obj;
            } else {
                document.getElementById('text').innerHTML = "Undefied Error";
            }
        });
    },

    // {
    //   "title": "Batman 1 - Batman Begins",
    //   "country": "ca"
    // }
    getMovieTitleAliases: function (id) {
        var url_string = 'movies/' + id + '/aliases';
        basic_request(url_string, function (obj) {
            if (obj instanceof Object) {
                var str = '';
                obj.forEach(function (item, i, obj) {
                    str = str + '<br>' + item.title;
                });
                document.getElementById('text').innerHTML = str;
            } else if (obj instanceof Number) {
                document.getElementById('text').innerHTML = "Error: " + obj;
            } else {
                document.getElementById('text').innerHTML = "Undefied Error";
            }
        });
    },

    //  {
    //     "country": "us",
    //     "certification": "PG",
    //     "release_date": "2010-12-16",
    //     "release_type": "theatrical",
    //     "note": null
    //   },
    getMovieReleases: function (id, country) {
        var url_string = 'movies/' + id + '/releases' + ((country != null) ? ('/' + country) : '');
        basic_request(url_string, function (obj) {
            if (obj instanceof Object) {
                var str = '';
                obj.forEach(function (item, i, obj) {
                    str = str + '<br>' + item.country;
                });
                document.getElementById('text').innerHTML = str;
            } else if (obj instanceof Number) {
                document.getElementById('text').innerHTML = "Error: " + obj;
            } else {
                document.getElementById('text').innerHTML = "Undefied Error";
            }
        });
    },

    // {
    //   "title": "Batman Begins",
    //   "overview": "Driven by tragedy, billionaire Bruce Wayne dedicates his life to uncovering and defeating the corruption that plagues his home, Gotham City.  Unable to work within the system, he instead creates a new identity, a symbol of fear for the criminal underworld - The Batman.",
    //   "tagline": "Evil fears the knight.",
    //   "language": "en"
    // }
    getMovieTranslations: function (id, language) {
        var url_string = 'movies/' + id + '/translations' + ((language != null) ? ('/' + language) : '');
        basic_request(url_string, function (obj) {
            if (obj instanceof Object) {
                var str = '';
                obj.forEach(function (item, i, obj) {
                    str = str + '<br>' + item.language;
                });
                document.getElementById('text').innerHTML = str;
            } else if (obj instanceof Number) {
                document.getElementById('text').innerHTML = "Error: " + obj;
            } else {
                document.getElementById('text').innerHTML = "Undefied Error";
            }
        });
    },

    // {
    //   "id": 8,
    //   "parent_id": 0,
    //   "created_at": "2011-03-25T22:35:17.000Z",
    //   "updated_at": "2011-03-25T22:35:17.000Z",
    //   "comment": "Great movie!",
    //   "spoiler": false,
    //   "review": false,
    //   "replies": 1,
    //   "likes": 0,
    //   "user_rating": 8,
    //   "user": {
    //     "username": "sean",
    //     "private": false,
    //     "name": "Sean Rudford",
    //     "vip": true,
    //     "vip_ep": false,
    //     "ids": {
    //       "slug": "sean"
    //     }
    //   }
    // }
    // sort - newets (default), oldest, likes, replies.
    // Add pagination
    getMovieComments: function (id, sort) {
        var url_string = 'movies/' + id + '/comments' + ((sort != null) ? ('/' + sort) : '');
        basic_request(url_string, function (obj) {
            if (obj instanceof Object) {
                var str = '';
                obj.forEach(function (item, i, obj) {
                    str = str + '<br>' + item.comment;
                });
                document.getElementById('text').innerHTML = str;
            } else if (obj instanceof Number) {
                document.getElementById('text').innerHTML = "Error: " + obj;
            } else {
                document.getElementById('text').innerHTML = "Undefied Error";
            }
        });
    },

    // {
    //   "name": "Incredible Thoughts",
    //   "description": "How could my brain conceive them?",
    //   "privacy": "public",
    //   "display_numbers": true,
    //   "allow_comments": true,
    //   "sort_by": "rank",
    //   "sort_how": "asc",
    //   "created_at": "2014-10-11T17:00:54.000Z",
    //   "updated_at": "2014-10-11T17:00:54.000Z",
    //   "item_count": 50,
    //   "comment_count": 10,
    //   "likes": 99,
    //   "ids": {
    //     "trakt": 1337,
    //     "slug": "incredible-thoughts"
    //   }
    // }
    // type - all, personal (default), official, watchlists. 
    // sort - popular (default), likes, comments, items, added, updated.
    // Add pagination
    getMovieLists: function (id, type, sort) {
        var url_string = 'movies/' + id + '/lists' + ((type != null) ? ('/' + type) : '') + ((sort != null) ? ('/' + sort) : '');
        basic_request(url_string, function (obj) {
            if (obj instanceof Object) {
                var str = '';
                obj.forEach(function (item, i, obj) {
                    str = str + '<br>' + item.name;
                });
                document.getElementById('text').innerHTML = str;
            } else if (obj instanceof Number) {
                document.getElementById('text').innerHTML = "Error: " + obj;
            } else {
                document.getElementById('text').innerHTML = "Undefied Error";
            }
        });
    },

    // "cast": [
    // {
    //   "character": "Sam Flynn",
    //   "person": {
    //     "name": "Garrett Hedlund",
    //     "ids": {
    //       "trakt": 1,
    //       "slug": "garrett-hedlund",
    //       "imdb": "nm1330560",
    //       "tmdb": 9828,
    //       "tvrage": null
    //     }
    //   }
    // }
    // "crew": {
    // "production": [
    //   {
    //     "job": "Casting",
    //     "person": {
    //       "name": "Heike Brandstatter",
    //       "ids": {
    //         "trakt": 19,
    //         "slug": "heike-brandstatter",
    //         "imdb": "nm0104840",
    //         "tmdb": 5362,
    //         "tvrage": null
    //       }
    //     }
    //   }
    // Returns all cast and crew for a movie. 
    // Each cast member will have a character and a standard person object.
    // The crew object will be broken up into production, 
    // art, crew, costume & make-up, directing, writing, sound, and camera 
    // (if there are people for those crew positions). 
    // Each of those members will have a job and a standard person object.
    //
    // Add extended info
    getMoviePeople: function (id) {
        var url_string = 'movies/' + id + '/people';
        basic_request(url_string, function (obj) {
            if (obj instanceof Object) {
                // var str = '';
                // obj.forEach(function (item, i, obj) {
                //   str = str + '<br>' + item.person.name;
                // });
                document.getElementById('text').innerHTML = obj.cast[0].person.name;
            } else if (obj instanceof Number) {
                document.getElementById('text').innerHTML = "Error: " + obj;
            } else {
                document.getElementById('text').innerHTML = "Undefied Error";
            }
        });
    },

    // "rating": 7.33778,
    // "votes": 7866,
    // "distribution": {
    //   "1": 298,
    //   "2": 46,
    //   "3": 87,
    //   "4": 178,
    //   "5": 446,
    //   "6": 1167,
    //   "7": 1855,
    //   "8": 1543,
    //   "9": 662,
    //   "10": 1583
    // }
    getMovieRatings: function (id) {
        var url_string = 'movies/' + id + '/ratings';
        basic_request(url_string, function (obj) {
            if (obj instanceof Object) {
                // var str = '';
                // obj.forEach(function (item, i, obj) {
                //   str = str + '<br>' + item.person.name;
                // });
                document.getElementById('text').innerHTML = obj.rating;
            } else if (obj instanceof Number) {
                document.getElementById('text').innerHTML = "Error: " + obj;
            } else {
                document.getElementById('text').innerHTML = "Undefied Error";
            }
        });
    },

    // {
    //   "title": "Jurassic Park",
    //   "year": 1993,
    //   "ids": {
    //     "trakt": 393,
    //     "slug": "jurassic-park-1993",
    //     "imdb": "tt0107290",
    //     "tmdb": 329
    //   }
    // }
    // Add pagination, extended info
    getMovieRelated: function (id) {
        var url_string = 'movies/' + id + '/related';
        basic_request(url_string, function (obj) {
            if (obj instanceof Object) {
                var str = '';
                obj.forEach(function (item, i, obj) {
                    str = str + '<br>' + item.title;
                });
                document.getElementById('text').innerHTML = str;
            } else if (obj instanceof Number) {
                document.getElementById('text').innerHTML = "Error: " + obj;
            } else {
                document.getElementById('text').innerHTML = "Undefied Error";
            }
        });
    },

    // {
    //   "watchers": 39204,
    //   "plays": 51033,
    //   "collectors": 27379,
    //   "comments": 36,
    //   "lists": 4561,
    //   "votes": 7866
    // }
    getMovieStats: function (id) {
        var url_string = 'movies/' + id + '/stats';
        basic_request(url_string, function (obj) {
            if (obj instanceof Object) {
                // var str = '';
                // obj.forEach(function (item, i, obj) {
                //   str = str + '<br>' + item.watchers;
                // });
                document.getElementById('text').innerHTML = obj.watchers;
            } else if (obj instanceof Number) {
                document.getElementById('text').innerHTML = "Error: " + obj;
            } else {
                document.getElementById('text').innerHTML = "Undefied Error";
            }
        });
    },

    // {
    //   "username": "justin",
    //   "private": false,
    //   "name": "Justin Nemeth",
    //   "vip": true,
    //   "vip_ep": false,
    //   "ids": {
    //     "slug": "justin"
    //   }
    // }
    // Add extended info
    getMovieWatching: function (id) {
        var url_string = 'movies/' + id + '/watching';
        basic_request(url_string, function (obj) {
            if (obj instanceof Object) {
                var str = '';
                obj.forEach(function (item, i, obj) {
                    str = str + '<br>' + item.username;
                });
                document.getElementById('text').innerHTML = str;
            } else if (obj instanceof Number) {
                document.getElementById('text').innerHTML = "Error: " + obj;
            } else {
                document.getElementById('text').innerHTML = "Undefied Error";
            }
        });
    },

    //   {
    //     "name": "A&E"
    //   }
    getNetworksList: function () {
        var url_string = 'networks';
        basic_request(url_string, function (obj) {
            if (obj instanceof Object) {
                var str = '';
                obj.forEach(function (item, i, obj) {
                    str = str + '<br>' + item.name;
                });
                document.getElementById('text').innerHTML = str;
            } else if (obj instanceof Number) {
                document.getElementById('text').innerHTML = "Error: " + obj;
            } else {
                document.getElementById('text').innerHTML = "Undefied Error";
            }
        });
    }
}