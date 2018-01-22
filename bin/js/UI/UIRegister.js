/*
* UI资源信息注册;
*/
var UIRegister = (function () {
    function UIRegister() {
    }
    /**
     * 注册所有UI包
     */
    UIRegister.RegisterAllPkg = function () {
        this.RegisterPkg("Extension", "Extension", [
            { url: "res/ui/Extension.fui", type: Laya.Loader.BUFFER },
        ], [
            { res: "3D模型UI容器", type: Extension.Ex3DHolder }
        ]);
    };
    /**
     * 注册所有UI
     */
    UIRegister.RegisterAllUI = function () {
        this.RegisterUI(UIType.PopulationCheckUI, "Population", "户口普查");
    };
    /**
     * 注册UI包
     * @param pkgName 报名
     * @param url 资源路径数组
     */
    UIRegister.RegisterPkg = function (pkgName, srcPkgName, url, items) {
        if (items === void 0) { items = undefined; }
        var source = this.GetPkgSource(pkgName);
        source["name"] = pkgName;
        source["srcName"] = srcPkgName;
        source["url"] = url;
        source["items"] = items;
        source["isLoaded"] = false;
        source["isAdded"] = false;
    };
    UIRegister.GetPkgSource = function (pkgName) {
        var source = this.GetRegPkgSource(pkgName);
        if (null == source) {
            source = {};
            this.regPkgSources[pkgName] = source;
        }
        return source;
    };
    UIRegister.GetRegPkgSource = function (pkgName) {
        return this.regPkgSources[pkgName];
    };
    UIRegister.GetRegPkgUrl = function (pkgName, urls) {
        if (undefined == urls) {
            return;
        }
        var source = this.GetRegPkgSource(pkgName);
        if (undefined == source || undefined == source.url) {
            return;
        }
        for (var i = 0, n = source.url.length; i < n; i++) {
            urls.push(source.url[i]);
        }
    };
    /**
     * 注册UI资源
     * @param type UI类型
     * @param pkgName UI资源包名称
     * @param resName UI资源名称
     */
    UIRegister.RegisterUI = function (type, pkgName, resName) {
        var source = this.GetUISource(type);
        source["type"] = type;
        source["pkg"] = pkgName;
        source["res"] = resName;
    };
    /**
     * 获取UI注册信息
     * @param type UI类型
     */
    UIRegister.GetUISource = function (type) {
        var source = this.GetRegUISource(type);
        if (null == source) {
            source = {};
            this.regUISources[type] = source;
        }
        return source;
    };
    UIRegister.GetRegUISource = function (type) {
        return this.regUISources[type];
    };
    UIRegister.AddUIPackage = function (pkgName) {
        var pkgSource = this.GetRegPkgSource(pkgName);
        if (undefined == pkgSource || !pkgSource.isLoaded) {
            return;
        }
        fairygui.UIPackage.addPackage(AppConst.UIDir + pkgSource.name);
        if (undefined != pkgSource.items && pkgSource.items.length > 0) {
            for (var i = 0, n = pkgSource.items.length; i < n; i++) {
                var item = pkgSource.items[i];
                fairygui.UIObjectFactory.setPackageItemExtension("ui://" + pkgSource.srcName + "/" + item.res, item.type);
            }
        }
    };
    return UIRegister;
}());
UIRegister.regPkgSources = {};
UIRegister.regUISources = {};
//# sourceMappingURL=UIRegister.js.map