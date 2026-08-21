'use strict';
'require form';

return L.view.extend({
	render: function() {
		var m, s, o;

		m = new form.Map('router_banner', _('Router Banner Settings'), _('Настройки кастомизации баннера и заголовка интерфейса Proton'));

		s = m.section(form.NamedSection, 'main', 'router_banner');

		o = s.option(form.Flag, 'enabled', _('Включить баннер'));
		o.rmempty = false;

		o = s.option(form.Value, 'banner_text', _('Текст в шапке (Вместо Proton)'));
		o.placeholder = 'OpenWrt';
		o.rmempty = false;

		return m.render();
	}
});
