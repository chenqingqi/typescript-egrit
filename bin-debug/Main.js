/**
 * 文档类 - 程序入口
 */
var Main = (function (_super) {
    __extends(Main, _super);
    /**
     * 构造函数
     */
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    /**
     * 获得舞台
     */
    p.onToStage = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onToStage, this);
        Main.stage = this.stage;
        this.regplugin();
    };
    /**
     * 注册插件
     */
    p.regplugin = function () {
        //Loading
        new Loading();
        //加载配置文件
        new Config();
    };
    return Main;
})(egret.DisplayObjectContainer);
egret.registerClass(Main,'Main');
