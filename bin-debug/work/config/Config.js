/**
 * 加载资源及配置文件
 */
var Config = (function (_super) {
    __extends(Config, _super);
    /**
     * 构造函数
     */
    function Config() {
        _super.call(this);
        this.listen(Config.LOAD_GROUP, this.loadRes, this);
        this.loadconfig();
    }
    var d = __define,c=Config,p=c.prototype;
    /**
     * 第一步：加载配置文件
     * 只有先加载了配置文件,才能找到文件的路径，然后再可以加载资源组
     */
    p.loadconfig = function () {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onConfigLoadErr, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    //加载成功
    p.onConfigComplete = function (event) {
        console.log("加载配置文件成功");
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.removeEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onConfigLoadErr, this);
        this.call(Config.LOAD_GROUP, "logo");
    };
    //加载失败
    p.onConfigLoadErr = function (event) {
        console.log("加载配置文件失败");
    };
    /**
     * 第二步：加载资源组文件
     * 加载了指定的资源组，文件就会被缓存，如果使用文件就可以直接从缓存中取出来
     */
    p.loadRes = function (e) {
        if (e === void 0) { e = null; }
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadErr, this);
        RES.loadGroup(e.data, 1);
    };
    //加载成功
    p.onResourceLoadComplete = function (event) {
        console.log("加载资源组成功");
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadErr, this);
        this.call(Config.COMPLETE, event.groupName);
    };
    //加载失败
    p.onResourceLoadErr = function (event) {
        console.log("加载资源组失败");
    };
    //加载进度
    p.onResourceProgress = function (event) {
        this.call(Config.PROGRESS, event.itemsLoaded / event.itemsTotal);
    };
    /**
     * 加载资源成功
     */
    Config.COMPLETE = "CONFIG_COMPLETE";
    /**
     * 加载资源进度
     */
    Config.PROGRESS = "CONFIG_PROGRESS";
    /**
     * 启动加载
     */
    Config.LOAD_GROUP = "CONFIG_LOAD_GROUP";
    return Config;
})(Notifier);
egret.registerClass(Config,'Config');
