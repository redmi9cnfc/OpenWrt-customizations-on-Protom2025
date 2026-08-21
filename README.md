# LuCI Router Banner

A standalone OpenWrt service that replaces the router-name component in LuCI with a configurable animated banner. It is **not a Proton2025 theme** and does not ship Proton2025 files.

## Features

- custom header text
- fallback to the normal router hostname
- multiple visual styles
- multiple animations
- configurable speed and font size
- UCI-backed configuration in `/etc/config/router_banner`
- automatic patching of the active LuCI header template
- backup and restore of the original template
- designed to work with Proton2025 and fall back to common LuCI header templates

## Install from GitHub

After putting this repository on GitHub:

```sh
wget -qO- https://raw.githubusercontent.com/USERNAME/luci-router-banner/main/install.sh | sh
```

Then open **System → Router Banner**.

## Manual install

```sh
scp -r root/* root@192.168.1.1:/
ssh root@192.168.1.1
/etc/init.d/router-banner enable
/etc/init.d/router-banner start
```

## Remove

```sh
/etc/init.d/router-banner stop
/etc/init.d/router-banner disable
/etc/init.d/router-banner uninstall
```

## Important

The service modifies the currently installed LuCI header template because LuCI must load the banner JavaScript on every page. The original file is backed up under `/etc/router-banner/backups/` and is restored by `uninstall`.
