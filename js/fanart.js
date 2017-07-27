var request = require('request')
var fanart_api_key = 'b254ab0402f4a1c2bb8c99dd42d4faa0'

var basic_request = function (url_string, callback) {
  request({
    method: 'GET',
    url: 'http://webservice.fanart.tv/v3/' + url_string, //+ tv_id
    headers: {
      'api-key': fanart_api_key
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
  getMoviesFanart: function (id, callback) {
        var url_string = 'movies/' + id ;
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

    getTvFanart: function (id, callback) {
        var url_string = 'tv/' + id ;
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