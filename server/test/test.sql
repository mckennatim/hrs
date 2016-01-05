mysql -u root forecast

alter table locations add id INTEGER AUTO_INCREMENT PRIMARY KEY;




node-mysql

var post ={location: '12 Parley Vale, Jamaica Plain, MA 02130'}
connection.query('INSERT INTO `locations` SET ?', post, function(err, result) {
  if (err) throw err;
  console.log(result)
  done();
});

