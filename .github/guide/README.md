Bruh bruh bruh bruh Discord is now closing consoles

You must edit settings of discord

Here a vid: https://www.youtube.com/watch?v=r6Ssg-3dK_Q

Still does not work ? Maybe BetterDiscord
BetterDiscord also has settings, go to `C:\Users\USERNAME\AppData\Roaming\BetterDiscord\data\stable`
Open `settings.json`
Edit dev part like this:

```json
"developer": {
    "debugLogs": false,
    "devTools": false,
    "debuggerHotkey": false,
    "reactDevTools": false,
    "inspectElement": false,
    "devToolsWarning": false
}
```
In doubt activate all lul