package freecuansite.app;

import android.content.Intent;
import android.net.Uri;
import android.util.Log; // Import the Log class
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    // Tag for logging
    private static final String TAG = "MainActivity";

    @Override
    public void onStart() {
        super.onStart();

        // Get the intent that started this activity
        Intent intent = getIntent();
        Uri data = intent.getData();  // This will capture the deep link URL

        if (data != null) {
            String url = data.toString();
            Log.d(TAG, "Deep Link URL: " + url); // Log the deep link URL

            // Check if the URL contains the "loading" parameter
            if (url.contains("loading")) {
                Log.d(TAG, "Loading parameter found in the URL."); // Log that loading parameter is found
                // Handle the redirect or start a new activity
                navigateToYourApp();  // Replace with your actual navigation logic
            } else {
                Log.d(TAG, "Loading parameter not found in the URL."); // Log that loading parameter is not found
            }
        } else {
            Log.d(TAG, "No deep link data received."); // Log if no data is received
        }
    }

    // Add your custom navigation logic here
    private void navigateToYourApp() {
        // Example: Navigate to a different screen in your app or handle the loading
        Log.d(TAG, "Navigating to your app!"); // Log navigation action
        // Add your navigation logic here (e.g., load a fragment, start another activity, etc.)
    }
}
