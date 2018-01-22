// 程序入口
class Main{
    constructor()
    {
        Laya.init(640,1136,Laya.WebGL);

        //显示游戏状态信息
        //laya.utils.Stat.show(0, 0);

        //设置适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.alignH =  Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_TOP;

        //设置横竖屏
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;

        //资源版本管理
        Laya.ResourceVersion.enable(AppConfig.ResConfigUrl, Handler.create(this, this.completeHandler));
    }

    completeHandler():void
    {
        Laya.loader.load([
            { url: "res/ui/Public@atlas0.png", type: Loader.IMAGE },
            { url: "res/ui/Public.fui", type: Loader.BUFFER },
            { url: "res/ui/Login@atlas0.png", type: Loader.IMAGE },
            { url: "res/ui/Login.fui", type: Loader.BUFFER },
        ], Handler.create(this, this.onLoaded));
    }


    onLoaded(): void {
        Laya.stage.addChild(GRoot.inst.displayObject);
        this.addPackage();
        this.bindAll();
        WndLogin.GetInst().show()
    };

    //统一添加UI包
    addPackage(): void {
        UIPackage.addPackage("res/ui/Public");
        UIPackage.addPackage("res/ui/Login");
    };

    //统一绑定扩展组件
    bindAll(): void {
        //UIObjectFactory.setPackageItemExtension("ui://Login/WndLogin", Login.UI_WndLogin);
    }
}

new Main();