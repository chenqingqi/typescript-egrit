/**
 * Hits类碰撞检测工具类 - 实现了对象与对象，对象与点的碰撞检测
 */
var Hits = (function () {
    function Hits() {
    }
    var d = __define,c=Hits,p=c.prototype;
    /**
     * 检测两个显示显示对象是否碰撞
     * @param objectA:egret.DisplayObject
     * @param objectB: egret.DisplayObject
     */
    Hits.hitObject = function (objectA, objectB) {
        var a = objectA;
        var x1 = a.x;
        var y1 = a.y;
        var w1 = a.width;
        var h1 = a.height;
        var b = objectB;
        var x2 = b.x;
        var y2 = b.y;
        var w2 = b.width;
        var h2 = b.height;
        if (x1 >= x2 && x1 >= x2 + w2) {
            return false;
        }
        else if (x1 <= x2 && x1 + w1 <= x2) {
            return false;
        }
        else if (y1 >= y2 && y1 >= y2 + h2) {
            return false;
        }
        else if (y1 <= y2 && y1 + h1 <= y2) {
            return false;
        }
        return true;
    };
    /**
     * 检测对象是否与一个点碰撞
     * @param object: egret.DisplayObject
     * @param x 点的x坐标
     * @param y 点的y坐标
     */
    Hits.hitPoint = function (object, x, y) {
        var x1 = x;
        var y1 = y;
        var x2 = object.x;
        var y2 = object.y;
        var w = object.width;
        var h = object.height;
        if (x1 >= x2 && x1 <= x2 + w && y1 >= y2 && y1 <= y2 + h)
            return true;
        return false;
    };
    return Hits;
})();
egret.registerClass(Hits,'Hits');
