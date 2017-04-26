/**
 * LoadingUI界面
 */
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.apply(this, arguments);
        /**
         * 半径
         */
        this.radius = 0;
        /**
         * 线条宽度
         */
        this.lineSize = 10;
    }
    var d = __define,c=LoadingUI,p=c.prototype;
    /**
     * 创建界面
     * @param radius:number 半径
     */
    p.createUI = function (radius) {
        if (radius === void 0) { radius = 200; }
        this.radius = radius;
        this.bg = new egret.Sprite();
        this.bg.graphics.lineStyle(this.lineSize, 0xcccccc);
        this.bg.graphics.drawArc(this.radius, this.radius, this.radius, 0, 2 * Math.PI, false);
        this.txt = new egret.TextField();
        this.txt.size = 120;
        this.txt.bold = true;
        this.txt.textColor = 0xFF3300;
        this.circle = new egret.Sprite();
        this.addChild(this.bg);
        ;
        this.addChild(this.circle);
        this.addChild(this.txt);
        this.x = (Main.stage.stageWidth - this.width) / 2;
        this.y = (Main.stage.stageHeight - this.height) / 2;
        Main.stage.addChild(this);
    };
    /**
     * 删除界面
     */
    p.deleteUI = function () {
        this.removeChild(this.bg);
        this.removeChild(this.circle);
        this.removeChild(this.txt);
        this.bg = null;
        this.circle = null;
        this.txt = null;
        Main.stage.removeChild(this);
    };
    /**
     * 更新LOADING
     * @param n: number 0-1之间的小数
     */
    p.updata = function (n) {
        this.circle.graphics.lineStyle(this.lineSize, 0xFF3300);
        this.circle.graphics.drawArc(this.radius, this.radius, this.radius, 0, 2 * n * Math.PI, false);
        this.txt.text = Math.ceil(n * 100).toString() + "%";
        this.txt.x = (this.width - this.txt.width) / 2;
        this.txt.y = (this.height - this.txt.height) / 2;
    };
    return LoadingUI;
})(egret.Sprite);
egret.registerClass(LoadingUI,'LoadingUI');
