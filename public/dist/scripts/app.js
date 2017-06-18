function handleOpenURL(param) {
    var presentationId = param.substring(param.indexOf('#') + 1);
    window.presentationId = presentationId;
}

var app = angular.module('authClientApp', [
    'ui.router',
    'oc.lazyLoad',
    'LocalStorageModule',
    'ngSessionStorage',
    'ui.bootstrap',
    'ngInputDate',
    'timer',
    'datatables'
]);
