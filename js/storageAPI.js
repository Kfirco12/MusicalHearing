var storageAPI = function() {
    var list;

    var init = function() {
        if(window.localStorage) {
            list = {};
            for(var i = 0; i < localStorage.length; i++)
                list[localStorage.key(i)] = true;
        }
        else {
            alert("Sorry, no Storage API available");
        }
    };

    var createObject = function(type) {
        if(!localStorage.getItem(type))
            localStorage.setItem(type, JSON.stringify({}));
        list[type] = true;
    };

    var save = function(type, userName, beginning) {
        var flag = false;
        var user_level;

        if(!list[type])
            alert("No such storage type " + type);
        else {
            var dataString = localStorage.getItem(type);
            var dataObject = JSON.parse(dataString);
              //if (dataObject[userName.id].val == userName)
              //
            for(var prop in dataObject)
            {
                if(dataObject[prop].id == userName.id)
                {
                  if (beginning)
                  {
                    flag = true;
                    user_level = dataObject[prop].level;
                    interval_js.changeLevel(user_level);
                  }
                  else {
                    flag = false;
                  }

                }
            }

            if (flag)
            {
              swal ("Welcome back "+ userName.id +"!!");
              trainings_js.levelUp(user_level);
            }
            else {
              dataObject[userName.id] = userName;
              localStorage.setItem(type, JSON.stringify(dataObject));
            }

        }
    };

    var drop = function(type) {
        if(!list[type])
            console.log("No such object " + type);
        else
            localStorage.removeItem(type);
    };

    return {
        init : init,
        createObject : createObject,
        save : save,
        drop : drop
    };

}();
