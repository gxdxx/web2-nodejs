var db = require('../lib/db.js');
var template = require('../lib/template.js');
var express = require('express');
var router = express.Router();

//app.get('/', (req, res) => res.send('Hello World!'))
router.get('/', function(request, response) { //routing
    var title = 'Login';
    var list = template.list(request.list);
    var html = template.HTML(title, list,
        `
        <form action="/login/login_process" method="post">
            <p><input type="text" name="email" placeholder="email"></p>
            <p><input type="password" name="password" placeholder="password"></p>
            <p><input type="submit"></p>
        </form>
        `,
        `<a href="/topic/create">create</a>`, ///create로 이동, home에서는 update 버튼 안나오게
    );
    response.send(html);
});

router.post('/login_process', function(request, response, next) { //topic.create에서 post방식으로 전송됨
    var post = request.body;
    if(post.email === 'nkd0310@naver.com' && post.password === '000000') {
        response.cookie('email', `${post.email}`);
        response.cookie('password', `${post.password}`);
        response.cookie('nickname', 'gidon');
        response.redirect('/');
    } else {
        response.send('Who?');
    }
});

module.exports = router;