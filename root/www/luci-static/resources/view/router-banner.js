'use strict';
'use require view';
'use require form';
'use require uci';
return view.extend({
	render: function() {
		var m, s, o;
		m = new form.Map('router_banner', _('Информационное табло (Router Banner)'),
			_('Здесь вы можете установить кастомное сообщение, которое будет отображаться в интерфейсе роутера.'));
		s = m.section(form.NamedSection, 'main', 'router_banner', _('Текущее объявление'));
		s.anonymous = true;
		s.render = function() {
			var enabled = uci.get('router_banner', 'main', 'enabled') || '1';
			var msg = uci.get('router_banner', 'main', 'custom_message') || 'Сообщение не задано';
			var style = uci.get('router_banner', 'main', 'banner_style') || 'info';
			if (enabled !== '1') {
				return E('div', { 'class': 'alert-message warning' }, [
					E('p', {}, _('Баннер отключен в настройках ниже.'))
				]);
			}
			var alertClass = 'alert-message ' + style;
			return E('div', { 'class': alertClass, 'style': 'margin-bottom: 20px; font-size: 1.1em;' }, [
				E('h3', { 'style': 'margin-top: 0;' }, '📢 ' + _('Заметка для пользователей')),
				E('p', { 'style': 'white-space: pre-wrap; margin-bottom: 0;' }, msg)
			]);
		};
		s = m.section(form.NamedSection, 'main', 'router_banner', _('Настройки сообщения'));
		o = s.option(form.Flag, 'enabled', _('Включить баннер'));
		o.rmempty = false;
		o = s.option(form.ListValue, 'banner_style', _('Тип уведомления'));
		o.value('info', _('Информация (Синий)'));
		o.value('warning', _('Предупреждение (Желтый)'));
		o.value('error', _('Важно / Ошибка (Красный)'));
		o.default = 'info';
		o = s.option(form.TextValue, 'custom_message', _('Текст объявления'));
		o.rows = 4;
		o.placeholder = _('Введите ваш текст здесь...');
		o.rmempty = false;
		return m.render();
	}
});
