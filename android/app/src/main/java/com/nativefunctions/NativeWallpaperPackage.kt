package com.nativewallpaper

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class NativeWallpaperPackage: BaseReactPackage() {
    override fun getModule(
        name: String,
        reactContext: ReactApplicationContext
    ): NativeModule? =
        if(name == NativeWallpaperModule.NAME){
            NativeWallpaperModule(reactContext)
        }else{
            null
        }

    override fun getReactModuleInfoProvider()= ReactModuleInfoProvider {
        mapOf(
            NativeWallpaperModule.NAME to ReactModuleInfo(
                name = NativeWallpaperModule.NAME,
                className = NativeWallpaperModule.NAME,
                canOverrideExistingModule = false,
                needsEagerInit = false,
                isCxxModule = false,
                isTurboModule = true
            )
        )
    }
}