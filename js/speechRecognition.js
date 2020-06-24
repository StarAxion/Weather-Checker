let recButton = document.getElementById("speech-rec"),
  cityNameField = document.getElementById("city-input");

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

recognition.addEventListener('result', function (event) {
  cityNameField.value = Array.from(event.results)
    .map(function (result) {
      return result[0];
    })
    .map(function (result) {
      return result.transcript;
    })
    .join('');

  if (event.results[0].isFinal) {
    recButton.removeAttribute("disabled");
  }
})

if (recButton) {
  function startSpeechRecognition() {
    cityNameField.value = '';
    recButton.setAttribute("disabled", "true");
    recognition.start();
  }

  recButton.addEventListener('click', startSpeechRecognition);
}