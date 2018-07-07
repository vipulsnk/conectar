var app=angular.module('myApp',[]);
app.config(function ($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.controller('mainController',['$scope',function($scope){
	var myElement = angular.element( document.querySelector( '#title' ) );
	var username=myElement.text();
	var socket=io.connect();
	socket.emit('get tags',username);	
	socket.on('the tags',function(tags){
		$scope.tags=tags;
		$scope.$apply();
		console.log(tags);
	});
	var friends=[];
	socket.emit('getfriends',username);
	socket.on('the friends',function(friends){
		$scope.friends=friends;
		$scope.$apply();
	});
	socket.emit('available friend request',username);
	socket.on('got new friend requests',function(friend){
		$scope.requests.push({friend});
		$scope.$apply();
	});
	socket.on('my friend request',function(friend){
		$scope.requests.push({friend});
		$scope.$apply();
	});
	socket.on('searched people',function(people){
		$scope.people.push({people});
		$scope.$apply();
	});
	$scope.addtag=function(tag){
		socket.emit('tag',username,tag,like);
	};
	$scope.search=function(tag){
		$scope.people=[];
		$scope.emit('search for people',tag,username);
	};
	$scope.sendfriendrequest=function(friend){
		socket.emit('friend request',username,friend);
	};
	$scope.addfriend=function(friend){
		socket.emit('add to friends',username,friend);
		$scope.friends.push({friend});
		$scope.$apply();
	};
}]);