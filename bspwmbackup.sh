#!/bin/bash

# this is a script to backup my bspwm setup

if [[ -d ~/mydots ]]; then
  rm -r ~/mydots
fi
mkdir mydots

  #bspwm
cp -r ~/.config/bspwm ~/mydots/bspwm
  #polybar
cp -r ~/.config/polybar ~/mydots/polybar
  #sxhkd
cp -r ~/.config/sxhkd ~/mydots/sxhkd
  #picom
cp -r ~/.config/picom ~/mydots/picom
  #ranger
cp -r ~/.config/ranger ~/mydots/ranger
  #rofi
cp -r ~/.config/rofi ~/mydots/rofi
  #neovim
  #cp -r ~/.config/nvim ~/mydots/nvim
  #dunst
cp -r ~/.config/dunst ~/mydots/dunst
  #.zshrc
cp ~/.zshrc ~/mydots
  #.Xmodmap
cp ~/.Xmodmap ~/mydots
  #.Xresources
cp ~/.Xresources ~/mydots
  #backupscript
cp ~/bspwmbackup.sh ~/mydots

cp -r ~/.config/alacritty ~/mydots/alacritty

cp -r ~/.config/kitty ~/mydots/kitty

cp -r ~/.config/gtk-2.0 ~/mydots/gtk-2.0
cp -r ~/.config/gtk-3.0 ~/mydots/gtk-3.0

cp -r ~/.config/Thunar ~/mydots/Thunar
cp -r ~/.config/xfce4 ~/mydots/xfce4
