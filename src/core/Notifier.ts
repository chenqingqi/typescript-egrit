/**
 * Notifier定义了：插件之间的全局消息广播的调度
 */
class Notifier
{
    /**
     * 全局调度器
     */ 
    public static globalDispatch: egret.EventDispatcher = new egret.EventDispatcher();
    
    /**
     * 侦听事件
     * @param type:string         — 事件的类型。
     * @param listener:Function   — 处理事件的侦听器函数
     * @param thisObject:any      — 侦听函数绑定的this对象
     */ 
    public listen(type: string,listener: Function,thisObject: any): void
    {
        Notifier.globalDispatch.addEventListener(type,listener,thisObject);
    }
    
    /**
     * 发送事件
     * @param type:string  — 事件类型
     * @param data:any     — 事件data
     */ 
    public call(type: string,data: any = null): void
    { 
        Notifier.globalDispatch.dispatchEventWith(type,false,data);
    }
    
    /**
     * 检查事件
     * @param type:string  — 事件类型
     */ 
    public hasListen(type: string):boolean
    {
        return Notifier.globalDispatch.hasEventListener(type);
    }
}
