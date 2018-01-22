/*
* fairygui加载器扩展;
*/
class ExLoader extends fairygui.GLoader
{
    protected loadExternal(): void
    {
        var urls: string[] = this.url.split("//");
        var flag: string = urls[0];
        //自定义加载外部图片
        if (flag == "tex:")
        {
            var url: string = urls[1];
            if (url.lastIndexOf(".png") < 0) {
                url += ".png";
            }
            Laya.loader.load(url, Handler.create(this, this.onCustomLoaded, [ url ]), null, Laya.Loader.IMAGE);
        }
        else
        {
            super.loadExternal();
        }
    }

    protected onCustomLoaded(url: string): void
    {
        var texture: Laya.Texture = Laya.loader.getRes(url) as  Laya.Texture;
        if (null != texture) {
            this.onExternalLoadSuccess(texture);
        } else {
            this.onExternalLoadFailed();
        }
    }

    protected FreeExternal(texture: Laya.Texture): void
    {
        texture.destroy();
    }
}