(function() {
	function initBanner() {
		fetch('/cgi-bin/luci/rpc/uci?method=get&params=["router_banner","main"]')
			.then(function(res) { return res.json(); })
			.then(function(data) {
				if (!data || !data.result) return;
				var enabled = data.result.enabled;
				var text = data.result.banner_text;
				if (enabled === '1' && text) {
					var container = document.querySelector('.brand') || 
					                document.querySelector('.showSide') || 
					                document.querySelector('header .container') ||
					                document.querySelector('header');
					if (container) {
						var existBanner = document.getElementById('custom-router-banner-node');
						if (existBanner) {
							existBanner.textContent = text;
							return;
						}
						var bannerNode = document.createElement('span');
						bannerNode.id = 'custom-router-banner-node';
						bannerNode.textContent = text;
						bannerNode.style.display = 'inline-flex';
						bannerNode.style.alignItems = 'center';
						bannerNode.style.marginLeft = '10px';
						bannerNode.style.padding = '3px 10px';
						bannerNode.style.background = 'rgba(255, 255, 255, 0.2)';
						bannerNode.style.border = '1px solid rgba(255, 255, 255, 0.3)';
						bannerNode.style.borderRadius = '6px';
						bannerNode.style.color = '#ffffff';
						bannerNode.style.fontSize = '12px';
						bannerNode.style.fontWeight = '600';
						bannerNode.style.whiteSpace = 'nowrap';
						container.appendChild(bannerNode);
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
	setTimeout(initBanner, 1000);
})();
