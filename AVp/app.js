
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser');
	

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));
//body-parser 미들웨어 사용
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);




app.get('/keyboard', function(req,res){
	var menu ={
			'type':'buttons',
			'buttons':['안녕하세요 AV저장소 입니다. 아래 버튼으로 원하시는 정보를 확인하세요!!!','1','2','3']
	};
	  res.set({
	      'content-type': 'application/json'
	  }).send(JSON.stringify(menu));
	
});
app.post('/message',function (req, res) {

    const _obj = {
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };

    console.log(_obj.content)


    //안녕이라고 입력되었다면...
    if(_obj.content == '안녕하세요 AV저장소 입니다. 아래 버튼으로 원하시는 정보를 확인하세요!!!')
    {
      //"안녕"이라고 메시지 보내고
      //'누구니' '메롱' 버튼 보여줌
      let massage = {
          "message": {
              "text": '안녕하세요 AV저장소 입니다. 아래 버튼으로 원하시는 정보를 확인하세요!!!'
          },
          "keyboard": {
              "type": "buttons",
              'buttons':['안녕하세요 AV저장소 입니다. 아래 버튼으로 원하시는 정보를 확인하세요!!!','1','2','3']
          }
      };

      //      카톡으로 전송
      res.set({
          'content-type': 'application/json'
      }).send(JSON.stringify(massage));
    }
        
    else if(_obj.content == '1')
    {
      //"죽는다."이라고 메시지 보내고
      //'안녕' '누구니' 버튼 보여줌
      let massage = {
          "message": {
        	  "photo":{
            	    "url": "http://testslime.us-east-2.elasticbeanstalk.com/images/kirara.jpeg",
            	    "width": 720,
            	    "height": 630
            	  }
          },
          "keyboard": {
              "type": "buttons",
              'buttons':['안녕하세요 AV저장소 입니다. 아래 버튼으로 원하시는 정보를 확인하세요!!!','1','2','3']
          }
      };
      res.set({
          'content-type': 'application/json'
      }).send(JSON.stringify(massage));
    }
    else if(_obj.content == '2')
    {
      //"죽는다."이라고 메시지 보내고
      //'안녕' '누구니' 버튼 보여줌
      let massage = {
          "message": {
              "text": 'aaaaaa'
          },
          "keyboard": {
              "type": "buttons",
              'buttons':['안녕하세요 AV저장소 입니다. 아래 버튼으로 원하시는 정보를 확인하세요!!!','1','2','3']
          }
      };
      res.set({
          'content-type': 'application/json'
      }).send(JSON.stringify(massage));
    }
    else if(_obj.content == '3')
    {
      //"죽는다."이라고 메시지 보내고
      //'안녕' '누구니' 버튼 보여줌
      let massage = {
          "message": {
              "text": 'http://testslime.us-east-2.elasticbeanstalk.com/'
          },
          "keyboard": {
              "type": "buttons",
              'buttons':['안녕하세요 AV저장소 입니다. 아래 버튼으로 원하시는 정보를 확인하세요!!!','1','2','3']
          }
      };
      res.set({
          'content-type': 'application/json'
      }).send(JSON.stringify(massage));
    }
   
    //예외 처리...
    //하지만 현재는 버튼 방식이기에 이 루틴을 탈 수가 없다.
    else {
        let massage = {
            "message": {
                "text": '못 알아 먹었다...'
            },
            "keyboard": {
                "type": "buttons",
                'buttons':['안녕하세요 AV저장소 입니다. 아래 버튼으로 원하시는 정보를 확인하세요!!!','1','2','3']
            }
        };
        res.set({
            'content-type': 'application/json'
        }).send(JSON.stringify(massage));
    }
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
