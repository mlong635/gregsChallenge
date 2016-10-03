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

  // Param constructor
  function Param () {
    var obj = {
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
    };
    return obj;
  }

  // Condition constructor
  function Condition () {
    var obj = {
      display: "",
      min: "",
      max: "",
      linstep: "",
      unit: "",
      condition: "",
      pin: ""
    };
    return obj;
  };

  // set default blank fields
  $scope.params = $scope.dataSheet[0].electricalParams;
  $scope.conditions = $scope.dataSheet[0].electricalParams[0].conditions;

  $scope.getData = function () {
    $scope.submitted = '';
    $scope.dataSheet.length = 0; // empties the array
    console.log("$scope.dataSheet", $scope.dataSheet, "$scope.savedDataSheet", $scope.savedDataSheet);
    $scope.dataSheet.push($scope.savedDataSheet);
    console.log("just pushed $scope.dataSheet", $scope.dataSheet);  
    $scope.params = $scope.dataSheet[0].electricalParams;
    $scope.conditions = $scope.dataSheet[0].electricalParams[0].conditions;
  };

  $scope.submitData = function (dataSheet) {
    $scope.submitted = $scope.dataSheet[0];
  }
    
  $scope.addParam = function(params, index){
    // make a new Param using the Param Contructor or else you will get a ng-repeat dupes error
    var newParam = new Param;
    // iterate thru each of the params
    for(var i=0; i<params.length; i++){
      // if one of them does not have a name, alert that each parameter needs a name and then return
      if(params[i].display===''){
        alert("Please make sure that all existing parameters have names before adding another parameter.  Thank you!")
        return;
      }
    }
    // if none of the existing params have blank names '', then add a new Param
    $scope.dataSheet[0].electricalParams.push(newParam);  
  };

  $scope.addCondition = function(paramName, params, condition){
    // make a new Condition using the Condition Contructor or else you will get a ng-repeat dupes error
    var newCondition = new Condition;
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
    //then add the newCondition object to the chosen paramName's conditions array
    $scope.dataSheet[0].electricalParams[matchIndex].conditions.push(newCondition);
  };

  $scope.deleteCondition = function(paramName, index){
    console.log("paramName", paramName, "index", index);
    var params = $scope.dataSheet[0].electricalParams;
    
    for(var i=0; i<params.length; i++){
      if(params[i].display===paramName){
        if(index===0){
          $scope.dataSheet[0].electricalParams[i].conditions[0] = new Condition;
          return;
        }
        else {
          $scope.dataSheet[0].electricalParams[i].conditions.splice(index, 1);
        }
      }
    }
  }
    
  $scope.deleteParam = function (index){
    if(index===0){
      $scope.dataSheet[0].electricalParams[index] = new Param;
      return;
    }
    else {
      $scope.dataSheet[0].electricalParams.splice(index, 1);
    }
  }
}]);

