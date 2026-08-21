'use strict';
'require view';
'require form';
'require uci';

return view.extend({
	load: function() { return uci.load('router_banner'); },
	render: function() {
		var m = new form.Map('router_banner', _('Router Banner'), _('Customize the router name shown in the LuCI header. This is a standalone service and does not replace your LuCI theme.'));
		var s = m.section(form.NamedSection, 'main', 'router_banner', _('Banner'));
		s.addremove = false;
		s.anonymous = true;
		var o;
		o = s.option(form.Flag, 'enabled', _('Enabled')); o.default = '1'; o.rmempty = false;
		o = s.option(form.Value, 'text', _('Custom text')); o.placeholder = _('Router hostname'); o.description = _('Leave empty to use the normal OpenWrt hostname.'); o.maxlength = 80;
		o = s.option(form.ListValue, 'style', _('Style'));
		[['minimal','Minimal'],['neon','Neon'],['glass','Glass'],['cyber','Cyber'],['gradient','Gradient'],['matrix','Matrix'],['terminal','Terminal'],['pill','Pill']].forEach(function(v){ o.value(v[0], _(v[1])); });
		o.default = 'neon';
		o = s.option(form.ListValue, 'animation', _('Animation'));
		[['none','None'],['glow','Soft glow'],['pulse','Pulse'],['scan','Scan line'],['typing','Typing'],['float','Floating'],['gradient','Moving gradient'],['flicker','Cyber flicker']].forEach(function(v){ o.value(v[0], _(v[1])); });
		o.default = 'glow';
		o = s.option(form.ListValue, 'speed', _('Animation speed'));
		[['0.5','Slow'],['1','Normal'],['1.5','Fast'],['2','Very fast']].forEach(function(v){ o.value(v[0], _(v[1])); });
		o.default = '1';
		o = s.option(form.ListValue, 'size', _('Text size'));
		for (var i = 14; i <= 28; i += 2) o.value(String(i), i + ' px');
		o.default = '18';
		o = s.option(form.ListValue, 'position', _('Position'));
		[['left','Left'],['center','Center'],['right','Right']].forEach(function(v){ o.value(v[0], _(v[1])); });
		o.default = 'left';
		return m.render();
	}
});
