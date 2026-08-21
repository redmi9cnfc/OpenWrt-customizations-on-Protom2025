#!/bin/sh
echo "Загрузка пакета..."
wget -qO /tmp/router-banner.tar.gz https://github.com/redmi9cnfc/OpenWrt-customizations-on-Protom2025/raw/main/router-banner.tar.gz

if [ ! -f /tmp/router-banner.tar.gz ]; then
    echo "Ошибка: не удалось скачать файл!"
    exit 1
fi


echo "Установка файлов..."
tar -xzf /tmp/router-banner.tar.gz -C /


rm -f /tmp/router-banner.tar.gz


echo "Настройка прав доступа..."
chmod +x /usr/sbin/router-banner 2>/dev/null[cite: 1]
chmod +x /etc/init.d/router-banner 2>/dev/null[cite: 1]


echo "Запуск службы..."
/etc/init.d/router-banner enable 2>/dev/null[cite: 1]
/etc/init.d/router-banner start 2>/dev/null[cite: 1]


echo "Обновление LuCI..."
rm -rf /tmp/luci-indexcache /tmp/luci-modulecache/
/etc/init.d/rpcd restart
/etc/init.d/uhttpd restart

echo "Установка успешно завершена! Обновите страницу в браузере (Ctrl+F5)."
