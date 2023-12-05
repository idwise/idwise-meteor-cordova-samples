// eslint-disable-next-line no-undef
// App.setPreference('android-targetSdkVersion', '34');
// App.setPreference('android-compileSdkVersion', '34');
// This controls the live video behaviour on IOS
App.setPreference('AllowInlineMediaPlayback', true);
App.appendToConfig(`
    <platform name="android">
        <config-file parent="/*" target="AndroidManifest.xml">
            <uses-permission android:name="android.permission.CAMERA" />
            <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
        </config-file>
    </platform>
    <edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/application" xmlns:android="http://schemas.android.com/apk/res/android">
        <application android:usesCleartextTraffic="true">
        </application>
    </edit-config>
    
`);
