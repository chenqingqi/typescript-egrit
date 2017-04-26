/**
 * 加载资源及配置文件
 */
class Config extends Notifier 
{
    /**
     * 加载资源成功
     */ 
    public static COMPLETE: string = "CONFIG_COMPLETE"; 
    
    /**
     * 加载资源进度
     */ 
    public static PROGRESS: string = "CONFIG_PROGRESS"; 
    
    /**
     * 启动加载
     */ 
    public static LOAD_GROUP: string = "CONFIG_LOAD_GROUP";
    
    
    /**
     * 构造函数
     */
    public constructor() 
    {
        super();
        this.listen(Config.LOAD_GROUP,this.loadRes,this);
        this.loadconfig();
    }
    
    /**
     * 第一步：加载配置文件
     * 只有先加载了配置文件,才能找到文件的路径，然后再可以加载资源组
     */
    private loadconfig(): void 
    {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR,this.onConfigLoadErr,this);
        RES.loadConfig("resource/resource.json","resource/");
    }
    
    //加载成功
    private onConfigComplete(event: RES.ResourceEvent): void 
    {
        console.log("加载配置文件成功");
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.removeEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR,this.onConfigLoadErr,this);
        this.call(Config.LOAD_GROUP,"logo");
    }
    
    //加载失败
    private onConfigLoadErr(event: RES.ResourceEvent): void 
    {
        console.log("加载配置文件失败")
    }
    
    
    /**
     * 第二步：加载资源组文件
     * 加载了指定的资源组，文件就会被缓存，如果使用文件就可以直接从缓存中取出来
     */
    private loadRes(e:egret.Event = null): void 
    {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadErr,this);
        RES.loadGroup(e.data,1);
    }
    
    //加载成功
    private onResourceLoadComplete(event: RES.ResourceEvent): void 
    {
        console.log("加载资源组成功");
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadErr,this);
        this.call(Config.COMPLETE,event.groupName);
    }
    
    //加载失败
    private onResourceLoadErr(event: RES.ResourceEvent): void 
    {
        console.log("加载资源组失败")
    }
    
    //加载进度
    private onResourceProgress(event: RES.ResourceEvent): void 
    {
       this.call(Config.PROGRESS,event.itemsLoaded / event.itemsTotal)
    }
}
