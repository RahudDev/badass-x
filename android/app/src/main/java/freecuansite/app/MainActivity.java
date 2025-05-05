package freecuansite.app;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;

import com.getcapacitor.BridgeActivity;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import java.io.IOException;

public class MainActivity extends BridgeActivity {

    private static final String TAG = "MainActivity";
    private static final int RC_SIGN_IN = 9001; // Request code for sign-in intent
    private GoogleSignInClient googleSignInClient;
    private static final String API_URL = "https://apifreecuan.site/api/google-auth"; // Replace with your actual API URL

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Initialize plugins here
        registerPlugin(GoogleAuth.class);

        // Configure Google Sign-In
        configureGoogleSignIn();
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        handleDeepLink(intent); // Handle deep link if activity is already open
    }

    private void configureGoogleSignIn() {
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken("684135355283-64u99lsgun2liict6atftk7gdtdkt9da.apps.googleusercontent.com") // Use your OAuth client ID
                .requestEmail()
                .build();

        googleSignInClient = GoogleSignIn.getClient(this, gso);
        Log.d(TAG, "Google Sign-In Client configured successfully.");
    }

    private void handleDeepLink(Intent intent) {
        Uri data = intent.getData();
        if (data != null) {
            String url = data.toString();
            Log.d(TAG, "Deep Link URL: " + url);
            // Process the deep link as necessary
        } else {
            Log.d(TAG, "No deep link data received.");
        }

        // Attempt to sign in if the GoogleSignInClient is available
        if (googleSignInClient != null) {
            signIn();
        } else {
            Log.e(TAG, "GoogleSignInClient is null. Cannot start sign-in.");
        }
    }

    private void signIn() {
        Intent signInIntent = googleSignInClient.getSignInIntent();
        startActivityForResult(signInIntent, RC_SIGN_IN);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        // Handle the result of the sign-in attempt
        if (requestCode == RC_SIGN_IN) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            handleSignInResult(task);
        }
    }

    private void handleSignInResult(@NonNull Task<GoogleSignInAccount> completedTask) {
        try {
            GoogleSignInAccount account = completedTask.getResult(ApiException.class);
            Log.d(TAG, "Signed in as: " + account.getEmail());
            String idToken = account.getIdToken();
            Log.d(TAG, "ID Token: " + idToken);

            sendAccessTokenToServer(idToken); // Send ID token as accessToken
        } catch (ApiException e) {
            Log.w(TAG, "signInResult:failed code=" + e.getStatusCode());
        }
    }

    private void sendAccessTokenToServer(String accessToken) {
        OkHttpClient client = new OkHttpClient();
        MediaType JSON = MediaType.parse("application/json; charset=utf-8");
        String jsonBody = "{\"accessToken\":\"" + accessToken + "\"}";

        RequestBody body = RequestBody.create(jsonBody, JSON);
        Request request = new Request.Builder()
                .url(API_URL)
                .post(body)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.e(TAG, "Error sending accessToken to server: " + e.getMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
                    Log.d(TAG, "accessToken sent successfully: " + response.body().string());
                } else {
                    Log.e(TAG, "Error in response: " + response.message());
                }
            }
        });
    }
}
