/**
 * RESGroup类 - 定义了加载全部资源组的方式
 */
var RESGroup = (function (_super) {
    __extends(RESGroup, _super);
    function RESGroup() {
        _super.apply(this, arguments);
        /**
         * 加载计数器
         */
        this.count = 0;
    }
    var d = __define,c=RESGroup,p=c.prototype;
    /**
     * 加载资源组
     * @ path: string 资源配置json文件的路径;
     * @ file: string 资源存放的目录;
     */
    p.load = function (path, file) {
        if (path === void 0) { path = "resource/resource.json"; }
        if (file === void 0) { file = "resource/"; }
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onConfigLoadErr, this);
        RES.loadConfig(path, file);
    };
    p.onConfigLoadErr = function (event) {
        this.dispatchEvent(new egret.Event(RESGroup.ERROR, false, false, "加载配置文件失败"));
    };
    p.onConfigComplete = function (event) {
        RES.getResAsync("resource", this.onGetResAsync, this);
    };
    p.onGetResAsync = function (data, key) {
        this.group = data.groups;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadErr, this);
        for (var i = 0; i < this.group.length; i++) {
            RES.loadGroup(this.group[i].name, i);
        }
    };
    p.onResourceLoadErr = function (event) {
        console.log("加载资源组" + event.groupName + "失败");
        this.dispatchEvent(new egret.Event(RESGroup.ERROR, false, false, "加载资源组" + event.groupName + "失败"));
    };
    p.onResourceLoadComplete = function (event) {
        this.count += 1;
        console.log("加载资源组" + event.groupName + "成功");
        console.log("加载资源组进度" + this.count / this.group.length);
        this.dispatchEvent(new egret.Event(RESGroup.PROGRESS, false, false, this.count / this.group.length));
        if (this.count == this.group.length) {
            this.dispatchEvent(new egret.Event(RESGroup.COMPLETE));
        }
    };
    /**
     * 加载资源完成
     */
    RESGroup.COMPLETE = "RESGROUP_COMPLETE";
    /**
     * 加载资源进度
     */
    RESGroup.PROGRESS = "RESGROUP_PROGRESS";
    /**
     * 加载资源错误
     */
    RESGroup.ERROR = "RESGROUP_ERROR";
    return RESGroup;
})(egret.EventDispatcher);
egret.registerClass(RESGroup,'RESGroup');
