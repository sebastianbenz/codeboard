//// Initialize Firebase.
var firepadRef = getExampleRef();
// TODO: Replace above line with:
// var ref = new Firebase('<YOUR FIREBASE URL>');

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
};

setKeyMap = function(mode) {
  codeMirror.setOption("keyMap", mode);
  codeMirror.setOption("vimMode", mode == 'vim');
};

shareByMail = function() {
  var subject = 'Join a codeboard';
  var body = 'You have been invited to a codeboard:\n\n' + window.location.href;
  sendMail(subject, body);
};

sendMail = function(subject, body) {
  var link = "mailto:" + 
           "?subject=" + escape(subject) +
           "&body=" + escape(body)
  ;
  window.open(link);
};

$('#share').on('shown.bs.modal', function() {
  $("#share-url").text(window.location.href);
});

$('#share-action').click(function() {
  shareByMail();
});

$(".dropdown-menu li a").click(function() {
  $("." + $(this).attr('class')).removeClass("selected");
  $(this).addClass('selected');
});

window.onload = function() {
  e = $("a[rel=popover]");
  e.popover({
      html:true, 
      trigger:'hover',
      delay: {hide: 500},
      container: e, 
  });
};
