// window.onload = function() {
var videoControls = function() {
    // Video
    var video = document.getElementById("video");

    // Buttons
    var playButton = document.getElementById("play-pause");
    var fullScreenButton = document.getElementById("full-screen");
    var settingsButton = document.getElementById("settings-btn");
    var volumebar = document.getElementById("volume-bar");
    var muteUnmuteBtn = document.getElementById("mute-unmute");

    // Sliders
    var seekBar = document.getElementById("seek-bar");

    // Event listener for the play/pause button
    playButton.addEventListener("click", function() {
        var $el = $(this);
        if (video.paused == true) {
            // Play the video
            video.play();

            playButton.innerHTML = '<i class="fa fa-pause" aria-hidden="true">'
        } else {
            // Pause the video
            video.pause();
            // Update the button text to 'Play'
            playButton.innerHTML = '<i class="fa fa-play" aria-hidden="true">'

        }
    });

    // Event listener for settings button 
    settingsButton.addEventListener("click", function() {
        $('#video-settings').toggle();
    });

    // video element on click events
    video.addEventListener("click", function() {

        if (video.paused == true) {
            video.play();
            playButton.innerHTML = '<i class="fa fa-pause" aria-hidden="true">'
        } else {
            video.pause();
            playButton.innerHTML = '<i class="fa fa-play" aria-hidden="true">'
        }
        $('#video-settings').hide();
    });

    // video element mouseover event
    video.addEventListener("mouseover", function() {
        // $('#video-controls').show();
    });

    // video element mouseout event
    video.addEventListener("mouseleave", function() {
        // $('#video-controls').hide();
    })

    // Event listener to the volumebar
    volumebar.addEventListener("change", function() {
        video.volume = volumebar.value;

        // Unmute the video and update icon
        video.muted = false;
        muteUnmuteBtn.innerHTML = '<i class="fa fa-volume-up" aria-hidden="true">'
    });

    // Event on the muteUnmutebutton
    muteUnmuteBtn.addEventListener("click", function() {
        if (video.muted == false) {
            // Mute the video
            video.muted = true;


            // Update the button icon
            muteUnmuteBtn.innerHTML = '<i class="fa fa-volume-off" aria-hidden="true">'
        } else {
            // Unmute the video
            video.muted = false;

            // Update the button icon 
            muteUnmuteBtn.innerHTML = '<i class="fa fa-volume-up" aria-hidden="true">'
        }
    })

    // Event listener for the full-screen button
    fullScreenButton.addEventListener("click", function() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen(); // Firefox
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen(); // Chrome and Safari
        }
    });


    // Event listener for the seek bar
    seekBar.addEventListener("input", function() {
        // Calculate the new time
        var time = video.duration * (seekBar.value / 100);

        // Update the video time
        video.currentTime = time;
    });


    // Update the seek bar as the video plays
    video.addEventListener("timeupdate", function() {
        // Calculate the slider value
        var value = (100 / video.duration) * video.currentTime;

        // Update the slider value
        seekBar.value = value;
    });

    // Pause the video when the seek handle is being dragged
    seekBar.addEventListener("mousedown", function() {
        video.play();
    });
    $('#video-controls').width($('video').width());
    $('#seek-bar').width($('video').width() - 105);
    $('#video-settings').hide();
}