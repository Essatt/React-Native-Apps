# Authentication Component 

![auth-demo](https://cloud.githubusercontent.com/assets/8977795/25770059/83f54410-31f9-11e7-8123-e0f3006ba30f.gif)

This app is an authentication module, utilizing [Firebase](https://firebase.google.com/), that can be integrated into other applications. 

The component's features:

* Accepts an email and a password to authenticate the user.
* The form gets cleared when authentication is successfull.
* If the email is new, the user is automatically signed-up.
* If the email is already in Firebase database and the password is wrong, an error message is displayed.

This **cross-platform** mobile application is written completely in [React-Native](https://facebook.github.io/react-native/), and could be run in both IOS and Android. 

To run the app make sure you:

1. Clone the project it in a local repository.
1. If you never ran a React-Native project you need to do some [setup](https://facebook.github.io/react-native/docs/getting-started.html) on your device.
1. Have a Firebase account (free to get), create a `FirebaseApi.json` file in `./src` directory and paste your Firebase API key information.
1. Run the project by navigating to the project directory from the command line and typing:
    * `react-native run-ios` for IOS
    * `react-native run-android` for Android
