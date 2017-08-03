var request = require('request')
var themoviedb_api_key = '5e2ec4b86b6c862ad1a8b561780eabfd'

var basic_request = function (url_string, callback) {
    request({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/' + url_string, //+ tv_id
        qs: {
            'api_key': themoviedb_api_key
        },
    }, function (error, response, body) {
        console.log('Status:', response.statusCode);
        //console.log('Headers:', JSON.stringify(response.headers));
        //console.log('Response:', body);
        if (response.statusCode < 400) {
            callback(JSON.parse(body));
        } else {
            callback(response.statusCode);
        }
    });
}

module.exports = {
    getMovieImages: function (id, callback) {
        var url_string = 'movie/' + id + '/images';
        //console.log(url_string);
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
    }
}