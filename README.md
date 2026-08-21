# LuCI Router Banner

My experimental OpenWrt module that adds a component displaying the router's hostname to the customizable LuCI banner (it doesn't work). This is **not the Proton2025 theme**, and it does not contain any Proton2025 theme files.

## Features

- None so far

## Installation from GitHub

After hosting the repository on GitHub:

```sh
wget -qO- https://raw.githubusercontent.com/redmi9cnfc/OpenWrt-customizations-on-Protom2025/main/install.sh | sh
```

Then navigate to **System → Router Banner**.

## Manual Installation

```sh
scp -r root/* root@192.168.1.1:/
ssh root@192.168.1.1
/etc/init.d/router-banner enable
/etc/init.d/router-banner start
```

## Uninstallation

```sh
/etc/init.d/router-banner stop
/etc/init.d/router-banner disable
/etc/init.d/router-banner uninstall
```

## Important

The service modifies the currently installed LuCI header template, as LuCI needs to load the banner's JavaScript code on every page. The original file is saved as a backup at `/etc/router-banner/backups/` and is restored when the `uninstall` command is run.
