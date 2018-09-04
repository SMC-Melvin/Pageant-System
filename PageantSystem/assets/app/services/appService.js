class AppService {
    constructor(
        $http,
        $q,
    ) {
        this.$http = $http;
        this.$q = $q;
        this.baseUrl = 'http://192.168.254.103/api/';
    }

    getLocation() {
        const defer = this.$q.defer();
        defer.resolve([{
            id: 1,
            name: 'Test Only',
        }]);
        return defer.promise;        
    }
}

angular.module('PageantSystem').service('appService', AppService);