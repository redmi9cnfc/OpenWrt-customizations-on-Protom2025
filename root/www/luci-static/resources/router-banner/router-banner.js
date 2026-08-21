(function() {
	function initBanner() {
		fetch('/cgi-bin/luci/rpc/uci?method=get&params=["router_banner","main"]')
			.then(function(res) { return res.json(); })
			.then(function(data) {
				if (!data || !data.result) return;
				var enabled = data.result.enabled;
				var text = data.result.banner_text;
				if (enabled === '1' && text) {
					var header = document.querySelector('header') || document.querySelector('.main-header') || document.querySelector('.brand');
					if (header) {
						var existBanner = document.getElementById('custom-router-banner-node');
						if (existBanner) {
							existBanner.textContent = text;
							return;
						}
						var bannerNode = document.createElement('span');
						bannerNode.id = 'custom-router-banner-node';
						bannerNode.textContent = text;
						bannerNode.style.display = 'inline-block';
						bannerNode.style.marginLeft = '12px';
						bannerNode.style.padding = '2px 8px';
						bannerNode.style.background = 'rgba(255, 255, 255, 0.15)';
						bannerNode.style.borderRadius = '4px';
						bannerNode.style.color = '#ffffff';
						bannerNode.style.fontSize = '13px';
						bannerNode.style.fontWeight = 'bold';
						bannerNode.style.verticalAlign = 'middle';
						header.appendChild(bannerNode);
					}
				}
			})
			.catch(function(e) {
				console.log('Router Banner error:', e);
			});
	}
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initBanner);
	} else {
		initBanner();
	}
})();
