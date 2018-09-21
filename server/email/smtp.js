Meteor.startup(function () {
  
  process.env.MAIL_URL = 'smtp://interceramic:interceramic123@smtp.sendgrid.net:587';
  //process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});