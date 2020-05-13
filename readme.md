# Call widget

## Usage

1. Embed the call-widget js file in your HTML code.
2. Add this code to your HTML file <code> &lt;div id="call-widget"&gt;&lt;/div&gt;</code> . This is a placeholder for the call widget.
3. You're good to go. :thumbsup:

## Cross browser compatibility:

Code is written in ES6 standard.
No use of polyfills has been made to support older browsers.
This code has been tested in -

1.  Google Chrome v81.0.4044.138 (64-bit),
2.  Mozilla Firefox v76.0.1 (64-bit),
3.  Apple Safari Version 13.0.5 (15608.5.11)

# Tracking Widget

## Usage

1. Embed the call-widget js file in your HTML code.
2. Add this code to your HTML file <code> &lt;div id="tracking-widget"&gt;&lt;/div&gt;</code> . This is a placeholder for the reporting popup widget.
3. When ever you link the tracked page on a different website, make sure you set the <code>referral_domain</code> url param in the page link to enable referer tracking.

4. That's it. :thumbsup:

## Report coverage:

1.  The reporting script can track the follwing browsers - Chrome, Firefox, Opera, IE, Edge, Safari, Chromium,
2.  These validations are made according to MDNs definition of user agent strings and were working flawlessly at the time of implementation. MDN Reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent (User-agent strings are subject to change and hence, should be monitored.)
3.  The script detects if the user is on a mobile platform, the platforms being limited to Android, Blackberry, WebOS, Windows Phone (untested except for Android and iOS)
4.  Guest user is tracked based on values logged in local storage. Clearing the values manually will reset the visitor counter and fail to track the user as returning.
5.  Referral domain can only be detected if the referral page initiating the pageload sends in a url parameter <code>referral_domain</code>

## Notes:

The code is written in ES6 standard.  
No use of polyfills has been made to support older browsers.  
 @Author: Abhishek Rajeshirke arajeshirke79@gmail.com
