var interval_js = function()
{
  //===================================VARIABLES=================================================
  //=============================================================================================
  //define intervals.
  var intervals = ["mi2", "ma2", "mi3", "ma3", "p4","3t", "p5", "mi6", "ma6", "mi7", "ma7", "p8"];
  var notes_arr = ["c", "cs", "d", "ds", "e", "f", "fs", "g", "gs", "a", "as", "b", "cc"];
  var iteration = 0;
  var level = 1;
  var diff, clicked = false;
  var firstNote,secondNote;
  var progress_grade = 0;
  var start = false;
  var name; //User name.
  var user_data;
  var instructions_text =
  "Welcome to the 'Interval traning' section,</br>"
  +"Here you can practice your musical hearing by recognizing the played intervals.</p>"
  +"To start playing you should click on 'start' button.</p>"
  +"After clicking - an interval sound will be played, and you will have to recognize it by clicking on the right interval button.</p>"
  +"Please note you can play the note again and again (before you press on the interval button) by clicking on 'Play again' button.</p>"
  +"After pressing an iterval button, you will get V or X for your answer, and you would be able to continue the game by clicking on 'Continue' button.</p>"
  +"If you want to restart the level - Just click 'Restart' anytime you want.</p>"
  +"To continue to the next level you need to achieve at least a 70% success rate.</p>"
  +"If you understand and ready to start, enter your name at the folowing box and press 'add'</p>"
  +"Please notice: if your user name already exists, you will continue from the level reached at the your last visit.";
  //===================================METHODS===================================================
  //=============================================================================================
  var addUser = function() {
    name = $("#txtName").val().toLowerCase();
    if (name != '')
    {
      name = name.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
      });
      user_data = {id : name, level: level};
      storageAPI.save("Users", user_data, true);
      $("#snackbar").hide();
      start = true;
    }
    else {
      swal("Please enter a user name!!");
    }

  }

  //random an interval at the given level range.
  var intervalRand = function(level)
  {
    var temp_level = level;
    if(temp_level > 6)
    level = 6;
    var max_interval = level*2;
    if(level >= 3 && level!=6)
    max_interval++;

    var interval_rand = Math.floor(Math.random()*max_interval)+1;

    firstNote = Math.floor((Math.random() * (13 - interval_rand)));
    secondNote = firstNote+interval_rand;
  };

  //-------------------------------------------------------------------------------------------------
  //initialize exercise.
  var starting = function()
  {
    if (iteration == 0)
    {
      iteration = 1;
      progress_grade = 0;
      clicked = true;
      intervalRand(level);
      diff = playInterval();
      $('#start').text("Restart");
      $('#again').css({"background":"#4d004d"});
      $('#again').attr('disabled',false);
    }
    else {
      clicked = false;
      iteration = 0;
      trainings_js.restart();
      progress_grade = 0;
    }

    trainings_js.resetList();
    piano_js.clearStave();
    piano_js.drawStave();
  };

  //-------------------------------------------------------------------------------------
  //skip level.
  var skipLevel = function()
  {
    if(level<=6){
      if(level <=5)
      level++;
      progress_grade = 0;
      iteration = 0;
      trainings_js.restart();
      trainings_js.levelUp(level);
    }
  };
  //-------------------------------------------------------------------------------------------------
  //play the next interval and reset relevant variables.
  var nextInterval = function()
  {
    iteration++;
    clicked = true;
    intervalRand(level);
    diff = playInterval();
    piano_js.clearStave();
    piano_js.drawStave();
    $('#continue').css({"background":"#bfbcbc"});
    $('#continue').attr('disabled',true);
  };
  //-------------------------------------------------------------------------------------------------
  //draw grade.
  var isCorrect = function(type)
  {
    $("#"+iteration).append('<img src="css/images/'+type+'.png">');
    $('img').attr('height',10);
    $('img').attr('width',10);
  };

  //-------------------------------------------------------------------------------------------------
  //draw interval.
  var drawInterval = function()
  {
    var color = "white";
    var note = notes_arr[firstNote];
    if((firstNote<4 && firstNote%2 ==1) || (firstNote>5 && firstNote!=12 && firstNote%2 == 0))
    {
      note = notes_arr[firstNote][0];
      color = "black";
    }
    piano_js.pianoListener(color,note,false,true);

    color = "white";
    note = notes_arr[secondNote];
    if((secondNote<4 && secondNote%2 ==1) || (secondNote>5 && secondNote!=12 && secondNote%2 == 0))
    {
      note = notes_arr[secondNote][0];
      color = "black";
    }
    piano_js.pianoListener(color,note,false,true);
  };

  //-------------------------------------------------------------------------------------------------
  //interval buttons behaviour.
  var intervalRec = function(key)
  {
    var name = key;
    if(clicked){
      if(name == intervals[diff-1]){
        isCorrect('v');
        progress_grade+=10;
        trainings_js.progressCalc(progress_grade);
      }
      else
      {
        isCorrect('x');
      }
      drawInterval();
      if(iteration == 10)
      {
        if(progress_grade>=70)
        {
          if(level<=6)
          level++;
          user_data.level = level;
          storageAPI.save("Users", user_data, false);
        }
        setTimeout(function(){
          trainings_js.finished(level,progress_grade);
          trainings_js.restart();
          progress_grade = 0;
          iteration = 0;
        }, 200);
      }

      else
      {
        $('#continue').css({"background":"#4d004d"});
        $('#continue').attr('disabled',false);
      }

      clicked = false;
    }
  };

  //-----------------------------------------------------------------------------------------------------
  //change the level label color and save the new level of the user.
  var changeLevel = function(currentLevel)
  {
    level = currentLevel;
  }

  //-----------------------------------------------------------------------------------------------------
  //play interval.
  var playInterval = function()
  {
    piano_js.pianoListener(false,notes_arr[firstNote],true,false);
    setTimeout(function(){
      piano_js.pianoListener(false,notes_arr[secondNote],true,false);
    }, 500);
    return (secondNote-firstNote);
  };

  //-----------------------------------------------------------------------------------------------------
  //Clear storage.
  var clearStorage = function ()
  {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover users' names and levels!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false,
      html: false
    }, function(){
      storageAPI.drop('Users');
      interval_js.initModule($(".right"));
      swal("Deleted!",
      "All users are now deleted.",
      "success");
    });
  }

  //-----------------------------------------------------------------------------------------------------

  //============================INIT===================================================
  //==================================================================================
  var configMap =
  {
    inputSection :
    '<button id="start">Start</button>'+
    '<button id="again" disabled='+'true'+'>Play Again</button>'+
    '<button id="continue" disabled='+'true'+'>Continue</button>'+
    '<div class="percent">0%</div>'+
    '<div class="bar"><div class="progress"></div></div>'+
    '<ul class="List">Answers:'+
    '<li id="1">1. </li>'+
    '<li id="2">2. </li>'+
    '<li id="3">3. </li>'+
    '<li id="4">4. </li>'+
    '<li id="5">5. </li>'+
    '<li id="6">6. </li>'+
    '<li id="7">7. </li>'+
    '<li id="8">8. </li>'+
    '<li id="9">9. </li>'+
    '<li id="10">10. </li>'+
    '</ul>'
  };

  //=============================================

  var stateMap = {$container : null };

  //=============================================

  var initModule = function($container)
  {
    stateMap.$container = $container;
    $container.html(configMap.inputSection);
    storageAPI.init();
    storageAPI.createObject("Users");

    //initialize variables.
    start = false;
    iteration = 0;
    level = 1;

    //inject to the main part.
    var introString = '<span class="answers">The notes of the played interval are:</span>'+
    '<canvas id="canvas"></canvas>'+
    '<div class="intervals">'+
    '<button id="mi2">minor 2</button>'+
    '<button id="ma2">Major 2</button>'+
    '<button id="mi3" disabled='+'true'+'>minor 3</button>'+
    '<button id="ma3" disabled='+'true'+'>Major 3</button>'+
    '<button id="p4" disabled='+'true'+'>Perfect 4</button>'+
    '<button id="3t" disabled='+'true'+'>Tritone</button>'+
    '<button id="p5" disabled='+'true'+'>Perfect 5</button>'+
    '<button id="mi6" disabled='+'true'+'>minor 6</button>'+
    '<button id="ma6" disabled='+'true'+'>Major 6</button>'+
    '<button id="mi7" disabled='+'true'+'>minor 7</button>'+
    '<button id="ma7" disabled='+'true'+'>Major 7  </button>'+
    '<button id="p8" disabled='+'true'+'>Perfect 8  </button>'+
    '</div>';
    //$("body").html(configMap.inputSection);
    $(".intro").html(introString);
    $("canvas").css('margin-left', '35%');
    piano_js.drawStave();

    //inject the left asside
    var left_str = '<div class="side_menu">'+
    '<div class="first level">Level 1</div>'+
    '<div class="second level">Level 2</div>'+
    '<div class="third level">Level 3</div>'+
    '<div class="fourth level">Level 4</div>'+
    '<div class="fifth level">Level 5</div>'+
    '<div class="sixth level">Level 6</div>'+
    '<button id="skip">Skip Level</button>'+
    '<button id="clear_storage">Clear Users</button>'+
    '</div>';
    $(".left").html(left_str);

    //initialize training.
    $('#start').css({"background":"#4d004d"});
    $('#mi2').css({"background":"#4d004d"});
    $('#ma2').css({"background":"#4d004d"});
    $('.first').css({"background":"#4d004d"});

    //============Show snack bar=======
    var x = document.getElementById("snackbar");
    x.className = "show";
    $("#snackbar").show();

    //==========Clear and add instructions for the game.
    $("#snackbar .instructions").html('');
    $("#snackbar .instructions").append(instructions_text);

    //=======Add button to snackbar=====
    $("#snackbar .user").html('');

    $("#snackbar .user").append("<label id = 'lblName for = 'txtName'>Enter user name: </label>"
    +"<input id = 'txtName'><button class = 'add'>Add User</button>");
    $(".add").click(function(){
      addUser();
    });


    $('.set button').click(function(){main.parseAndSend($(event.target).attr('class'), false, false)});
    //---------------------LISTENERS---------------------
    //start button listener.
    $('#start').click(function() {
      if(start)
      starting();
    });
    //-----------------------------------
    //intervals buttons listeners.
    $(".intervals button").click(function(e){
      intervalRec($(this).attr('id'));
    });
    //-----------------------------------
    //play agin button.
    $('#again').click(function(){
      diff = playInterval(level);
    });
    //-----------------------------------
    //continue button.
    $('#continue').click(function(){
      nextInterval();
    });
    //-----------------------------------
    //skip level buttons.
    $('#skip').click(function(){
      if (start)
      skipLevel();
    });
    //-----------------------------------
    //Clear Storage.
    $('#clear_storage').click(function(){
      if (start)
      clearStorage();
    });

  };
  //----------------------------------------------------------
  return{initModule : initModule,
    changeLevel: changeLevel};
  }();
