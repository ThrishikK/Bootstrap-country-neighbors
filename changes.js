const URL_BY_NAME = "https://restcountries.com/v3.1/name";
const URL_BY_CODE = "https://restcountries.com/v3.1/alpha";

// NEIGHBOR COUNTRY DATA EXTRACTION
function dataExtractionNeighborCountry(data) {
  const countryData = data[0];
  const countryName = countryData.name.common;
  console.log(countryName);
}

// FETCH BY CODE
function fetchByCode(countryCode, givenCountryName) {
  fetch(`${URL_BY_CODE}/${countryCode}`)
    .then(function (response) {
      // COUNTRY NAME NOT FOUND
      if (response.ok === false) {
        throw new Error("Check the Country spelling once.");
      }
      return response.json();
    })
    .then(function (data) {
      dataExtractionNeighborCountry(data);
    })
    .catch(function (error) {
      console.log(error.message);
    });
}

// MAIN COUNTRY DATA EXTRACTION
function dataExtractionMainCountry(data, givenCountryName) {
  const countryData = data;
  const countryName = countryData.name.common;
  if (countryData.borders === undefined) {
    throw new Error(
      `${givenCountryName} an island nation.
These countries are entirely surrounded by water, such as oceans, seas, or gulfs. `
    );
  } else {
    const borderCodes = countryData.borders;
    console.log(countryData.borders);
    // LOOPING BORDER CODES
    borderCodes.forEach((eachCode) => {
      fetchByCode(eachCode, givenCountryName);
    });
  }
}

// GET COMMON NAMES
function getCommonNames(data, givenCountryName) {
  const commomNamesList = data.map((eachObj) => eachObj.name.common);
  const requiredIndex = commomNamesList.findIndex(
    (eachName) => eachName === givenCountryName
  );
  return requiredIndex;
}

// FETCH BY COUNTRY NAME

function fetchByName(givenCountryName) {
  fetch(`${URL_BY_NAME}/${givenCountryName}`)
    .then(function (response) {
      // COUNTRY NAME NOT FOUND
      if (response.ok === false) {
        throw new Error("Check the Country spelling once.");
      }
      return response.json();
    })
    .then(function (data) {
      const requiredIndex = getCommonNames(data, givenCountryName);
      dataExtractionMainCountry(data[requiredIndex], givenCountryName);
    })
    .catch(function (error) {
      console.log(error.message);
    });
}

let givenCountryName = "Singapore";

fetchByName(givenCountryName);
