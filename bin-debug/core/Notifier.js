/**
 * Notifier定义了：插件之间的全局消息广播的调度
 */
var Notifier = (function () {
    function Notifier() {
    }
    var d = __define,c=Notifier,p=c.prototype;
    /**
     * 侦听事件
     * @param type:string         — 事件的类型。
     * @param listener:Function   — 处理事件的侦听器函数
     * @param thisObject:any      — 侦听函数绑定的this对象
     */
    p.listen = function (type, listener, thisObject) {
        Notifier.globalDispatch.addEventListener(type, listener, thisObject);
    };
    /**
     * 发送事件
     * @param type:string  — 事件类型
     * @param data:any     — 事件data
     */
    p.call = function (type, data) {
        if (data === void 0) { data = null; }
        Notifier.globalDispatch.dispatchEventWith(type, false, data);
    };
    /**
     * 检查事件
     * @param type:string  — 事件类型
     */
    p.hasListen = function (type) {
        return Notifier.globalDispatch.hasEventListener(type);
    };
    /**
     * 全局调度器
     */
    Notifier.globalDispatch = new egret.EventDispatcher();
    return Notifier;
})();
egret.registerClass(Notifier,'Notifier');
