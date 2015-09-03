function setMoodButtonListeners() {
    document.getElementById("buttonMoodDepressed").onclick = onMoodButtonClicked;
    document.getElementById("buttonMoodSad").onclick = onMoodButtonClicked;
    document.getElementById("buttonMoodOk").onclick = onMoodButtonClicked;
    document.getElementById("buttonMoodHappy").onclick = onMoodButtonClicked;
    document.getElementById("buttonMoodEcstatic").onclick = onMoodButtonClicked;
}
var onMoodButtonClicked = function () {
    // Figure out what rating was selected
    var buttonId = this.id;
    if (buttonId == "buttonMoodDepressed") {
        var moodValue = 1;
    }
    else if (buttonId == "buttonMoodSad") {
        var moodValue = 2;
    }
    else if (buttonId == "buttonMoodOk") {
        var moodValue = 3;
    }
    else if (buttonId == "buttonMoodHappy") {
        var moodValue = 4;
    }
    else if (buttonId == "buttonMoodEcstatic") {
        var moodValue = 5;
    }
    else {
        console.log("How did I get here...");
        return;
    }
    jQuery("#sectionSendingMood").html("");
    var datet = Math.floor(Date.now() / 1000);
    var measurements = [
        {
            timestamp: datet,
            value: moodValue
        }
    ]
    var mooddata = [{
        measurements: measurements,
        name: "Overall Mood",
        source: "MoodiModo",
        category: "Mood",
        combinationOperation: "MEAN",
        unit: "/5"
    }]
    if (!access_token) {
        window.location.href = "?connect=quantimodo";
    } else {
        jQuery.ajax({
            type: "POST",
            data: JSON.stringify(mooddata),
            url: api_host + "/api/measurements/v2",
            contentType: "application/json",
            headers: {
                "Authorization": "Bearer " + access_token
            },
            success: function (dataString) {
                jQuery("#sectionSendingMood").html("Your Request has been sent!");
                window.measurementPostingResult = true;
                console.log("**mentor_list div updated via ajax.**");
            },
            error: function (dataString) {
                jQuery("#sectionSendingMood").html("Not Authenticated");
                window.measurementPostingResult = false;
                console.log("**mentor_list div updated via ajax.**");
            }
        });
    }
}
jQuery(document).ready(function () {
    setMoodButtonListeners();
});