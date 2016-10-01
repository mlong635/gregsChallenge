var app = angular.module("mainApp", []);
app.controller("MainCtrl", ['$scope', function($scope) {

  $scope.datasheet = {
    description: "Simple XYZ circuit test characterization, specifications from ABC for FG888",
    version: 0,
    category: "XYZ",
    electricalParams: [
      {
        display: "Voltage Coefficient",
        conditions: [
          {
            display: "Temp",
            unit: "ºC",
            condition: "TEMPERATURE",
            typ: "27"
          },
          {
            display: "VDD",
            min: "2.7",
            max: "3.6",
            linstep: "0.3",
            unit: "V",
            condition: "VOLTAGE",
            pin: "VDDA"
          }
        ],
        typ: {
          target: "0",
          penalty: "100"
        },
        pin: "VBGP",
        unit: "%V/V",
        method: "VOLTAGE_COEFF_VBGP"
      },
      {
        min: {
          target: "60",
          penalty: "fail"
        },
        display: "Temperature Coefficient @ 40ºC",
        conditions: [
          {
            display: "Temp",
            unit: "ºC",
            condition: "TEMPERATURE",
            typ: "40"
          }
        ],
        pin: "VBGP",
        unit: "ppm/ºC",
        max: {
          target: "490",
          penalty: "fail"
        },
        method: "TEMPERATURE_COEFF_VBGP"
      }
    ],
    foundry: "ABC",
    node: "FG888",
    ipname: "XYZ00"
  };

  $scope.params = [
    { 
      'ipname': "", 
      'version': "",
      'node': "",
      'foundry': "",
      'category': ""
    }
  ];

  $scope.getData = function () {
    // var stringified = JSON.stringify($scope.datasheet);
    var newParams = [];
    var newDataSheet = {};

    for(var key in $scope.datasheet){
      if(key!=='electricalParams'){
        newDataSheet[key] = $scope.datasheet[key];
      }
    }
    newParams.push(newDataSheet);
    $scope.params = newParams;
  };
    
  $scope.addNew = function(param){
    $scope.params.push({ 
      ipname: "", 
      version: "",
      node: "",
      foundry: "",
      category: ""
    });
  };
    
}]);