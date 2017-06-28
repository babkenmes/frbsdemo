'use strict';
app.controller('registerCtrl', function ($scope, $state, $sce, $timeout, $uibModal, userService, roleNames, authService, $window) {
    $scope.User = {};
    $scope.message = {};
    $scope.register = function () {
        userService.register($scope.User).then(function (result) {
			authService.login($scope.User).then(function (response) {
              if(authService.authentication.role=="admin")
					$state.go('index.users');
				else
					$window.location.href = "/polymer";
            },
            function (err) {
                $scope.message.status = "danger";
                if (err && err.error_description) {
                    $scope.message.text = err.error_description;
                } else {
                    $scope.message.text = "Неправильный логин или пароль"
                }
            });
        },
        function (err) {
            ///TODO implement better handling
            if(err.data.indexOf("duplicate key error") > -1)
            {
                $scope.message.text = "There is already user " + $scope.User.username + " please try anthoer username";
            }
            else{
                $scope.message.text = err.data;
            }
            console.log("error");
        });
    };
});
