/**
 * Loading插件
 */
class Loading extends Notifier
{
    
    /**
     * UI界面
     */
    private ui: LoadingUI;
    
    /**
     * 构造函数
     */ 
	public constructor() 
	{
        super();
        this.listen(Config.PROGRESS,this.addUI,this);
        this.listen(Config.COMPLETE,this.removeUI,this);
    }
    
    /**
     * 添加UI
     */ 
    public addUI(e: egret.Event = null): void
    {
        if(this.ui == null)
        {
            this.ui = new LoadingUI();
            this.ui.createUI();
        }
        this.ui.updata(e.data);
    }
    
    /**
     * 移除UI
     */
    public removeUI(e: egret.Event = null): void
    {
        if(this.ui)
        {
            this.ui.deleteUI();
            this.ui = null;
        }
    }
}
