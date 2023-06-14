# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile

-keeppackagenames io.scanbot.sdk.plugin.cordova.**
-keep public class io.scanbot.sdk.plugin.cordova.**{ *; }
-keep public class io.scanbot.sdk.ui.** { *; }

-keep class com.getcapacitor.** { *; }
-keep class com.capacitorjs.** { *; }

-dontwarn org.apache.commons.logging.**

-keep class * implements org.apache.cordova.CordovaPlugin {
    <methods>;
}

-keep class * extends org.apache.cordova.CordovaWebViewClient {
    <methods>;
}

-keep class * extends org.apache.cordova.CordovaActivity {
    <fields>;
    <methods>;
}

-keep class * extends org.apache.cordova.CordovaInterfaceImpl {
    <methods>;
}

-keepattributes *Annotation*
-keepattributes InnerClasses

-dontoptimize
-dontpreverify
