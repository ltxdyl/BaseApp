// 程序入口
var Main = (function () {
    function Main() {
        Laya.init(640, 1136, Laya.WebGL);
        //显示游戏状态信息
        //laya.utils.Stat.show(0, 0);
        //设置适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_TOP;
        //设置横竖屏
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        //资源版本管理
        Laya.ResourceVersion.enable(AppConfig.ResConfigUrl, Handler.create(this, this.completeHandler));
    }
    Main.prototype.completeHandler = function () {
        Laya.loader.load([
            { url: "res/ui/Public@atlas0.png", type: Loader.IMAGE },
            { url: "res/ui/Public.fui", type: Loader.BUFFER },
            { url: "res/ui/Login@atlas0.png", type: Loader.IMAGE },
            { url: "res/ui/Login.fui", type: Loader.BUFFER },
        ], Handler.create(this, this.onLoaded));
    };
    Main.prototype.onLoaded = function () {
        Laya.stage.addChild(GRoot.inst.displayObject);
        this.addPackage();
        this.bindAll();
        WndLogin.GetInst().show();
    };
    ;
    //统一添加UI包
    Main.prototype.addPackage = function () {
        UIPackage.addPackage("res/ui/Public");
        UIPackage.addPackage("res/ui/Login");
    };
    ;
    //统一绑定扩展组件
    Main.prototype.bindAll = function () {
        //UIObjectFactory.setPackageItemExtension("ui://Login/WndLogin", Login.UI_WndLogin);
    };
    return Main;
}());
new Main();
//# sourceMappingURL=Main.js.map