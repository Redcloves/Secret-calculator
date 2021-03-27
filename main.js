var result = document.getElementById("result");
var voice = document.getElementById("voice");
var hint = document.getElementById("hint");

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var recognition = new SpeechRecognition();
var synth = window.speechSynthesis;

var operators = {'times': '*', 'time': '*', 'x':'*', '/': '/', 'by': '/', 'plus': '+', '+':'+',
'minus':'-', '-':'-','squared': '**2', 'cube':'**3', 'power':'**', '^':'**', 'half': '0.5'};

recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = 'en-US';
recognition.maxAlternatives = 1;

function speak(word) {
    utterance = new SpeechSynthesisUtterance(word);
    utterance.pitch = 1.0;
    utterance.rate = 1.1;
    synth.speak(utterance);
}

hint.onclick = function() {
    hint.innerHTML = "Click anywhere &#128522;";
}

voice.onclick = function() {
    recognition.start();
}

recognition.onend = function() {
    speak("Disconnected");
}

recognition.onresult = function(event) {

    const keys = Object.keys(operators);

    for (var i = event.resultIndex; i < event.results.length; ++i){
        if (event.results[i].isFinal){
            var raw = event.results[i][0].transcript;
            var changed = event.results[i][0].transcript;
            var list = raw.split(" ");

            for( var i = 0; i < list.length; i++){
                let parsed = parseInt(list[i]);

                if ( keys.includes(list[i]) ){
                    changed = changed.replace(list[i], operators[list[i]]);
                }

                if ( isNaN(parsed) && !(keys.includes(list[i]))) {
                    changed = changed.replace(list[i], '');
                }
             }

            let sum = eval(changed);
            speak(sum);
            result.innerHTML = "Result: " +changed + " = " + sum;

        }
    }
}

