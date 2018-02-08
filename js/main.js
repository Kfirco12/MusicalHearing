var main = function()
{
var screen_height = screen.height;

if(screen.height < 800)
$('body').css('zoom',0.8);
else if(screen.height < 1000)
$('body').css('zoom',0.9);
else {
  $('body').css('zoom',1.3);
}

//Initialize main body
var configMap =
{
      inputSection :

    //  --header------------
      '<header> </header>'+

  //    --navigator bar------------
        '<nav>'+
          '<ul>'+
            '<li><a href="main.html" id = "home">Home</a></li>'+
            '<li><a href="#" id = "interval_js">Interval Training</a></li>'+
            '<li><a href="#" id = "notes_js">Notes Training</a></li>'+
            '<li><a href="#" id = "about_js">About Us</a></li>'+
          '</ul>'+
        '</nav>'+

  //      --aside------------
        '<aside class = "left">'+

        '</aside>'+

  //    --main------------
        '<main>'+
        "<div id= 'snackbar'><div class= 'Instructions'></div><div class = 'user'></div></div>"+
      '</canvas>'+
          '<div class="intro">'+
      '</div>'+
      '<div class="piano">'+
      '<ul class="set">'+
        '<button class="white c"></button>'+
        '<button class="black cs"></button>'+
        '<button class="white d"></button>'+
        '<button class="black ds"></button>'+
        '<button class="white e"></button>'+
        '<button class="white f"></button>'+
        '<button class="black fs"></button>'+
        '<button class="white g"></button>'+
        '<button class="black gs"></button>'+
        '<button class="white a"></button>'+
        '<button class="black as"></button>'+
        '<button class="white b"></button>'+
        '<button class="white cc"></button>'+
      '</ul>'+
      '</div>'+
      '</main>'+

      '<aside class = "right">'+

      '</aside>'+

//      --footer------------
      '<footer>'+
        'Kfir & Ben, Copyright Holder All Rights Reserved.<br/>'+
        '01/04/2017.'+
      '</footer>'
};

//=============================================

var stateMap = {$container : null };

//=============================================

var initModule = function($container)
{
  stateMap.$container = $container;
  var introString =   '</p>'+
    '<h4>About the site:</h4>'+
    'This website was designed to teach people the basics of music theory in an interactive way.</br>'+
    'With this website, you can improve your notes recognition and your musical hearing.'+
    '</p>'+
    'The site is divided to sections, so you can improve all of your skills.</br>'+
    'In the navigator bar you can find all the available practices, and works step by step until you will become an expert!!'+
    '</p>'+
    'You can start practicing right now, or enjoy playing piano beforehand :)'+
    '</br>'+
    'Good luck!!';
  $("body").html(configMap.inputSection);
  $(".intro").html(introString);

  $("#home").click(clickListener);
  $("#notes_js").click(clickListener);
  $("#interval_js").click(clickListener);
  $("#about_js").click(clickListener);

  $('.set button').click(function(){parseAndSend($(event.target).attr('class'), false, false)});
};

var parseAndSend = function(word, isCompare, isDraw)
{
  var color = word.substr(0, 5);
  var note = word.substr(6, 6);

  piano_js.pianoListener(color, note, true, isDraw);

  if (isCompare == true)
  {
    notes_rec_js.comparison(note);
    $('.set button').unbind("click");
    $('#continue').attr('disabled',false);
  }
}

var clickListener = function(e)
{
  var targetID = $(e.target)[0].id;

  if (targetID == "home")
  {
    main.initModule($("body"));
  }

  if (targetID == "notes_js")
  {
    notes_rec_js.initModule($(".right"));
  }

  if (targetID == "interval_js")
  {
    interval_js.initModule($(".right"));
  }
  if (targetID == "about_js")
  {
    about_js.initModule($(".intro"));
  }
};


  return { initModule : initModule,
  parseAndSend : parseAndSend};
}();

//==============================================================================
$(document).ready(function() {main.initModule($("body")); });
