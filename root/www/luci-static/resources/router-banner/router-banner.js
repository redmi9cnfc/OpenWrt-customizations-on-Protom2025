'use strict';
(function() {
	if (window.__routerBannerLoaded) return;
	window.__routerBannerLoaded = true;

	function start() {
		if (!window.uci || !document.querySelector) return;

		window.uci.load('router_banner').then(function() {
			var enabled = window.uci.get('router_banner', 'main', 'enabled');
			if (enabled === '0') return;

			var host = document.querySelector('.hostname');
			if (!host) return;
			var link = host.querySelector('a') || host;
			var original = (link.textContent || '').trim();
			var custom = window.uci.get('router_banner', 'main', 'text') || '';
			var style = window.uci.get('router_banner', 'main', 'style') || 'neon';
			var animation = window.uci.get('router_banner', 'main', 'animation') || 'glow';
			var speed = window.uci.get('router_banner', 'main', 'speed') || '1';
			var size = window.uci.get('router_banner', 'main', 'size') || '18';
			var position = window.uci.get('router_banner', 'main', 'position') || 'left';
			var text = custom.trim() || original;

			link.textContent = text;
			host.classList.add('router-banner', 'router-banner-style-' + style, 'router-banner-animation-' + animation);
			host.dataset.routerBannerText = text;
			host.style.setProperty('--router-banner-speed', speed + 's');
			host.style.setProperty('--router-banner-size', Math.max(12, Math.min(40, parseInt(size, 10) || 18)) + 'px');
			host.style.setProperty('--router-banner-position', position);
			link.setAttribute('aria-label', text);

			if (animation === 'typing') {
				link.textContent = '';
				var index = 0;
				var tick = function() {
					if (index <= text.length) {
						link.textContent = text.slice(0, index);
						index++;
						setTimeout(tick, Math.max(20, 90 / Math.max(0.25, parseFloat(speed))));
					}
				};
				tick();
			}
		});
	}

	if (document.readyState === 'loading')
		document.addEventListener('DOMContentLoaded', start);
	else
		start();
})();
