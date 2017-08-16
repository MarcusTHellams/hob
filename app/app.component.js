import html from './app.component.html';

export default function (ngModule) {
    ngModule.component('app', {
        controller: AppComponent,
        template: html
    });
    AppComponent.$inject = ['percentileService'];
    function AppComponent(percentileService) {
        const ctrl = this;

        percentileService.getUsersFromServer()
            .then(
            (students) => {
                ctrl.students = students;
            },
            (err) => {
                console.log(err);
            }
            );

    }
}