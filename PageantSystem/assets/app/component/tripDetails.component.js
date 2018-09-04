class TripDetailsController {
    $onInit() {
        this.passengerTypes = this.bookingData;
    }
}

angular
.module('PageantSystem')
.component('tripDetails', {
    templateUrl: 'assets/app/template/component/tripDetails.html',
    bindings: {
        bookingData: '=',
        typeName: '='
    },
    controller: TripDetailsController,
    controllerAs : 'vm'
});