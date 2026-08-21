#!/bin/sh
set -eu

# Set this to the final GitHub repository before publishing.
REPO_URL="${REPO_URL:-https://github.com/USERNAME/luci-router-banner}"
BRANCH="${BRANCH:-main}"
TMP="/tmp/luci-router-banner-install.$$"

cleanup() { rm -rf "$TMP"; }
trap cleanup EXIT INT TERM

mkdir -p "$TMP"

fetch() {
	url="$1"; out="$2"
	if command -v uclient-fetch >/dev/null 2>&1; then
		uclient-fetch -q -O "$out" "$url"
	elif command -v wget >/dev/null 2>&1; then
		wget -q -O "$out" "$url"
	else
		echo "router-banner: uclient-fetch or wget is required" >&2
		exit 1
	fi
}

ARCHIVE="$TMP/source.tar.gz"
fetch "$REPO_URL/archive/refs/heads/$BRANCH.tar.gz" "$ARCHIVE"

tar -xzf "$ARCHIVE" -C "$TMP"
ROOT=$(find "$TMP" -mindepth 1 -maxdepth 1 -type d | head -n 1)

[ -d "$ROOT/root" ] || { echo "router-banner: invalid repository archive" >&2; exit 1; }

cp -a "$ROOT/root/." /
chmod +x /etc/init.d/router-banner /usr/sbin/router-banner

uci -q get router_banner.main.enabled >/dev/null 2>&1 || {
	uci set router_banner.main=router_banner
	uci set router_banner.main.enabled='1'
	uci set router_banner.main.text=''
	uci set router_banner.main.style='neon'
	uci set router_banner.main.animation='glow'
	uci set router_banner.main.speed='1'
	uci set router_banner.main.size='18'
	uci set router_banner.main.position='left'
	uci commit router_banner
}

/etc/init.d/router-banner enable
/etc/init.d/router-banner restart
/etc/init.d/rpcd reload >/dev/null 2>&1 || true
/etc/init.d/uhttpd reload >/dev/null 2>&1 || true

printf '%s\n' 'router-banner: installed successfully.'
printf '%s\n' 'Open LuCI -> System -> Router Banner.'
