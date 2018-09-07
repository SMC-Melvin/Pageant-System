class AppController {
    constructor(
        $uibModal,
        appService,
    ) {
        'ngInject';

        this.$uibModal = $uibModal;
        this.appService = appService;
    }
    showModal() {
        const modalInstance = this.$uibModal.open({
            template: `<sample-modal></sample-modal>`,
            size: 'lg',
            backdrop: 'static',
            keyboard: false,
          });
      
          modalInstance.result.then((response) => {
          });
    }
    $onInit() {
        debugger;
        this.test = 'test';
        this.appService.getLocation()
            .then((response) => {
                this.locationList = response;
            });
        this.showModal();
    }
}
angular.module('PageantSystem').controller('AppController', AppController);