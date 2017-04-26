/**
 * 拖拽类 - 扩展至Sprite
 */
var Drag = (function (_super) {
    __extends(Drag, _super);
    /**
     * 构造函数
     */
    function Drag() {
        _super.call(this);
        /**
         * 鼠标按下时的坐标
         */
        this.mousePoint = { sx: 0, sy: 0, tx: 0, ty: 0 };
        /**
         * 当前在X轴方向拖动的百分比
         */
        this.perX = 0;
        /**
         * 当前在Y轴方向拖动的百分比
         */
        this.perY = 0;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchPoint, this);
    }
    var d = __define,c=Drag,p=c.prototype;
    /**
     * 获取按下时的坐标
     */
    p.onTouchPoint = function (e) {
        this.mousePoint.tx = this.x;
        this.mousePoint.ty = this.y;
        this.mousePoint.sx = e.stageX;
        this.mousePoint.sy = e.stageY;
    };
    /**
     * 开始拖动
     * @param  x 矩形的X坐标
     * @param  y 矩形的Y坐标
     * @param  width 矩形的宽度
     * @param  height 矩形的高度
     */
    p.startDrag = function (x, y, width, height) {
        this.rectangle = { x: x, y: y, width: width, height: height };
        if (x > width) {
            this.rectangle.x = width;
            this.rectangle.width = x;
        }
        if (y > height) {
            this.rectangle.y = height;
            this.rectangle.height = y;
        }
        //必须导入game扩展库才可以这样使用舞台
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    };
    /**
     * 移动
     */
    p.onTouchMove = function (e) {
        var _x = this.mousePoint.tx + (e.stageX - this.mousePoint.sx);
        if (_x < this.rectangle.x)
            _x = this.rectangle.x;
        if (_x > this.rectangle.width)
            _x = this.rectangle.width;
        this.perX = Math.abs(_x / (this.rectangle.width - this.rectangle.x));
        if (isNaN(this.perX))
            this.perX = 0;
        this.x = _x;
        var _y = this.mousePoint.ty + (e.stageY - this.mousePoint.sy);
        if (_y < this.rectangle.y)
            _y = this.rectangle.y;
        if (_y > this.rectangle.height)
            _y = this.rectangle.height;
        this.perY = Math.abs(_y / (this.rectangle.height - this.rectangle.y));
        if (isNaN(this.perY))
            this.perY = 0;
        this.y = _y;
        this.dispatchEvent(new egret.Event(Drag.CHANGE, true, false, { perX: this.perX, perY: this.perY }));
    };
    /**
     * 结束拖动
     */
    p.stopDrag = function () {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    };
    /**
     * 拖动已更改
     */
    Drag.CHANGE = "DRAG_CHANGE";
    return Drag;
})(egret.Sprite);
egret.registerClass(Drag,'Drag');
