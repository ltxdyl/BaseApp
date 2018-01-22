var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
* fairygui加载器扩展;
*/
var ExLoader = (function (_super) {
    __extends(ExLoader, _super);
    function ExLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExLoader.prototype.loadExternal = function () {
        var urls = this.url.split("//");
        var flag = urls[0];
        //自定义加载外部图片
        if (flag == "tex:") {
            var url = urls[1];
            if (url.lastIndexOf(".png") < 0) {
                url += ".png";
            }
            Laya.loader.load(url, Handler.create(this, this.onCustomLoaded, [url]), null, Laya.Loader.IMAGE);
        }
        else {
            _super.prototype.loadExternal.call(this);
        }
    };
    ExLoader.prototype.onCustomLoaded = function (url) {
        var texture = Laya.loader.getRes(url);
        if (null != texture) {
            this.onExternalLoadSuccess(texture);
        }
        else {
            this.onExternalLoadFailed();
        }
    };
    ExLoader.prototype.FreeExternal = function (texture) {
        texture.destroy();
    };
    return ExLoader;
}(fairygui.GLoader));
//# sourceMappingURL=ExLoader.js.map