include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-router-banner
PKG_VERSION:=1.0.0
PKG_RELEASE:=1

PKG_LICENSE:=Apache-2.0
PKG_MAINTAINER:=Router Banner contributors

include $(INCLUDE_DIR)/package.mk


define Package/luci-app-router-banner
  SECTION:=luci
  CATEGORY:=LuCI
  SUBMENU:=3. Applications
  TITLE:=LuCI Router Banner service
  DEPENDS:=+luci-base
endef

define Package/luci-app-router-banner/description
 Standalone service which replaces the LuCI router hostname component with a configurable animated banner. It is not a LuCI theme.
endef

define Package/luci-app-router-banner/install
	$(CP) ./root/* $(1)/
endef

$(eval $(call BuildPackage,luci-app-router-banner))
