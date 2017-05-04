import _ from 'lodash';
import ApiKey from './ApiKey.json';

const kelvinToC = function (kelvin) {
  return `${Math.round(kelvin - 273.15)} ˚C)`;
};

/*this api doesnt have an https version. This is a problem
as IOS does not allow http by default. To run this program one must
open the app on xcode, navigate to info.plist and add "Allow Arbitrary Loads"
under "App Transport Security Settings" and select "YES"
*/

//export this function to be used in app.js
module.exports = function (latitude, longitude) {
  //open weather API
  const rootURL = ApiKey;
  //specific coordinates to pull data from the API
  const url = `${rootURL}&lat=${latitude}&lon=${longitude}`;

  //http call with fetch function
  return (
    fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return {
        city: json.name,
        temperature: kelvinToC(json.main.temp),
        description: _.capitalize(json.weather[0].description)
      };
    })
    //error handling
    .catch((err) => {
      console.log(err);
      return err;
    })
  );
};
