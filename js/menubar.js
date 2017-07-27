const $ = require('jquery');
const {remote} = require('electron');

//write title of the window;
var title = document.getElementById('title').innerHTML;
document.getElementById('title_name').innerHTML = title;

var win = remote.getCurrentWindow();

$('#minimize').click(function() {
    win.minimize();
})

$('#maximize').click(function() {
    if (win.isMaximized()) {
        win.unmaximize();
    } else {
        win.maximize();
    }
})

$('#exit').click(function() {
    win.close();
})


