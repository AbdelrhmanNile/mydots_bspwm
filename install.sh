#!/bin/bash

install_deps(){
  sudo pacman -S bspwm polybar picom nvim ranger zsh rofi alacritty dunst sxhkd feh ibus 
}

copy_dots(){

  cp -b .Xmodmap /home/$USER/
  cp -b .Xresources /home/$USER/
  cp -b .zshrc /home/$USER

  cp -ba .config/. /home/$USER/.config/
  cp -a fonts/. /home/$USER/.local/share/fonts/
  sudo cp -a gtk/. /usr/share/themes/
}


