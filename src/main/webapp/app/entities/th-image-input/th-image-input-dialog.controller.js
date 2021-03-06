(function() {
    'use strict';

    angular
        .module('acmeSiteApp')
        .controller('ThImageInputDialogController', ThImageInputDialogController);

    ThImageInputDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'ThImageInput', 'User'];

    function ThImageInputDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, ThImageInput, User) {
        var vm = this;
        vm.thImageInput = entity;
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('acmeSiteApp:thImageInputUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.thImageInput.id !== null) {
                ThImageInput.update(vm.thImageInput, onSaveSuccess, onSaveError);
            } else {
                ThImageInput.save(vm.thImageInput, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.setImageInputField = function ($file, thImageInput) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        thImageInput.imageInputField = base64Data;
                        thImageInput.imageInputFieldContentType = $file.type;
                    });
                });
            }
        };

        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;
    }
})();
