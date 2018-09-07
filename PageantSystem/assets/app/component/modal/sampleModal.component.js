class SampleModalController {
    $onInit() {
        this.passengerTypes = this.bookingData;
    }
}

angular
.module('PageantSystem')
.component('sampleModal', {
    templateUrl: 'assets/app/template/component/modal/sampleModal.html',
    controller: SampleModalController,
    controllerAs : 'vm'
});