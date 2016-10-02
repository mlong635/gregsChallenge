var app = angular.module("mainApp", []);
app.controller("MainCtrl", ['$scope', function($scope) {

  $scope.savedDataSheet = {
    "description": "Simple XYZ circuit test characterization, specifications from ABC for FG888",
    "version": 0,
    "category": "XYZ",
    "electricalParams": [
      {
        "display": "Voltage Coefficient",
        "conditions": [
          {
            "display": "Temp",
            "unit": "ºC",
            "condition": "TEMPERATURE",
            "typ": "27"
          },
          {
            "display": "VDD",
            "min": "2.7",
            "max": "3.6",
            "linstep": "0.3",
            "unit": "V",
            "condition": "VOLTAGE",
            "pin": "VDDA"
          }
        ],
        "typ": {
          "target": "0",
          "penalty": "100"
        },
        "pin": "VBGP",
        "unit": "%V/V",
        "method": "VOLTAGE_COEFF_VBGP"
      },
      {
        "min": {
          "target": "60",
          "penalty": "fail"
        },
        "display": "Temperature Coefficient @ 40ºC",
        "conditions": [
          {
            "display": "Temp",
            "unit": "ºC",
            "condition": "TEMPERATURE",
            "typ": "40"
          }
        ],
        "pin": "VBGP",
        "unit": "ppm/ºC",
        "max": {
          "target": "490",
          "penalty": "fail"
        },
        "method": "TEMPERATURE_COEFF_VBGP"
      }
    ],
    "foundry": "ABC",
    "node": "FG888",
    "ipname": "XYZ00"
  };

  $scope.dataSheet = [
    { 
      ipname: "", 
      version: "",
      node: "",
      foundry: "",
      category: "",
      description: "",
      electricalParams: [
        {
          display: "",
          conditions: [
            {
              display: "",
              min: "",
              max: "",
              linstep: "",
              unit: "",
              condition: "",
              pin: "",
              typ: ""
            }
          ],
          typ: {
            target: "",
            penalty: "100"
          },
          min: {
            target: "",
            penalty: "fail"
          },
          max: {
            target: "",
            penalty: "fail"
          },
          pin: "",
          unit: "",
          method: ""
        }
      ]
    }
  ];

  $scope.params = [{
    display: "",
    conditions: [
      {
        display: "",
        min: "",
        max: "",
        linstep: "",
        unit: "",
        condition: "",
        pin: ""
      }
    ],
    typ: {
      target: "",
      penalty: ""
    },
    min: {
      target: "",
      penalty: ""
    },
    max: {
      target: "",
      penalty: ""
    },
    pin: "",
    unit: "",
    method: ""
  }];

  $scope.conditions = [
    {
      display: "",
      min: "",
      max: "",
      linstep: "",
      unit: "",
      condition: "",
      pin: ""
    }
  ];

  $scope.getData = function () {

    $scope.params = $scope.savedDataSheet.electricalParams;
    $scope.conditions = $scope.savedDataSheet.electricalParams.conditions;
    
    var newDataSheet = {};

    for(var key in $scope.savedDataSheet){
      newDataSheet[key] = $scope.savedDataSheet[key];
    }
    $scope.dataSheet.length = 0;  // empties the array
    $scope.dataSheet.push(newDataSheet);
  };

  $scope.submitData = function () {
    console.log("submitData invoked, here are the args", arguments);
  }
    
  $scope.addParam = function(data){
    $scope.params.push({ 
      ipname: "", 
      version: "",
      node: "",
      foundry: "",
      category: ""
    });
  };

  $scope.addCondition = function(){
    $scope.conditions.push({
      display: "",
      min: "",
      max: "",
      linstep: "",
      unit: "",
      condition: "",
      pin: ""
    });
  };

  $scope.deleteCondition = function(conditionName){
    var index = null;
    for(var i=0; i<$scope.conditions.length; i++){
      if($scope.conditions[i].display===conditionName){
        index = i;
        $scope.conditions.splice(i, 1);
        break;
      }
    }
    if($scope.conditions.length===0){
      $scope.addCondition();
    }
  }
    
  $scope.deleteParam = function (paramName){
    var index = null;
    for(var i=0; i<$scope.params.length; i++){
      if($scope.params[i].display===paramName){
        index = i;
        $scope.params.splice(i, 1);
        break;
      }
    }
    if($scope.params.length===0){
      $scope.addParam();
    }
  }
}]);