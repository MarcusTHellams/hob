import angular from 'angular';
import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import AppComponent from './app.component';
import PercentileService from './percentile.service';

const app = angular.module('myApp', []);

AppComponent(app);
PercentileService(app);

angular.element().ready(function () {
    angular.bootstrap(document, ['myApp']);
});