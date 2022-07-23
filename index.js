const userInputEl = document.getElementById("js-input");
const userButtonEl = document.getElementById("js-submit");
const selectLangFromEl = document.getElementById("js-lang-from");
const selectLangToEl = document.getElementById("js-lang-to");
const outputEl = document.getElementById("js-output");

let userText = "";

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
  console.log(userParams);
  let translatedText = "";

  translatedText += await getTranslation(
    userText,
    userParams.from,
    userParams.to
  );
  userParams.finalTranslation = translatedText;
  //   console.log(translatedText);
  translatedText += "";
  outputEl.textContent = userParams.finalTranslation;
};

userInputEl.addEventListener("change", changeHandler);
userButtonEl.addEventListener("click", clickHandler);

selectLangFromEl.addEventListener("change", selectFromHandler);
selectLangToEl.addEventListener("change", selectToHandler);
