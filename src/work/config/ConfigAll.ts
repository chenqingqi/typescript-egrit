/**
 * 加载资源及配置文件
 */
class ConfigAll extends Notifier 
{
    /**
     * 加载成功
     */ 
    public static COMPLETE: string = "CONFIGALL_COMPLETE";
    
    //加载进度
    public static PROGRESS: string = "CONFIGALL_PROGRESS";
    
    /**
     * 加载器
     */ 
    private resgroup: RESGroup;
    
    /**
     * 构造函数
     */
    public constructor() 
    {
        super();
        this.init();
    }
    
    /**
     * 开始加载
     */ 
    private init(): void
    {
        this.resgroup = new RESGroup();
        this.resgroup.addEventListener(RESGroup.COMPLETE,this.onComplete,this);
        this.resgroup.addEventListener(RESGroup.ERROR,this.onError,this);
        this.resgroup.addEventListener(RESGroup.PROGRESS,this.onProgress,this);
        this.resgroup.load("resource/resource.json","resource/");
    }
    
    /**
     * 加载失败
     */ 
    private onError(e: egret.Event): void
    {
        console.log(e.data);
    }
    
    /**
     * 加载进度
     */
    private onProgress(e: egret.Event): void
    {
        this.call(ConfigAll.PROGRESS,e.data);
    }
    
    /**
     * 加载成功
     */
    private onComplete(e: egret.Event): void
    {
        console.log("配置文件及资源加载成功");
        this.resgroup.removeEventListener(RESGroup.COMPLETE,this.onComplete,this);
        this.resgroup.removeEventListener(RESGroup.ERROR,this.onError,this);
        this.resgroup.removeEventListener(RESGroup.PROGRESS,this.onProgress,this);
        this.call(ConfigAll.COMPLETE);
    }
}
