/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Login;
(function (Login) {
    var UI_WndLogin = (function (_super) {
        __extends(UI_WndLogin, _super);
        function UI_WndLogin() {
            return _super.call(this) || this;
        }
        UI_WndLogin.createInstance = function () {
            return (fairygui.UIPackage.createObject("Login", "WndLogin"));
        };
        UI_WndLogin.prototype.constructFromXML = function (xml) {
            _super.prototype.constructFromXML.call(this, xml);
            this.background = (this.getChild("background"));
            this.btnLogin = (this.getChild("btnLogin"));
            this.btnClose = (this.getChild("btnClose"));
            this.txtUsername = (this.getChild("txtUsername"));
            this.txtPassword = (this.getChild("txtPassword"));
            this.txtFogot = (this.getChild("txtFogot"));
        };
        return UI_WndLogin;
    }(fairygui.GComponent));
    UI_WndLogin.URL = "ui://rck7xt1s11j500";
    Login.UI_WndLogin = UI_WndLogin;
})(Login || (Login = {}));
//# sourceMappingURL=UI_WndLogin.js.map