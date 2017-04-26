/**
 * LoadingUI界面
 */ 
class LoadingUI extends egret.Sprite
{
    
    /**
     * 背景
     */ 
    private bg: egret.Sprite;
    
    /**
     * 圆圈
     */ 
    private circle: egret.Sprite;
    
    /**
     * 文字
     */ 
    private txt: egret.TextField;
    
    /**
     * 半径
     */ 
    private radius: number = 0;
    
    /**
     * 线条宽度
     */ 
    private lineSize: number = 10;
    
	
	/**
	 * 创建界面
	 * @param radius:number 半径
	 */ 
    public createUI(radius: number = 200): void
    {
        
        this.radius = radius;
        this.bg = new egret.Sprite();
        this.bg.graphics.lineStyle(this.lineSize,0xcccccc);
        this.bg.graphics.drawArc(this.radius,this.radius,this.radius,0,2 * Math.PI,false);
       
        this.txt = new egret.TextField();
        this.txt.size = 120;
        this.txt.bold = true;
        this.txt.textColor = 0xFF3300;
        
        this.circle = new egret.Sprite();
        
        this.addChild(this.bg);;
        this.addChild(this.circle);
        this.addChild(this.txt);
        
        this.x = (Main.stage.stageWidth  - this.width ) / 2;
        this.y = (Main.stage.stageHeight - this.height) / 2;
        Main.stage.addChild(this)
    }
    
    
    /**
     * 删除界面
     */ 
    public deleteUI(): void
    { 
        this.removeChild(this.bg);
        this.removeChild(this.circle);
        this.removeChild(this.txt);
        this.bg = null;
        this.circle = null;
        this.txt = null;
        Main.stage.removeChild(this)
    }
    
    
    /**
     * 更新LOADING
     * @param n: number 0-1之间的小数
     */ 
    public updata(n: number): void
    {
        this.circle.graphics.lineStyle(this.lineSize,0xFF3300);
        this.circle.graphics.drawArc(this.radius,this.radius,this.radius,0 ,2*n * Math.PI,false)
        this.txt.text = Math.ceil(n * 100).toString()+"%";
        this.txt.x = (this.width  - this.txt.width ) / 2;
        this.txt.y = (this.height - this.txt.height) / 2;
    }
}
