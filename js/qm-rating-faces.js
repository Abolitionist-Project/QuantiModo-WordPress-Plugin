var onFaceButtonClicked = function (value, variable) {

    jQuery('#sectionSendingRating').html('');
    var timestamp = Math.floor(Date.now() / 1000);
    var measurements = [
        {
            timestamp: timestamp,
            value: value
        }
    ];
    var payload = [{
        measurements: measurements,
        name: variable.name,
        source: 'QuantiPress',
        category: variable.category,
        combinationOperation: variable.combinationOperation,
        unit: variable.abbreviatedUnitName
    }];

    Quantimodo.postMeasurementsV2(payload, function (response) {
        if (response.status == 201) {
            jQuery('#result-string').html('Thanks!  We love you!');
            window.measurementPostingResult = true;
        } else {
            jQuery('#result-string').html('Error! Please contact help@quantimo.do');
            window.measurementPostingResult = false;
            console.error(response);
        }
    });
};


jQuery(document).ready(function () {
    Quantimodo.getVariableByName(qmwpShortCodeDefinedVariable, function (variable) {
        if (variable && variable.abbreviatedUnitName == '/5') {
            console.debug('Tracker is set to post measurements for variable:');
            console.debug(variable);
            jQuery('#track-variable-content').show();
            jQuery('#tracked-variable-name').html(variable.name);

            jQuery('.track-icon').click(function (event) {

                onFaceButtonClicked(jQuery(event.currentTarget).data('value'), variable);

            });

        } else {
            console.error(variable);
            alert('Variable: ' + qmwpShortCodeDefinedVariable + '\n can not be tracked with this shortcode.');
        }
    });

});
