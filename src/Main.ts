/**
 * 文档类 - 程序入口
 */ 
class Main extends egret.DisplayObjectContainer 
{
    /**
     * @程序的舞台
     */ 
    public static stage: egret.Stage;
    
    /**
     * 构造函数
     */ 
    public constructor() 
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onToStage,this);
    }
    
    /**
     * 获得舞台
     */ 
    private onToStage(e: egret.Event): void
    {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onToStage,this);
        Main.stage = this.stage;
        this.regplugin();
    }
    
    /**
     * 注册插件
     */ 
    private regplugin(): void
    {
        //Loading
        new Loading();
        
        //加载配置文件
        new Config();
    }
}