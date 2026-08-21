#!/bin/sh
RAW_URL="https://raw.githubusercontent.com/redmi9cnfc/OpenWrt-customizations-on-Protom2025/main"
echo "Загрузка и установка файлов..."
wget -qO /usr/sbin/router-banner "$RAW_URL/root/usr/sbin/router-banner"
wget -qO /etc/init.d/router-banner "$RAW_URL/root/etc/init.d/router-banner"
wget -qO /etc/config/router_banner "$RAW_URL/root/etc/config/router_banner"
mkdir -p /usr/share/luci/menu.d
mkdir -p /usr/share/rpcd/acl.d
mkdir -p /www/luci-static/resources/view
mkdir -p /www/luci-static/resources/router-banner
wget -qO /usr/share/luci/menu.d/luci-app-router-banner.json "$RAW_URL/root/usr/share/luci/menu.d/luci-app-router-banner.json"
wget -qO /usr/share/rpcd/acl.d/luci-app-router-banner.json "$RAW_URL/root/usr/share/rpcd/acl.d/luci-app-router-banner.json"
wget -qO /www/luci-static/resources/view/router-banner.js "$RAW_URL/root/www/luci-static/resources/view/router-banner.js"
wget -qO /www/luci-static/resources/router-banner/router-banner.css "$RAW_URL/root/www/luci-static/resources/router-banner/router-banner.css"
wget -qO /www/luci-static/resources/router-banner/router-banner.js "$RAW_URL/root/www/luci-static/resources/router-banner/router-banner.js"
echo "Настройка прав доступа..."
chmod +x /usr/sbin/router-banner
chmod +x /etc/init.d/router-banner
echo "Запуск службы и обновление LuCI..."
/etc/init.d/router-banner enable
/etc/init.d/router-banner start
rm -rf /tmp/luci-indexcache /tmp/luci-modulecache/
/etc/init.d/rpcd restart
/etc/init.d/uhttpd restart
echo "Установка завершена! Перезагрузите страницу в браузере (Ctrl+F5)."
