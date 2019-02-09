$(document).ready(function(){

  // liste for submit event
  $('form').on('submit', function(){

      // get form data
      var item = $('form input');
      // create an object so data format matches that of the dataArr in todoController.js
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        
        // send form data to todoController.js via todo captured
        data: todo,

        // if success, we retrieve data back, passed into function via argument, 'returnedData'
        success: function(data){
          
          /*
            when reloads, uses app.get route causing the function to fire, re-renderng the view
            location.reload is equivalent to refreshing your browser window, doc is reloaded
          */
          location.reload();

        }
      });

      return false;

  });

  // listen for click on list items
  $('li').on('click', function(){

      // replace any spaces with dashes
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',

        // send clicked item to todoController.js
        url: '/todo/' + item,

        // if success, we retrieve data back, passed into function via argument, 'returnedData'
        success: function(returnedData){
    
          /*
            when reloads, uses app.get route causing the function to fire, re-renderng the view
            location.reload is equivalent to refreshing your browser window, doc is reloaded
          */
          location.reload();

        }
      });
  });

});
