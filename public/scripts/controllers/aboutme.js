angular.module('myApp').controller('aboutmeController', function($scope, $http,loadjson) {
  loadjson.getItems().then(function(response) { 
    $scope.data = json.page2;
  });

  //form details
  $scope.formDetails = {
    name : "",
    email : "",
    message : ""
  }

  $scope.submitForm = function() {
    // Get the IP of the user
    $http({
      method: 'GET',
      url: 'www.freegeoip.net/json/?callback=?'
    }).then(function successCallback(response) {
      // Get the date
      var d = new Date();

      var formInput = {
        date :  (d.getMonth()+1) + "/" + d.getDate() +"/" + d.getFullYear() + " @ " + d.getHours() + ":" + d.getMinutes(),
        ip : response.data.ip,
        name : $scope.formDetails.name,
        email : $scope.formDetails.email,
        message : $scope.formDetails.message
      };

      $.ajax({
        url: "/sendtodb",
        type: "POST",
        data: JSON.stringify(formInput),
        contentType: "application/json"
      }).done(function( msg ) {
        console.log(msg);
      });
    });
  }
});