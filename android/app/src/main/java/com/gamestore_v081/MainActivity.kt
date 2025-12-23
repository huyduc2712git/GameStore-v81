package com.gamestore_v081

import android.os.Bundle
import android.view.WindowInsets
import android.view.WindowInsetsController
import androidx.core.view.WindowCompat
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "GameStore_V081"

  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    // === FULLSCREEN IMMERSIVE MODE ===
    WindowCompat.setDecorFitsSystemWindows(window, false)

    val controller = window.insetsController
    if (controller != null) {
      controller.hide(
        WindowInsets.Type.statusBars() or
        WindowInsets.Type.navigationBars()
      )

      controller.systemBarsBehavior =
        WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
    }
  }

  override fun onWindowFocusChanged(hasFocus: Boolean) {
  super.onWindowFocusChanged(hasFocus)
  if (hasFocus) {
    val controller = window.insetsController
    controller?.hide(WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars())
    controller?.systemBarsBehavior =
      WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
  }
}
}
