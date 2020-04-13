package com.soarables.pickie;

import android.app.Application;

import com.facebook.CallbackManager;
import com.facebook.reactnative.androidsdk.FBSDKPackage;

import com.facebook.react.ReactApplication;
import com.airbnb.android.react.maps.MapsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import me.jhen.react.BadgePackage;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.horcrux.svg.SvgPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.imagepicker.ImagePickerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.rnfs.RNFSPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.magus.fblogin.FacebookLoginPackage;
import io.underscope.react.fbak.RNAccountKitPackage;
import com.smixx.fabric.FabricPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.wix.autogrowtextinput.AutoGrowTextInputPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new BadgePackage(),
                new ReactVideoPackage(),
                new VectorIconsPackage(),
                new SvgPackage(),
                new RNSpinkitPackage(),
                new ReactNativePushNotificationPackage(),
                new MapsPackage(),
                new LinearGradientPackage(),
                new ImageResizerPackage(),
                new ImagePickerPackage(),
                new PickerPackage(),
                new RNI18nPackage(),
                new RNFSPackage(),
                new FBSDKPackage(mCallbackManager),
                new FastImageViewPackage(),
                new FacebookLoginPackage(),
                new RNAccountKitPackage(),
                new FabricPackage(),
                new RNDeviceInfo(),
                new ReactNativeConfigPackage(),
                new RNAdMobPackage(),
                new AutoGrowTextInputPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        if (BuildConfig.DEBUG) {
            StethoWrapper.initialize(this);
            StethoWrapper.addInterceptor();
        }
        SoLoader.init(this, /* native exopackage */ false);
    }
}
