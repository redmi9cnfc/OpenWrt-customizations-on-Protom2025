#!/bin/sh

RAW_URL="https://raw.githubusercontent.com/redmi9cnfc/OpenWrt-customizations-on-Protom2025/main"
echo "Kit here, and this is my experimental module for OpenWrt)"
echo "Установка стилей баннера..."
mkdir -p /www/luci-static/resources/router-banner
wget -qO /etc/config/router_banner "$RAW_URL/root/etc/config/router_banner"
wget -qO /www/luci-static/resources/router-banner/router-banner.css "$RAW_URL/root/www/luci-static/resources/router-banner/router-banner.css"
mkdir -p /usr/share/luci/menu.d
mkdir -p /usr/share/rpcd/acl.d
mkdir -p /www/luci-static/resources/view
wget -qO /usr/share/luci/menu.d/luci-app-router-banner.json "$RAW_URL/root/usr/share/luci/menu.d/luci-app-router-banner.json"
wget -qO /usr/share/rpcd/acl.d/luci-app-router-banner.json "$RAW_URL/root/usr/share/rpcd/acl.d/luci-app-router-banner.json"
wget -qO /www/luci-static/resources/view/router-banner.js "$RAW_URL/root/www/luci-static/resources/view/router-banner.js"
HEADER_FILE="/usr/lib/lua/luci/view/header.htm"
if [ -f "$HEADER_FILE" ]; then
    if ! grep -q "router-banner.css" "$HEADER_FILE"; then
        sed -i '/<\/head>/i <link rel="stylesheet" href="\/luci-static\/resources\/router-banner\/router-banner.css">' "$HEADER_FILE"
    fi
fi
rm -rf /tmp/luci-indexcache /tmp/luci-modulecache/
/etc/init.d/rpcd restart
/etc/init.d/uhttpd restart
echo "Готово! Стили подключены."
