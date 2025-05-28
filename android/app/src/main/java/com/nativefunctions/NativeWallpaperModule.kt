package com.nativewallpaper

import android.Manifest
import android.app.Activity
import android.app.WallpaperManager
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.BitmapFactory
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import okio.IOException
import java.io.InputStream
import java.util.concurrent.Executors
import androidx.core.net.toUri
import com.nativefunctions.NativeWallpaperSpec
import java.io.File
import android.net.Uri
import androidx.core.content.FileProvider


class NativeWallpaperModule(readContext: ReactApplicationContext): NativeWallpaperSpec(readContext),
    ActivityEventListener {
    override fun getName() = NAME

    private var wallpaperPromise: Promise? = null
    init {
        readContext.addActivityEventListener(this)
    }
    private var pendingImageUri:String? = null


    override fun setWallpaper(
        imageUri: String?,
        promise: Promise?
    ) {

       if(wallpaperPromise != null){
           promise?.reject("ALREADY_IN_PROGRESS","Wallpaper setting operation already in progress.")
           return
       }
        this.wallpaperPromise = promise
        this.pendingImageUri = imageUri

        val activity = currentActivity
        if(activity == null){
            promise?.reject("NO_ACTIVITY","Current activity is null")
            return
        }

        when{
            ContextCompat.checkSelfPermission(
                activity,
                Manifest.permission.SET_WALLPAPER
            ) == PackageManager.PERMISSION_GRANTED -> {
                setWallpaperInternal(imageUri.toString(),promise)
            }
            else -> {

               promise?.reject("PERMISSION_MISSING","SET_WALLPAPER permission is not granted. Please ensure it's declared in AndroidManifest.xml")
            }
        }


    }

    private fun setWallpaperInternal(imageUri: String, promise: Promise?) {
        val context = reactApplicationContext
        val wallpaperManager = WallpaperManager.getInstance(context)
        var uri: Uri? = null

        // If the imageUri starts with "file://", convert it to a content URI using FileProvider
        uri = if (imageUri.startsWith("file://")) {
            val file = File(Uri.parse(imageUri).path!!)
            FileProvider.getUriForFile(
                context,
                context.packageName + ".fileprovider",
                file
            )
        } else if (imageUri.startsWith("/")) {
            // If it's a raw file path, also convert to content URI
            val file = File(imageUri)
            FileProvider.getUriForFile(
                context,
                context.packageName + ".fileprovider",
                file
            )
        } else {
            // Otherwise, treat as a normal URI (content:// or http://)
            imageUri.toUri()
        }

        Executors.newSingleThreadExecutor().execute {
            var inputStream: InputStream? = null
            try {
                inputStream = context.contentResolver.openInputStream(uri!!)
                if (inputStream == null) {
                    promise?.reject("INVALID_URI", "Could not open input stream for URI: $imageUri")
                    return@execute
                }
                val bitmap = BitmapFactory.decodeStream(inputStream)
                if (bitmap == null) {
                    promise?.reject("DECODE_ERROR", "Could not decode image from URI:$imageUri")
                    return@execute
                }
                wallpaperManager.setBitmap(bitmap)
                promise?.resolve(true)
            } catch (e: IOException) {
                promise?.reject("IO_ERROR", "Error setting wallpaper: ${e.message}", e)
            } finally {
                try {
                    inputStream?.close()
                } catch (e: IOException) {
                    println(e)
                }
                wallpaperPromise = null
            }
        }
    }

    override fun onActivityResult(
        activity: Activity?,
        requestCode: Int,
        resultCode: Int,
        data: Intent?
    ) {
        TODO("Not yet implemented")
    }

    override fun onNewIntent(intent: Intent?) {
        TODO("Not yet implemented")
    }


    companion object{
        const val NAME = "NativeWallpaper"
    }
}