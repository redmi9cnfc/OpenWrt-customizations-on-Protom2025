document.addEventListener("DOMContentLoaded", function() {
	if (window.L && L.uci) {
		L.uci.load('router_banner').then(function() {
			var enabled = L.uci.get('router_banner', 'main', 'enabled');
			var customText = L.uci.get('router_banner', 'main', 'banner_text');
			if (enabled === '1' && customText) {
				var brandElements = document.querySelectorAll('.brand, .uci-brand, header a, .showSide');
				brandElements.forEach(function(el) {
					if (el && (el.children.length === 0 || el.querySelector('span'))) {
						el.textContent = customText;
					}
				});
			}
		});
	}
});
