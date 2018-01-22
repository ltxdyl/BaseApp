var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UIState;
(function (UIState) {
    UIState[UIState["None"] = 0] = "None";
    UIState[UIState["Loading"] = 1] = "Loading";
    UIState[UIState["Ready"] = 2] = "Ready";
})(UIState || (UIState = {}));
/*
* UI基类;
*/
var BaseUI = (function (_super) {
    __extends(BaseUI, _super);
    function BaseUI(type) {
        var _this = _super.call(this) || this;
        _this.state = UIState.None;
        _this.type = type;
        return _this;
    }
    Object.defineProperty(BaseUI.prototype, "Type", {
        /**
         * UI类型
         */
        get: function () {
            return this.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseUI.prototype, "State", {
        /**
         * UI当前状态
         */
        get: function () {
            return this.state;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 显示UI
     * @param args 参数数组
     */
    BaseUI.prototype.show = function (args) {
        if (this.state == UIState.None) {
            UIManager.Instance.ShowModalWaiting();
            this.state = UIState.Loading;
            this.load(args);
        }
        else if (this.state == UIState.Ready) {
            if (!this.isShowing) {
                this.onShowParams(args);
                _super.prototype.show.call(this);
            }
        }
    };
    BaseUI.prototype.load = function (args) {
        var uiSource = UIRegister.GetRegUISource(this.type);
        if (null == uiSource) {
            UIManager.Instance.HideModalWaiting();
            console.error("ui " + this.type + ": register ui is null.");
            return;
        }
        var pkgSource = UIRegister.GetRegPkgSource(uiSource.pkg);
        if (null == pkgSource) {
            UIManager.Instance.HideModalWaiting();
            console.error("pkg " + uiSource.pkg + ": register pkg is null.");
            return;
        }
        if (pkgSource.isLoaded) {
            this._show(args);
        }
        else {
            Laya.loader.load(pkgSource.url, Laya.Handler.create(this, this.onLoaded, [pkgSource, args]));
        }
    };
    /**
     *
     * @param args
     */
    BaseUI.prototype._show = function (args) {
        UIManager.Instance.HideModalWaiting();
        this.state = UIState.Ready;
        this.show(args);
    };
    /**
     * 资源加载结束回调
     * @param args 显示参数
     */
    BaseUI.prototype.onLoaded = function (pkgSource, args) {
        pkgSource.isLoaded = true;
        UIRegister.AddUIPackage(pkgSource.name);
        this._show(args);
    };
    /**
     * 隐藏UI
     */
    BaseUI.prototype.hide = function () {
        if (this.isShowing) {
            _super.prototype.hide.call(this);
        }
    };
    /**
     * 销毁
     */
    BaseUI.prototype.Destory = function () {
        this.hide();
        this.unload;
        this.dispose();
        this.state = UIState.None;
    };
    BaseUI.prototype.unload = function () {
        var uiSource = UIRegister.GetRegUISource(this.type);
        if (null == uiSource) {
            return;
        }
        var pkgSource = UIRegister.GetRegPkgSource(uiSource.pkg);
        if (null == pkgSource) {
            return;
        }
        if (pkgSource.isLoaded) {
            var pkg = fairygui.UIPackage.getByName(pkgSource.name);
            if (null != pkg) {
                fairygui.UIPackage.removePackage(pkg.id);
            }
            for (var i = 0; i < pkgSource.url.length; i++) {
                var url = pkgSource.url[i].url;
                Laya.loader.clearRes(url);
            }
            pkgSource.isLoaded = false;
        }
    };
    /**
     * UI初始化接口
     */
    BaseUI.prototype.onInit = function () {
        var source = UIRegister.GetRegUISource(this.Type);
        var pkg = UIRegister.GetRegPkgSource(source.pkg);
        this.contentPane = fairygui.UIPackage.createObject(pkg.srcName, source.res).asCom;
        var autoCloseButton = (this.contentPane.getChild("autoCloseButton"));
        if (undefined != autoCloseButton) {
            autoCloseButton.onClick(this, this.onClickAutoCloseBtn);
        }
    };
    BaseUI.prototype.onClickAutoCloseBtn = function () {
        UIManager.Instance.Hide(this.type);
    };
    /**
     * 传参接口
     * @param args
     */
    BaseUI.prototype.onShowParams = function (args) {
    };
    /**
     * 处理游戏循环
     */
    BaseUI.prototype.Update = function (delta) {
    };
    return BaseUI;
}(WindowBase));
//# sourceMappingURL=BaseUI.js.map