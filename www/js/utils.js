function saveLocal(key, data) {
  localStorage[key] = JSON.stringify(data);
}

function getBaseUrl() {
  return 'http://charlys.claudiapascualgea.com';
}

function getJSONLocal(key) {

  let result = null;
  try {
    const str_json = localStorage[key];

    if (str_json !== undefined) {

      result = JSON.parse(str_json);
    }

  } catch (e) {}

  return result;
}

function deleteLocal(key) {
  localStorage.removeItem(key);
}