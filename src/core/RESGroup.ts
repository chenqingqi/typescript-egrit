/**
 * RESGroup类 - 定义了加载全部资源组的方式
 */
class RESGroup extends egret.EventDispatcher
{
    
    /**
     * 加载资源完成
     */ 
    public static COMPLETE: string = "RESGROUP_COMPLETE"; 
    
    /**
     * 加载资源进度
     */ 
    public static PROGRESS: string = "RESGROUP_PROGRESS"; 
    
    /**
     * 加载资源错误
     */
    public static ERROR: string = "RESGROUP_ERROR"; 
    
    /**
     * 资源组的项
     */
    private group: any;
    
    /**
     * 加载计数器
     */ 
    private count: number = 0;
    
    
    /**
     * 加载资源组
     * @ path: string 资源配置json文件的路径;
     * @ file: string 资源存放的目录;
     */  
    public load(path: string = "resource/resource.json",file: string = "resource/"): void 
    {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR,this.onConfigLoadErr,this);
        RES.loadConfig(path,file);
    }
    
    private onConfigLoadErr(event: RES.ResourceEvent): void 
    {
        this.dispatchEvent(new egret.Event(RESGroup.ERROR,false,false,"加载配置文件失败"))
    }
    
    private onConfigComplete(event: RES.ResourceEvent): void 
    {
        RES.getResAsync("resource",this.onGetResAsync,this);
    }
    
    private onGetResAsync(data:any,key:any): void
    { 
        this.group = data.groups;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadErr,this);
        
        for(var i: number = 0;i < this.group.length;i++)
        { 
            RES.loadGroup(this.group[i].name,i);
        }
    }
    
    private onResourceLoadErr(event: RES.ResourceEvent): void 
    {
        console.log("加载资源组" + event.groupName +"失败")
        this.dispatchEvent(new egret.Event(RESGroup.ERROR,false,false,"加载资源组" + event.groupName + "失败"))
    }
    
    private onResourceLoadComplete(event: RES.ResourceEvent): void 
    {
        
        this.count += 1;
        console.log("加载资源组" + event.groupName + "成功");
        console.log("加载资源组进度" + this.count / this.group.length);
        this.dispatchEvent(new egret.Event(RESGroup.PROGRESS,false,false,this.count / this.group.length));
        if(this.count == this.group.length)
        {
            this.dispatchEvent(new egret.Event(RESGroup.COMPLETE));
        }
    }
}
