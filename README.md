This is a scoreboard system for football/soccer for livestrams via OBS.

This system is no longer maintained (no major and minor updates).

Written by Sebastian Zöchbauer, Pyhton-Skript bei Prof. Hofer (SZ-Funkt)

Required Hard/Software:
- Python
- OBS Studio
- Webbrowser
- Touchscreen
- Internet Connection
- Loveable App provided by the event organizers

USAGE:
1) Download the repository
2) Add an OBS-Browser-Source and set the resolution to 3840x1080p. Be sure that the streaming canvas is set to 1920x1080p. Select the file index.html as the source.
3) Scale the source so that the left half fills the streaming canvas perfectly. The right half of the source should overshoot on the right side of the streaming canvas.
4) Open up the browser-preview of OBS, so that you can interact with the source. Connect a touchscreen and drag the right half of the preview window onto this second screen.
5) Start the script /controls/PlayerScores/start-script.bat and replace all the needed paths to connect with Google Drive and the Loveable Backend provided by the event organizers.

You are now able to control the scoreboard-overlay via the controls on the touchscreens.

This tool was used during the 2025 Soccer-Tournament at SZ-Ybbs.
