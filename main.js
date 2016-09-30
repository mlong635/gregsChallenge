var app = angular.module('mainApp', []);

  app.controller('MainCtrl', function($scope) {

  $scope.params = [{id: 'param1'}, {id: 'param2'}];
  
  $scope.addNewParam = function() {
    var newItemNo = $scope.params.length+1;
    $scope.params.push({'id':'param'+newItemNo});
  };
    
  $scope.removeParam = function() {
    var lastItem = $scope.params.length-1;
    $scope.params.splice(lastItem);
  };
  
  $scope.submitData = function() {
    console.log("data submitted")
  };

  $scope.getData = function () {
    console.log("data retrieved");
  };

});