'use strict';
'require form';
return L.view.extend({
	render: function() {
		var m, s, o;
		m = new form.Map('router_banner', _('Router Banner'), _('Настройка доп. надписи в шапке интерфейса'));
		s = m.section(form.NamedSection, 'main', 'router_banner');
		o = s.option(form.Flag, 'enabled', _('Включить надпись'));
		o.default = '1';
		o = s.option(form.Value, 'banner_text', _('Текст рядом с логотипом'));
		o.placeholder = 'Мой Роутер';
		return m.render();
	}
});
