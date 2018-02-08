var trainings_js = new function()
{

  //---------------------------------------------------------------------------------------------
  //reset answers from list.
  var resetList = function()
  {
    for (var i = 1; i < 11; i++)
    $("#"+i).html("").append(i+".");
  }
  //---------------------------------------------------------------------------------------------
  //reset progress.
  var resetProgress = function()
  {
    $('.progress').css({"width":"0%"});
    $('.percent').text("0%");
  }

  //=============================================================================================
  //reset all elements.
  var restart = function(grade){
    $('#start').text("Start");
    $('#again').css({"background":"#bfbcbc"});
    $('#again').attr('disabled',true);
    $('#continue').css({"background":"#bfbcbc"});
    $('#continue').attr('disabled',true);

    piano_js.clearStave();
    piano_js.drawStave();
    resetProgress();
    resetList();
  }
  //=============================================================================================
  //calculate progress
  var progressCalc = function(grade){
    $('.progress').css({"width":grade+"%"});
    $('.percent').text(grade+"%");
  }

  //=============================================================================================
  //open the next level.
  var levelUp = function(user_level)
  {
    var level = 1;
    var level_arr = ["first", "second", "third", "fourth", "fifth", "sixth"];
    while(level<=user_level)
    {
      $(".side_menu ."+level_arr[level-1]).css({"background-color":"#4d004d"});
      //open level intervals.
      if(level<3)
      {
        $('#mi'+(level+1)).css({"background":"#4d004d"});
        $('#mi'+(level+1)).attr('disabled',false);
        $('#ma'+(level+1)).css({"background":"#4d004d"});
        $('#ma'+(level+1)).attr('disabled',false);
      }
      else if(level == 3 || level == 6)
      {
        if(level == 3)
        {
          $('#p'+(level+1)).css({"background":"#4d004d"});
          $('#p'+(level+1)).attr('disabled',false);
          $('#3t').css({"background":"#4d004d"});
          $('#3t').attr('disabled',false);
        }
        $('#p'+(level+2)).css({"background":"#4d004d"});
        $('#p'+(level+2)).attr('disabled',false);

      }
      else {
        $('#mi'+(level+2)).css({"background":"#4d004d"});
        $('#mi'+(level+2)).attr('disabled',false);
        $('#ma'+(level+2)).css({"background":"#4d004d"});
        $('#ma'+(level+2)).attr('disabled',false);
      }

      level++;
    }
  }

  //=============================================================================================
  //check if the user finished the level.
  var finished = function(level,grade)
  {
    if(grade >= 70 && level < 7)
    {
      swal("Congratulations!!", "you have reached level "+level+"!!", "success");
      levelUp(level);
      restart();
    }
    else if(grade >= 70 && level == 7){
      swal("Congratulations!!","you finished the last level!! Keep training..", "success");
      restart();
    }
    else {
      {
        swal("Oops...", "unfortunately, you didn't reached the required level..Please, try again.", "error");
        restart();
      }
    }
  };

  var isCorrect = function(type, iteration)
  {
    $("#"+iteration).append('<img src="css/images/'+type+'.png">');
    $('img').attr('height',10);
    $('img').attr('width',10);
  };


  return {
    restart : restart,
    progressCalc : progressCalc,
    resetList:resetList,
    finished: finished,
    levelUp: levelUp,
    isCorrect : isCorrect};

  }();
