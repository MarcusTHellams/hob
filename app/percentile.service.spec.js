import app from './index';

// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('Users factory', function () {

    let percentile;
    let httpBackend;

    const studentList = [{ "id": "471908US", "name": "Randy Perez", "gpa": "1.6" }, { "id": "957625US", "name": "Alice Brown", "gpa": "3.5" }, { "id": "909401US", "name": "Maria Russell", "gpa": "3.9" }, { "id": "342575US", "name": "Shirley Evans", "gpa": "3.5" }, { "id": "780367US", "name": "Daniel Bell", "gpa": "2.2" }, { "id": "841786US", "name": "Wille Richardson", "gpa": "3.6" }, { "id": "881365US", "name": "Ruby Lee", "gpa": "2.7" }, { "id": "848124US", "name": "Peter Powell", "gpa": "2.3" }, { "id": "497579US", "name": "Bruce Nelson", "gpa": "3.7" }, { "id": "756454US", "name": "Bonnie Murphy", "gpa": "3.5" }, { "id": "551871US", "name": "Chris 'Mac' Cooper", "gpa": "2.7" }, { "id": "734476US", "name": "Christine Walker", "gpa": "2.7" }, { "id": "138197US", "name": "Alan Robinson", "gpa": "1.8" }, { "id": "755435US", "name": "Phillip Allen", "gpa": "2.9" }, { "id": "744270US", "name": "Justin Scott", "gpa": "3.8" }, { "id": "140419US", "name": "James Edwards", "gpa": "2.4" }, { "id": "263737US", "name": "Ann Mitchell", "gpa": "3.6" }, { "id": "522471US", "name": "Eugene Rivera", "gpa": "3.5" }, { "id": "022169US", "name": "Irene Simmons", "gpa": "2.2" }, { "id": "690697US", "name": "Joshua Über", "gpa": "3.6" }, { "id": "094778US", "name": "Jonathan Reed", "gpa": "3.5" }, { "id": "73780US", "name": "Johnny Ross", "gpa": "2.2" }, { "id": "256090US", "name": "Jessica Howard", "gpa": "3.6" }, { "id": "775011US", "name": "Frank Kelly", "gpa": "2.2" }, { "id": "333218US", "name": "Kathy Patterson", "gpa": "3.7" }];

    beforeEach(angular.mock.module('myApp'));

    beforeEach(inject(function (_percentileService_, _$httpBackend_) {
        percentile = _percentileService_;
        httpBackend = _$httpBackend_;
        httpBackend.when('GET', 'http://localhost:3000/students').respond(studentList);
    }));

    it('should exist', function () {
        expect(percentile).toBeDefined();
    });



    describe('getUsersFromServer()', function () {

        it('should exist', function () {
            expect(percentile.getUsersFromServer).toBeDefined();
        });

        it('Student name should be Randy Perez', function () {
            let mod = percentile.getUsersFromServer();
            mod.then(
                function (students) {
                    expect(students[0].name).toEqual('Randy Perez');
                }
            );
            httpBackend.flush();
        });

        it('Student gpa should be 1.6', function () {
            let mod = percentile.getUsersFromServer();
            mod.then(
                function (students) {
                    expect(students[0].gpa).toEqual('1.6');
                }
            );
            httpBackend.flush();
        });

        it('Student percentile rank should be 2', function () {
            let mod = percentile.getUsersFromServer();
            mod.then(
                function (students) {
                    expect(students[0].percentile).toEqual(2);
                }
            );
            httpBackend.flush();
        });
    });

});