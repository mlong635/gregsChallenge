var app = angular.module("mainApp", []);
app.controller("MainCtrl", ['$scope', function($scope) {

  // this is minified for space-saving purposes.  To see the unminified version, see sample.json in root directory
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

  $scope.dataSheet = [{ 
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
  }];


  var newParam = {
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
  };

  var newCondition = {
    display: "",
    min: "",
    max: "",
    linstep: "",
    unit: "",
    condition: "",
    pin: ""
  };

  // set default blank fields
  $scope.params = $scope.dataSheet[0].electricalParams;
  $scope.conditions = $scope.dataSheet[0].electricalParams[0].conditions;

  $scope.getData = function () {
    $scope.submitted = '';
    $scope.dataSheet.length = 0; // empties the array
    $scope.dataSheet.push($scope.savedDataSheet);
  };

  $scope.submitData = function (dataSheet, params, conditions) {
    $scope.submitted = {}
    for(var key in dataSheet){
      $scope.submitted[key] = dataSheet[key];
    }
    $scope.submitted.electricalParams = params;
    $scope.submitted.electricalParams.conditions = conditions;
  }
    
  $scope.addParam = function(params, index){
    // make a copy of newParam or else you will get a ng-repeat dupes error
    var copy = [newParam].slice();
    // iterate thru each of the params
    for(var i=0; i<params.length; i++){
      // if one of them does not have a name, alert that each parameter needs a name and then return
      if(params[i].display===''){
        alert("Please make sure that all existing parameters have names before adding another parameter.  Thank you!")
        return;
      }
    }
    // if none of the existing params have blank names '', then add a new Param
    $scope.dataSheet[0].electricalParams.push(copy[0]);  
    console.log($scope.dataSheet[0].electricalParams);
  };

  $scope.addCondition = function(paramName, params){
    console.log("paramName", paramName, "params", params);
    console.log("adding a new condition to the following parameter: ", paramName);
    var matchIndex = null;
    // iterate thru each of the params
    for(var i=0; i<params.length; i++){
      // if one of them does not have a name, alert that each parameter needs a name and then return
      if(params[i].display===''){
        alert("Please make sure that all parameters have names before adding another condition.  Thank you!")
        return;
      }
      if(params[i].display===paramName){  // this finds which param to add the new condition to
        matchIndex = i;
      }
    }
    //then add a new condition to the chosen paramName
    $scope.dataSheet[0].electricalParams[matchIndex].conditions.push(newCondition);
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

//