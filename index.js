var myApp = angular.module('myApp',[]);

myApp.controller('dropdownCtrl', ['$scope','CustomerService', '$http', function($scope, CustomerService, $http) {
  
  
   
  $scope.customer ={
    name:'', 
    Country:'', 
    State: '', 
    City: ''
  };
  
      $http.get('accounts.json').success(function(data) {
       $scope.jsonFileData = data.data;
    });  
     
     
             
  
  $scope.acctypelist = CustomerService.getacclist();
    
  $scope.getaccTypes = function(){
    $scope.acctypearray = CustomerService.getaccname($scope.customer.AccType);
	
	 
	
         if   ($scope.customer.AccType == '1') {
			 
			            $scope.jsonData = '';
						$scope.showcurrtable = true;
						$scope.showsavtable = false;
					    $scope.showdeptable = false;
						$scope.showcardstable = false;
						 
					}
					
					if   ($scope.customer.AccType == '2') {
						
						 $scope.jsonData = '';
						$scope.showsavtable = true;
					  	$scope.showcurrtable = false;
					    $scope.showdeptable = false;
						$scope.showcardstable = false;
						
						
					}
					
					if   ($scope.customer.AccType == '3') {
						 
						 $scope.jsonData = '';
						 $scope.showdeptable = true;
						$scope.showcurrtable = false;
						$scope.showsavtable = false;
						$scope.showcardstable = false;
					    }
						
						if   ($scope.customer.AccType == '4') {
						 
						 $scope.jsonData = '';
						 $scope.showcardstable = true;
						 $scope.showdeptable = false;
						$scope.showcurrtable = false;
						$scope.showsavtable = false;
					    }
						
						if   ($scope.customer.AccType == '5') {
						 
						 $scope.jsonData = '';
						 $scope.showcardstable = false;
						 $scope.showdeptable = false;
						$scope.showcurrtable = false;
						$scope.showsavtable = false;
					    }
  }
  
  $scope.getaccNames = function(){
  //  debugger;
     $scope.accnamearray = CustomerService.getStateCity($scope.customer.AccName);
  }
  
  $scope.loadPeople = function() {
       $scope.jsonData = CustomerService.getPeople($scope.customer.AccType , $scope.customer.AccName);
  }
  
   $scope.getcustomerName = function() {
       $scope.customer.name = 'Mr. ' + CustomerService.getCustomer();
  }
  
 
  $scope.getcustomerName();
 
}]);

myApp.factory("CustomerService", ['$filter', function($filter){
 var service = {};
 
   
    
  
  var acclist = [
            { "id": 1, "AccType": "Current Account" },
            { "id": 2, "AccType": "Savings Account" },
            { "id": 3, "AccType": "Deposits" },
			{ "id": 4, "AccType": "Cards" },
			{ "id": 5, "AccType": "Loans" },
    ];
  
  var accname = [
    {"Id":"Current Account - 3", "AccName":"Current Account - 3", "AccId": 1},
    {"Id":"Current Account - 4", "AccName":"Current Account - 4", "AccId": 1},
    {"Id":"Current Account - 1", "AccName":"Current Account - 1", "AccId": 1},
    {"Id":"Savings Account - 1", "AccName":"Savings Account - 1", "AccId": 2},
    {"Id":"Savings Account - 3", "AccName":"Savings Account - 3", "AccId": 2},
    {"Id":"Savings Account - 2", "AccName":"Savings Account - 2", "AccId": 2},
    {"Id":"FD Account - 1", "AccName":"FD Account - 1", "AccId": 3},
    {"Id":"FD Account - 2", "AccName":"FD Account - 2", "AccId": 3},
	{"Id":"My Gold Card", "AccName":"My Gold Card", "AccId": 4}
  ];
  
  var accounts = {
	"data": {
		"name": "Harry",
		"category": "gold",
		"salutation": "Mr.",
		"location": "IN",
		"lang": "en-US",
		"accounts": [{
			"current": [{
				"id": "1001",
				"branch": "GGN",
				"name": "Current Account - 1",
				"currency": "INR",
				"order": "3",
				"balance": "5000",
				"limit": "10000"
			}, {
				"id": "1004",
				"branch": "GGN",
				"name": "Current Account - 3",
				"currency": "INR",
				"order": "1",
				"balance": "7000",
				"limit": "10000"
			}, {
				"id": "1021",
				"branch": "GGN",
				"name": "Current Account - 4",
				"currency": "INR",
				"order": "2",
				"balance": "5050",
				"limit": "10000"
			}]
		}, {
			"savings": [{
					"id": "20215",
					"branch": "GGN",
					"name": "Savings Account - 1",
					"currency": "INR",
					"order": "1",
					"balance": "5050"
				}, {
					"id": "20216",
					"branch": "GGN",
					"name": "Savings Account - 3",
					"currency": "INR",
					"order": "2",
					"balance": "70050"
				}, {
					"id": "20217",
					"branch": "GGN",
					"name": "Savings Account - 2",
					"currency": "INR",
					"order": "3",
					"balance": "0",
					"penalty": "100"
				}

			]
		}, {
			"deposits": [{
				"id": "31005",
				"branch": "GGN",
				"name": "FD Account - 1",
				"currency": "INR",
				"order": "1",
				"initial": "10000",
				"interest": "6",
				"maturityDate": "11-oct-2025"

			}, {
				"id": "31005",
				"branch": "GGN",
				"name": "FD Account - 2",
				"currency": "INR",
				"order": "2",
				"initial": "10000",
				"interest": "6",
				"maturityDate": "11-oct-2019",
				"taxsaver": "true"

			}]
		}, {
			"cards": [{
				"id": "4111111111111111",
				"type": "VISA",
				"name": "My Gold Card",
				"currency": "INR",
				"order": "1",
				"limit": "100000",
				"consumedLimit": "4500"

			}]
		}, {
			"loans": []
		}]


	}
};


 
  
  service.getacclist = function(){    
    return acclist;
  };
  
  service.getCustomer = function() {
	  return accounts.data.name;
  }
  
  service.getaccname = function(AccId){
    var AccType = ($filter('filter')(accname, {AccId: AccId}));
   return AccType;
  };
  
  service.getPeople = function(acctId, accountName) {
	 var details;
	 var AccType = accounts.data.accounts[acctId - 1];
	 for(var key in AccType) {
		details = ($filter('filter')(AccType[key], {name: accountName}));
	 }
	 return details;
  };
  
  return service;
  
  
}]);