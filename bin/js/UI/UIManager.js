/*
* UI管理器;
*/
var UIManager = (function () {
    function UIManager() {
        this.viewList = {};
    }
    Object.defineProperty(UIManager, "Instance", {
        get: function () {
            if (null == UIManager._instance) {
                UIManager._instance = new UIManager;
            }
            return UIManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化UI管理器
     */
    UIManager.prototype.Initialize = function () {
        fairygui.UIObjectFactory.setLoaderExtension(ExLoader);
        fairygui.UIConfig.defaultFont = AppConst.DefaultFont;
        //fairygui.UIConfig.globalModalWaiting = fairygui.UIPackage.getItemURL("Public", "通用等待界面");
        fairygui.UIConfig.bringWindowToFrontOnClick = false;
        UIExtention.Initialize();
        Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
        UIRegister.RegisterAllUI();
    };
    /**
     * 获取指定UI
     * @param type UI类型
     */
    UIManager.prototype.GetUI = function (type) {
        return this.viewList[type];
    };
    UIManager.prototype.CreateUI = function (type) {
        return eval("new " + type + "(\"" + type + "\")");
    };
    UIManager.prototype.ShowModalWaiting = function () {
        fairygui.GRoot.inst.showModalWait();
    };
    UIManager.prototype.HideModalWaiting = function () {
        fairygui.GRoot.inst.closeModalWait();
    };
    /**
     * 显示指定UI
     * @param type UI类型
     * @param args 参数数组
     */
    UIManager.prototype.Show = function (type, args) {
        var view = this.GetUI(type);
        if (null == view) {
            view = this.CreateUI(type);
            this.viewList[type] = view;
        }
        view.show(args);
    };
    UIManager.prototype.IsShowing = function (type) {
        var view = this.GetUI(type);
        return (null != view && view.isShowing);
    };
    /**
     * 隐藏指定UI
     * @param type UI类型
     */
    UIManager.prototype.Hide = function (type) {
        var view = this.GetUI(type);
        if (null != view) {
            view.hide();
        }
    };
    /**
     * 隐藏所有UI
     */
    UIManager.prototype.HideAll = function () {
        for (var idx in this.viewList) {
            var view = this.viewList[idx];
            if (null != view && view.isShowing) {
                view.hide();
            }
        }
    };
    /**
     * 销毁指定UI
     * @param type UI类型
     */
    UIManager.prototype.Destory = function (type) {
        var view = this.GetUI(type);
        if (null != view) {
            view.Destory();
            delete (this.viewList[type]);
            this.viewList[type] = null;
        }
    };
    /**
     * 处理游戏循环
     */
    UIManager.prototype.Update = function (delta) {
        for (var idx in this.viewList) {
            var view = this.viewList[idx];
            if (null != view && view.isShowing) {
                view.Update(delta);
            }
        }
    };
    return UIManager;
}());
UIManager._instance = null;
//# sourceMappingURL=UIManager.js.map