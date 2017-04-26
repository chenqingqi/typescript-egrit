/**
 * Loading插件
 */
var Loading = (function (_super) {
    __extends(Loading, _super);
    /**
     * 构造函数
     */
    function Loading() {
        _super.call(this);
        this.listen(Config.PROGRESS, this.addUI, this);
        this.listen(Config.COMPLETE, this.removeUI, this);
    }
    var d = __define,c=Loading,p=c.prototype;
    /**
     * 添加UI
     */
    p.addUI = function (e) {
        if (e === void 0) { e = null; }
        if (this.ui == null) {
            this.ui = new LoadingUI();
            this.ui.createUI();
        }
        this.ui.updata(e.data);
    };
    /**
     * 移除UI
     */
    p.removeUI = function (e) {
        if (e === void 0) { e = null; }
        if (this.ui) {
            this.ui.deleteUI();
            this.ui = null;
        }
    };
    return Loading;
})(Notifier);
egret.registerClass(Loading,'Loading');
