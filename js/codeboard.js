
//// Initialize Firebase.
var firepadRef = getExampleRef();
// TODO: Replace above line with:
// var ref = new Firebase('<YOUR FIREBASE URL>');

//// Create CodeMirror (with line numbers and the JavaScript mode).
var codeMirror = CodeMirror(document.getElementById('firepad-container'), {
  lineNumbers: true,
  matchBrackets: true,
  mode: 'javascript',
  theme: 'solarized dark'
});

//// Create Firepad.
var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror);

//// Initialize contents.
firepad.on('ready', function() {
  if (firepad.isHistoryEmpty()) {
    firepad.setText('function go() {\n  var message = "Hello, world.";\n  console.log(message);\n}');
  }
});

setMode = function(mode) {
  codeMirror.setOption("mode", mode);
  console.log("setting mode to " + mode);
}

setKeyMap = function(mode) {
  codeMirror.setOption("keyMap", mode);
  codeMirror.setOption("vimMode", mode == 'vim');
}

shareByMail = function() {
var subject = 'Join a codeboard';
var body = 'Hello!\n\nYou have been invited to a codeboard:\n\n' + window.location.href + '\n\nHappy coding!';
sendMail(subject, body);
}

sendMail = function(subject, body) {
var link = "mailto:"  
         + "?subject=" + escape(subject)  
         + "&body=" + escape(body)
;
window.open(link, '_blank')
}

// update share location in popup
$('#share').on('shown.bs.modal', function() {
  $("#share-url").text(window.location.href);
})

$(".dropdown-menu li a").click(function(){
  $("." + $(this).attr('class')).removeClass("selected");
  $(this).addClass('selected')
});

window.onload = function() {
e = $("a[rel=popover]")
e.popover({
    html:true, 
    trigger:'hover',
    delay: {hide: 500},
    container: e, 
})
}
