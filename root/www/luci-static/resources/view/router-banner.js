'use strict';
'require form';
'require fs';
return L.view.extend({
	render: function() {
		var m, s, o;
		m = new form.Map('router_banner', _('Router Banner'), _('Настройка надписи в шапке'));
		s = m.section(form.NamedSection, 'main', 'router_banner');
		o = s.option(form.Value, 'banner_text', _('Текст рядом с логотипом'));
		o.placeholder = 'OpenWrt Router';
		m.onSave = function() {
			var val = o.formvalue('main') || 'OpenWrt Router';
			var cssContent = 'header::after, .brand::after, .showSide::after { content: "' + val + '"; display: inline-block !important; margin-left: 12px !important; padding: 2px 8px !important; background-color: #28a745 !important; color: #ffffff !important; font-size: 12px !important; font-weight: bold !important; border-radius: 4px !important; vertical-align: middle !important; }';
			return fs.write('/www/luci-static/resources/router-banner/router-banner.css', cssContent);
		};
		return m.render();
	}
});
