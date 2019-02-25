(function ($) {
  Drupal.behaviors.soundElement = {
    attach: function (context, settings) {
      Drupal.soundrecorder.initialize();

      if (!$('#sound_upload_form').length) {
        $('body').append('<form id="sound_upload_form"></form>');
      }
    },
    detach: function (context, settings) {
    }
  };

  Drupal.soundrecorder = Drupal.soundrecorder || {
    initialize: function() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
         console.log('getUserMedia supported.');
         navigator.mediaDevices.getUserMedia ({audio: true})
           .then(this.bind)
           .catch(function(err) {
             console.log('The following getUserMedia error occured: ' + err);
           }
         );
      } else {
         console.log('getUserMedia not supported on your browser!');
      }
    },
    bind: function(stream) {
      var mediaRecorder = new MediaRecorder(stream);
      var recorderBlock;

      jQuery('.sound-recorder-btn.record').mouseup(function() {


        if (jQuery('.recording').length > 0) {
          if (jQuery(this).hasClass('recording')) {
            mediaRecorder.stop();
            $(this).removeClass('recording');
            return;
          }
          return;
        }
        recorderBlock = jQuery(this).closest('.sound-recorder');
        jQuery(this).addClass('recording');
        mediaRecorder.start();
      });

      var chunks = [];
      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
      }

      mediaRecorder.onstop = function(e) {

        var soundFileName = recorderBlock.find('.sound-recorder-tempname').val();
        var blob = new Blob(chunks, {'type' : 'audio/ogg; codecs=opus'});
        chunks = [];

        var oData = new FormData(sound_upload_form);
        oData.append("audiofile", blob, soundFileName + ".ogg");
        var oReq = new XMLHttpRequest();
        oReq.open("POST", '/sound/upload/temp', true);
        oReq.onload = function(oEvent) {
          if (oReq.status == 200) {
            recorderBlock.find('.play, .delete').removeClass('hidden');
          } else {
            console.log("Error " + oReq.status + " occurred when trying to upload your file.");
          }
        };
        oReq.send(oData);
      }
    },
  };
})(jQuery);
