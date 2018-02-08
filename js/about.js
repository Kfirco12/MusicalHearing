var about_js = function()
{

  //Initialize main body
  var configMap =
  {
        inputSection :

        "<h3></br>We are two musicians who found themselfs studying software engineering. Both of us are playing trumpet for more than 15 years.</p>"
        +"In this website we decided to combine our two specializations, music and programming, so it would help new musicians to be better.<p>"
        +"</p>"
        +"Kfir Cohen<p>"
        +"Ben Huri</h3>"
  };

  var stateMap = {$container : null };
  var initModule = function($container)
  {
    stateMap.$container = $container;
    $container.html(configMap.inputSection);

    $(".left").html('');
    $(".right").html('');
  };

  //=====================================================


  //=====================================================

  return {initModule : initModule};
}();
