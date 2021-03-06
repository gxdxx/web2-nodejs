// var db = require('./db');
// var template = require('./template.js');
// var qs = require('querystring');
// var sanitizeHtml = require('sanitize-html');
// var express = require('express');
// var app = express()

// exports.home = function(request, response) {   //exports : 여러 API를 제공 가능
//   var title = 'Welcome';
//   var description = 'Hello, Node.js';
//   var list = template.list(request.list);
//   var html = template.HTML(title, list,
//     `<h2>${title}</h2>
//     ${description}
//     <img src="/images/hello.jpg" style="width:800px; display:block; margin-top:20px;">
//     `,
//     `<a href="/topic/create">create</a>` ///create로 이동, home에서는 update 버튼 안나오게
//   );
//   response.send(html);
// };

// exports.page = function(request, response, topic1) {
//   var title = topic1[0].title; //topic은 배열에 담겨서 들어옴
//   var description = topic1[0].description;
//   var list = template.list(request.list);
//   var html = template.HTML(title, list,
//     `<h2>${sanitizeHtml(title)}</h2>
//     ${sanitizeHtml(description)}
//     <p>by ${sanitizeHtml(topic1[0].name)}</p>`,  //<p>태그=줄바꿈
//     `
//     <a href="/topic/create">create</a>
//     <a href="/topic/update/${request.params.pageId}">update</a>
//     <form action="/topic/delete_process" method="post">  <!--delete링크는 알려지면 안돼서 form으로 해야됨-->
//       <input type="hidden" name="id" value="${request.params.pageId}">
//       <input type="submit" value="delete">  <!--delete란 이름의 버튼 생성-->
//     </form>
//     `
//   );
//   response.send(html);
// };

// exports.create = function(request, response) {
//   db.query(`SELECT * FROM author`, function(error, authors) {
//     if(error) throw error;
//     var title = 'Create';
//     var list = template.list(request.list);
//     var html = template.HTML(title, list,
//       `<form action="/topic/create_process" method="post">  <!--form 아래 입력한 정보를 주소로 전송-->
//         <p>
//           <input type="text" name="title" placeholder="title">  <!--한줄 입력, placeholder는 미리 보이는 문자-->
//         </p>
//         <p>
//           <textarea name="description" placeholder="description"></textarea>  <!--여러줄 입력-->
//         </p>
//         <p>
//           ${template.authorSelect(authors)} <!--author을 선택할 수 있는 option value-->
//         </p>
//         <p>
//           <input type="submit"> <!--전송버튼-->
//         </p>
//       </form>`,
//       `<a href="/topic/create">create</a>`
//     );
//     response.send(html);
//   });
// };

// exports.create_process = function(request, response) {
//   var post = request.body;
//   db.query(`INSERT INTO topic (title, description, created, author_id) VALUES(?, ?, NOW(), ?);`, 
//       [post.title, post.description, post.author], 
//       function(error, result) {
//         if(error) throw error;
//         response.redirect(`/topic/${result.insertId}`);
//       }
//   );
//   /*
//   var body = '';
//   request.on('data', function(data) { //data를 한개씩 받다가 마지막에 'end'다음의 callback함수를 호출
//     body += data; //웹브라우저가 보낸 정보들을 저장
//   });
//   request.on('end', function() {
//     var post = qs.parse(body);  //post변수에 post정보를 저장(querystring)
//     db.query(`INSERT INTO topic (title, description, created, author_id) VALUES(?, ?, NOW(), ?);`, 
//         [post.title, post.description, post.author], 
//         function(error, result) {
//           if(error) throw error;
//           //response.writeHead(302, {Location: `/page/${result.insertId}`});  //리다이렉션(Location으로 이동)
//           //response.end();
//           response.redirect(`/page/${result.insertId}`);
//         }
//     );
//   });
//   */
// };

// exports.update = function(request, response) {
//   db.query(`SELECT * FROM topic WHERE id=?`, [request.params.pageId], function(error2, topic) {
//     if(error2) throw error;
//     db.query(`SELECT * FROM author`, function(error3, authors) {
//       if(error2) throw error2;
//       var list = template.list(request.list);
//       var html = template.HTML(sanitizeHtml(topic[0].title), list,
//         `
//         <form action="/topic/update_process" method="post">  <!--form 아래 입력한 정보를 주소로 전송-->
//           <input type ="hidden" name="id" value="${topic[0].id}">  <!--id값은 변경되지않음.-->
//           <p><input type="text" name="title" value="${sanitizeHtml(topic[0].title)}"></p>  <!--한줄 입력, value="${topic[0].title}가 title에 기본값으로 들어오게 함"-->
//           <p>
//             <textarea name="description">${sanitizeHtml(topic[0].description)}</textarea>  <!--여러줄 입력-->
//           </p>
//           <p>
//             ${template.authorSelect(authors, topic[0].author_id)}
//           </p>
//           <p>
//             <input type="submit"> <!--전송버튼-->
//           </p>
//         </form>
//         `,
//         `<a href="/topic/create">create</a>
//          <a href="/topic/update/${topic[0].id}">update</a>`
//       );
//       response.send(html);
//     });
//   });
// };

// exports.update_process = function(request, response) {
//   var post = request.body;
//   db.query(`UPDATE topic SET title=?, description=?, author_id=? WHERE id=?`,
//     [post.title, post.description, post.author, post.id],
//     function(error, result) {
//     if(error) throw error;
//     response.redirect(`/topic/${post.id}`);
//   });
// };

// exports.delete_process = function(request, response) {
//   var post = request.body;
//   db.query(`DELETE FROM topic WHERE id=?`, [post.id], function(error, result) {  //삭제할 때는 id만 전송됨
//     if(error) throw error;
//     response.redirect('/');
//   });
// };