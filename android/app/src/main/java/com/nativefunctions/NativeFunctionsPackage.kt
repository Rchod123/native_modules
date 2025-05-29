package com.nativefunctions

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.nativewallpaper.NativeWallpaperModule

class NativeFunctionsPackage: BaseReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? =
         if(name == NativeFunctionsModule.NAME){
            NativeFunctionsModule(reactContext)
        }else if(name === NativeWallpaperModule.NAME){
             NativeWallpaperModule(reactContext)
        } else {
            null
         }


    override fun getReactModuleInfoProvider()= ReactModuleInfoProvider {
        mapOf(
            NativeFunctionsModule.NAME to ReactModuleInfo(
                name = NativeFunctionsModule.NAME,
                className = NativeFunctionsModule.NAME,
                canOverrideExistingModule = false,
                needsEagerInit = false,
                isCxxModule = false,
                isTurboModule = true
            )
        )

    }
}