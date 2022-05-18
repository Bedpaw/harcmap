## Important commands for capacitor:
- `npx cap sync` to synchronise web and android app.
- `npx cap open android` to open android app in Android Studio.
- `npx cap open ios` to open iOS app in Xcode - available only on macOS.
- 
### Run android and iOS after checkout on branch without it
If you check out on branch without android and iOS configuration, run `npx cap init`.

### Generate icons for Android and iOS
`cordova-res` expects a Cordova-like structure: place one icon and one splash screen file in a top-level resources folder within your project, like so:
```
mobile-resources/
├── icon-android.png
├── icon-ios.png
└── splash.png
```
Next, run the following to generate all images then copy them into the native projects:
```bash
npm run make:icons:mobile
```

## Color and styles in android
File for theme colors `client/android/app/src/main/res/values/colors.xml`
File for theme appearance `client/android/app/src/main/res/values/styles.xml`

___
## Website app on mobile device

### Chrome DevTools

#### Prepare device
1. Plug-in your phone to USB port.
2. Go to `Developer options`.
3. Check checkbox labeled `USB debugging`.

#### Forward ports
1. Open Chrome on desktop and put `chrome://inspect` as URL.
2. Click on `Port forwarding...` option.
3. Check checkbox labeled `Enable port forwarding`.
4. Set new port to forward: `3030` to `localhost:3030` and click `Done`.
5. Open Chrome on desktop and put `http://localhost:3030/` as URL.

#### Open DevTools
1. Open Chrome on desktop and put `chrome://inspect` as URL.
2. Find `Remote target` and phone name (e.g. `Mi 9T`).
3. Find `Chrome` - there is list of chrome tabs below.
4. Find tab `HarcMap http://localhost:3030/` and click link below with text `inspect`.

___
## Android app

### Chrome DevTools

#### Virtual android device
1. Open Chrome
2. Put `chrome://inspect` as URL
3. Find `Remote target` and `Android SDK built for x86`.
4. Find `WebView in com.harcmap.app` and click link below with text `inspect`.

#### Real android device

Phone preparation:
1. Open `Developer options` in your phone settings
2. Find section `Debugging` and select options like below:
   1. USB debugging - `true`
   2. UBS debugging (Security settings) - `true`
   3. Select debug app - HarcMap
3. Connect phone to your computer by USB cable
4. After connect phone you'll see `Use USB for` - select option `File Transfer`

DevTools connection:
1. Open Chrome
2. Put `chrome://inspect` as URL
3. Find `Remote target` and your phone name below. For example `Mi 9T`.
4. Find `WebView in com.harcmap.app` and click link below with text `inspect`.


___
## iOS app

### Installation
1. Make `sudo gem install cocoapods --user-install`. Source:
   https://guides.cocoapods.org/using/getting-started.html#installation
2. `npm i` in client dir

### Safari DevTools

#### Virtual android device
1. Open Safari
2. Find and open `Develop` tab
3. Find `Simulator` and click on `localhost` below HarcMap.

#### Real iOS device
// Todo

