import * as _ from 'lodash';

export default function (ngModule) {
    ngModule.service('percentileService', PercentileService);
    PercentileService.$inject = ['$http'];

    function PercentileService($http) {

        let numberOfExaminees;
        let gpas;

        return {
            getUsersWithPercentiles: getUsersWithPercentiles,
            getUsersFromServer: getUsersFromServer
        };

        function getUsersWithPercentiles(users) {
            numberOfExaminees = users.length;
            gpas = _.map(users, (user) => {
                return user.gpa * 1;
            });
            gpas.sort();

            const returnedUsers = _.map(users, (user) => {
                return getPercentile(user);
            });

            return returnedUsers;
        }

        function getPercentile(user) {
            let scoresLessThanTheScoresOfInterest = 0;
            let frequency = 0;
            gpas.forEach((gpa) => {
                if (gpa < user.gpa * 1) {
                    scoresLessThanTheScoresOfInterest++;
                }
            });
            gpas.forEach((gpa) => {
                if (gpa === user.gpa * 1) {
                    frequency++;
                }
            });

            const percentile = Math.round(((scoresLessThanTheScoresOfInterest + (0.5 * frequency)) / numberOfExaminees) * 100);
            user.percentile = percentile;
            return user;
        }

        function getUsersFromServer() {
            return $http.get('http://localhost:3000/students')
                .then(
                (resp) => {

                    return getUsersWithPercentiles(resp.data);
                },
                (err) => {
                    console.log(`Unable to load students. Error: ${err.statusText}`);
                }
                );
        }


    }
}