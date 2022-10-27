#!/usr/bin/env bash

## by @AbdelrhmanNile
## based on one of @adi1090x rofi launchers

# >> Created and tested on : rofi 1.6.0-1

theme="style"
dir="$HOME/.config/rofi/launchers/nvidia"

# dark
ALPHA="#00000000"
BG="#1e222a"
FG="#FFFFFFff"
SELECT="#3e4451"


# accent colors
COLORS=('#98c379')
ACCENT="${COLORS[0]}ff"

# overwrite colors file
cat > $dir/colors.rasi <<- EOF
	/* colors */

	* {
	  al:  $ALPHA;
	  bg:  $BG;
	  se:  $SELECT;
	  fg:  $FG;
	  ac:  $ACCENT;
	}
EOF


prime-run rofi -no-lazy-grab -show drun -modi drun -theme $dir/"$theme"
