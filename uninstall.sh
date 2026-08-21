#!/bin/sh
set -eu

/etc/init.d/router-banner stop >/dev/null 2>&1 || true
/usr/sbin/router-banner restore >/dev/null 2>&1 || true
/etc/init.d/router-banner disable >/dev/null 2>&1 || true
rm -f /etc/init.d/router-banner /usr/sbin/router-banner
rm -f /etc/config/router_banner
rm -f /usr/share/luci/menu.d/luci-app-router-banner.json
rm -f /usr/share/rpcd/acl.d/luci-app-router-banner.json
rm -f /www/luci-static/resources/view/router-banner.js
rm -rf /www/luci-static/resources/router-banner
rm -rf /etc/router-banner
rm -rf /tmp/luci-indexcache* /tmp/luci-modulecache
/etc/init.d/rpcd reload >/dev/null 2>&1 || true
/etc/init.d/uhttpd reload >/dev/null 2>&1 || true
printf '%s\n' 'router-banner: removed.'
