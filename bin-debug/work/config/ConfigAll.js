/**
 * 加载资源及配置文件
 */
var ConfigAll = (function (_super) {
    __extends(ConfigAll, _super);
    /**
     * 构造函数
     */
    function ConfigAll() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=ConfigAll,p=c.prototype;
    /**
     * 开始加载
     */
    p.init = function () {
        this.resgroup = new RESGroup();
        this.resgroup.addEventListener(RESGroup.COMPLETE, this.onComplete, this);
        this.resgroup.addEventListener(RESGroup.ERROR, this.onError, this);
        this.resgroup.addEventListener(RESGroup.PROGRESS, this.onProgress, this);
        this.resgroup.load("resource/resource.json", "resource/");
    };
    /**
     * 加载失败
     */
    p.onError = function (e) {
        console.log(e.data);
    };
    /**
     * 加载进度
     */
    p.onProgress = function (e) {
        this.call(ConfigAll.PROGRESS, e.data);
    };
    /**
     * 加载成功
     */
    p.onComplete = function (e) {
        console.log("配置文件及资源加载成功");
        this.resgroup.removeEventListener(RESGroup.COMPLETE, this.onComplete, this);
        this.resgroup.removeEventListener(RESGroup.ERROR, this.onError, this);
        this.resgroup.removeEventListener(RESGroup.PROGRESS, this.onProgress, this);
        this.call(ConfigAll.COMPLETE);
    };
    /**
     * 加载成功
     */
    ConfigAll.COMPLETE = "CONFIGALL_COMPLETE";
    //加载进度
    ConfigAll.PROGRESS = "CONFIGALL_PROGRESS";
    return ConfigAll;
})(Notifier);
egret.registerClass(ConfigAll,'ConfigAll');
