// elements
const userInputEl = document.getElementById("js-input");
const userButtonEl = document.getElementById("js-submit");
const userButtonSaveEl = document.getElementById("js-save");
const selectLangFromEl = document.getElementById("js-lang-from");
const selectLangToEl = document.getElementById("js-lang-to");
const outputTextEl = document.getElementById("js-output-text");

// canvas
const outputEl = document.getElementById("js-output");
const context = outputEl.getContext("2d");

let userText = "";

// API translate func
const getTranslation = async (text, from, to) => {
  let result = "";

  const options = {
    method: "POST",

    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "37cc2137c4mshe381a547fd72629p1dcd8cjsn19fd759ff090",
      "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
    },
    body: `[{"Text":"${text}"}]`,
  };

  await fetch(
    `https://cors-anywhere.herokuapp.com/https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=${to}&api-version=3.0&from=${from}&profanityAction=NoAction&textType=plain`,
    options
  )
    .then((response) => response.json())
    .then((response) => (result += response[0].translations[0].text))
    .catch((err) => console.error(err));
  return result;
};

const changeHandler = (e) => {
  userText = e.target.value;
};

const userParams = {
  from: "",
  to: "",
  finalTranslation: "",
};

const selectFromHandler = (e) => {
  let fromLang = "";
  fromLang += e.target.value;
  userParams.from = fromLang;
};

const selectToHandler = (e) => {
  let toLang = "";
  toLang += e.target.value;
  userParams.to = toLang;
};

const clickHandler = async () => {
  let translatedText = "";
//   clear canvas
  context.clearRect(0, 0, outputEl.width, outputEl.height);

  translatedText += await getTranslation(
    userText,
    userParams.from,
    userParams.to
  );
  userParams.finalTranslation = translatedText;
  translatedText += "";
//   to text element
  outputTextEl.textContent = userParams.finalTranslation;
//   to canvas
  context.font = "18px serif";
  context.fillText(`${outputTextEl.textContent}`, 0, 50, 500);
};

async function saveHandler(e) {
  e.target.innerHTML = "downloading";

  const doc = new jsPDF("l", "pt");

  await html2canvas(outputEl, {
    proxy:
      "https://cors-anywhere.herokuapp.com/https://github.com/niklasvh/html2canvas-proxy-nodejs",
    with: 500,
    allowTaint: true,
    useCORS: true,
  }).then((canvas) => {
      doc.addImage(canvas.toDataURL("image/pdf"), "PDF", 5, 5, 600, 200);
  });

  doc.save("Document.pdf");
  e.target.innerHTML = "save PDF";
  
}


// listeners
userInputEl.addEventListener("change", changeHandler);
userButtonEl.addEventListener("click", clickHandler);
selectLangFromEl.addEventListener("change", selectFromHandler);
selectLangToEl.addEventListener("change", selectToHandler);
userButtonSaveEl.addEventListener("click", saveHandler);

