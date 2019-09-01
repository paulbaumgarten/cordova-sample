
/* UTILITY FUNCTIONS */
    
function audioSuccess() {
    let music = document.createElement('audio');
    music.src = "success-beep.mp3";
    music.loop = false;
    music.play();
}
    
function toHexString(byteArray) {
  return byteArray.map(function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');
}    
    
function message( msg ) {
    document.querySelector(".app").innerHTML += "<p>"+msg+"</p>\n";
}

function onTagPresented(e) {
    message("[onTagPresented]");
    console.log("[onTagPresented]");
    if (e.tag) {
        var tagid = toHexString(e.tag.id);
        console.log("[tag id] "+tagid);
        console.log(e);
        message(tagid)
    } else {
        console.log("Error reading tag");
        message("Error reading tag");
    }
}

function main() {
    message("[main]");
    if (typeof nfc !== 'undefined') { // NFC is enabled on our device
        message("[listener added]");
        nfc.addNdefListener(
            onTagPresented, 
            function(){message("NDEF successful");}, 
            function(){message("failed");}
        );
        nfc.addTagDiscoveredListener(
            onTagPresented, 
            function(){message("non-NDEF successful");}, 
            function(){message("failed");}
        );
        nfc.addMimeTypeListener('text/pg',
            onTagPresented,
            function(){message("NDEF mime tags with type text/pg successful");},
            function(){message("failed");}
            );

    } else {
        message("nfc not enabled on this device");
    }
}
    
 
document.addEventListener('deviceready', main, false);
