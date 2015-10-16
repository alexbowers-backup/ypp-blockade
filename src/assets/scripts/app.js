import jquery from 'jquery';
import angular from 'angular';
import * as LobbyModule from './lobby/lobby.module';

angular.module('CadeSim', [])
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }])
    .controller('LobbyCtrl', LobbyModule.ctrl);

window.$ = window.jQuery = jquery;
