package com.dream.spectre;

import android.os.Bundle;
import org.apache.cordova.*;
import com.Method.WebSocket.WebSocketFactory;

public class spectre extends DroidGap
{
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

        super.loadUrl("file:///android_asset/www/index.html");
		appView.addJavascriptInterface(new WebSocketFactory(appView), "WebSocketFactory");
	}

}

