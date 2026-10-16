package com.gdgisnainital.app;

import android.os.Bundle;
import android.view.View;
import androidx.core.graphics.Insets;
import androidx.core.view.WindowCompat;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Android 14+ edge-to-edge fix
    WindowCompat.setDecorFitsSystemWindows(getWindow(), false);

    // Apply system bar insets to the root view
    View rootView = getWindow().getDecorView();
    ViewCompat.setOnApplyWindowInsetsListener(rootView, (v, insets) -> {
      Insets systemBarsInsets = insets.getInsets(WindowInsetsCompat.Type.systemBars());
      v.setPadding(systemBarsInsets.left,
                   systemBarsInsets.top,
                   systemBarsInsets.right,
                   systemBarsInsets.bottom);
      return insets;
    });
  }
}
