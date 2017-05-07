

This app shows simple weather reports based on the user's location on the map (the location is determined by the center of the screen). A [weather api](https://openweathermap.org/current) is used to retrieve the weather data.

**Important**: This api doesnt have an https version. This is a problem for iPhones as IOS does not allow http by default. To run this program in IOS, one must open the app on xCode, navigate to `info.plist` and add `Allow Arbitrary Loads` under `App Transport Security Settings` and select `YES`.


This **cross-platform** mobile application is written completely in [React-Native](https://facebook.github.io/react-native/), and could be run in both IOS and Android.

To run the app make sure you:

1. Clone the project it in a local repository.
1. If you never ran a React-Native project you need to do some [setup](https://facebook.github.io/react-native/docs/getting-started.html) on your device.
1. Signup for the free [weather map api](https://openweathermap.org/current) and save it in `./src/ApiKey.json`
1. Run the project by navigating to the project directory from the command line and typing:
    * `react-native run-ios` for IOS
    * `react-native run-android` for Android
