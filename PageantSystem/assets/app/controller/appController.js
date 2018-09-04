class AppController {
    constructor(
        appService,
    ) {
        'ngInject';

        this.appService = appService;
    }
    $onInit() {
        debugger;
        this.test = 'test';
        this.appService.getLocation()
            .then((response) => {
                this.locationList = response;
            });
    }
}
angular.module('PageantSystem').controller('AppController', AppController);