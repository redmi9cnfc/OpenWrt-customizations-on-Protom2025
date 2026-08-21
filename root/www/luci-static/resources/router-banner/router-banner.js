(function() {
	function applyBanner() {
		if (document.getElementById('custom-router-banner-node')) return;
		fetch('/cgi-bin/luci/rpc/uci?method=get&params=["router_banner","main"]')
			.then(function(res) { return res.json(); })
			.then(function(data) {
				if (!data || !data.result) return;
				var enabled = data.result.enabled;
				var text = data.result.banner_text;
				if (enabled === '1' && text) {
					// Ищем стандартные контейнеры шапки
					var target = document.querySelector('header') || 
					             document.querySelector('.brand') || 
					             document.querySelector('.showSide') ||
					             document.querySelector('.main-left');
					if (target && !document.getElementById('custom-router-banner-node')) {
						var bannerNode = document.createElement('div');
						bannerNode.id = 'custom-router-banner-node';
						bannerNode.textContent = text;
						bannerNode.style.cssText = 'display: inline-block !important; margin-left: 15px !important; padding: 3px 10px !important; background: #28a745 !important; color: #ffffff !important; border-radius: 4px !important; font-weight: bold !important; font-size: 13px !important; z-index: 99999 !important; vertical-align: middle !important;';
						target.appendChild(bannerNode);
					}
				}
			})
			.catch(function(e) {});
	}
	setInterval(applyBanner, 2000);
	document.addEventListener("DOMContentLoaded", applyBanner);
	applyBanner();
})();
