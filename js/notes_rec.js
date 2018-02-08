var notes_rec_js = function()
{
  //==========Variables
  var start = false;
  var random_note; //Note that would be chosen randomly for the recognize game.
  var noteGrade = 0; //Game's grade.
  var iteration;
  var instructions_text = "Welcome to the 'Notes traning' section,</br>"
  +"Here you can practice your musical hearing by recognizing played notes.</p>"
  +"To start playing you should click on the 'start' button.</p>"
  +"After clicking - a note will be played, and you will have to recognize it by clicking on the right key of the piano on the screen.</p>"
  +"Please note you can play the note again and again (before you click on the piano) by clicking on 'Play again' button.</p>"
  +"Right after you click on the piano, you will get V or X for your answer, and you would be able to continue the game by clicking on 'Continue' button.</p>"
  +"If you want to restart the game - Just click 'Restart' anytime you want.</p>";

  //===================================METHODS===================================================
  //=============================================================================================
  var instruction = function() //instructions at the beginning.
  {
    $("#snackbar").hide();
    start = true;
  };

  //============================================


  var initModule = function($container)
  {
    stateMap.$container = $container;

    $container.html(configMap.inputSection);
    start = false;
    iteration = 0;
    //=====Add canvas in this page
    var introString =  '<canvas id="canvas">';
    $(".intro").html(introString);
    //=====Edit canvas in this page
    $("canvas").css('margin-left', '38%');
    piano_js.drawStave();

    //Clear left
    var leftString =  '';
    $(".left").html(leftString);

    //Start game
    $('#start').click(startGame);
    $('#continue').click(continueGame);
    $('#again').click(function(){playAgainNote(random_note);});

    //============Show snack bar=======
    var x = document.getElementById("snackbar");
    x.className = "show";
    $("#snackbar").show();

    //========Clear snack bar===========
    $("#snackbar .instructions").html('');
    $("#snackbar .instructions").append(instructions_text);

    //=======Add button to snackbar=====
    $("#snackbar .user").html('');
    $("#snackbar .user").append("<button class = 'ok'>I Understand</button>");

    //==========Add instructions for the game.
    $(".ok").click(function(){
      instruction();
    });
  };

  //============Find random number=========
  var randomGame = function()
  {
    var arr = ["c", "cs", "d", "ds", "e", "f", "fs", "g", "gs", "a", "as", "b", "cc"]; //Array for chords.
    var randomNote = Math.floor((Math.random() * 12));
    playAgainNote(arr[randomNote]);
    return arr[randomNote];
  };

  //Play note funtion (Called "again" just to avoid duplicate functions)
  var playAgainNote = function(noteInput)
  {
    //---Decide what note should we play... sharp or not.
    if (noteInput.length == 1 || (noteInput[0] == noteInput[1]))
    piano_js.pianoListener("white" ,noteInput, true);
    else
    piano_js.pianoListener("black" ,noteInput, true);
  }

  //======Function that starts the game.
  var startGame = function()
  {
    if(start){
      if (iteration == 0) //While its the first time, it means not "restart button"
      {
        $('.set button').unbind("click"); //Change piano click listener
        $('.set button').click(function(){main.parseAndSend($(event.target).attr('class'), true, true)});
        //-----Initialize parameters.
        iteration = 1;
        noteGrade = 0;

        $("#start").text("Restart");
        $('#continue').css({"background":"#4d004d"});
        $('#again').css({"background":"#4d004d"});
        $('#again').attr('disabled',false);

        random_note = randomGame();
      }
      else {
        iteration = 0;
        noteGrade = 0;
        trainings_js.restart();
        $('.set button').click(function(){main.parseAndSend($(event.target).attr('class'), false, false)});
      }
      notes = [];
      trainings_js.resetList();
      piano_js.clearStave();
      piano_js.drawStave();
    }
  };

  //========Continue button function
  var continueGame = function()
  {
    $('#continue').attr('disabled',true);
    $('.set button').click(function(){main.parseAndSend($(event.target).attr('class'), true, true)});
    iteration++;
    notes = [];
    piano_js.clearStave();
    piano_js.drawStave();
    random_note = randomGame();
  };

  //---------------------------------------------------------------------------------------------
  //Compare the note that was played to the clicked one.
  var comparison = function(note_comparison)
  {
    if (note_comparison == random_note)
    {
      trainings_js.isCorrect('v', iteration);
      noteGrade+=10;
      trainings_js.progressCalc(noteGrade);
    }
    else
    {
      trainings_js.isCorrect('x', iteration);
    }

    if (iteration == 10) //While we are at the last iteration.
    {
      setTimeout(function(){
        swal ("Your score is: "+noteGrade);
        iteration = 0;
        trainings_js.restart();
        notes = [];
        trainings_js.resetList();
        piano_js.clearStave();
        piano_js.drawStave();
        $('.set button').click(function(){main.parseAndSend($(event.target).attr('class'), false, false)});
      }, 200);
    };
  };
  //================Init===================
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

  //=====================================================

  var stateMap = {$container : null };
  //=====================================================

  return {initModule : initModule,
    comparison : comparison};
  }();
