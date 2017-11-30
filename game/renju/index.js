/////////////////js实现五子棋游戏////////////////////////////
// author :hjm 【最近痴迷于js游戏：对于算法的挑战势在必得】    //
// url    : hjm100.cn 【编码前的设计很重要：增强逻辑思维！】   //
// 在线地址：http://hjm100.cn/game/renju                    //
////////////////////////////////////////////////////////////
/****************************游戏方法*******************************************/
var n = 15; // 棋盘格数
color = "black", // 默认黑棋先下
    gobangArr = [], // 存储棋盘的数据
    win = false, // 棋子赢的数组
    hjmBox = document.getElementById("gameBox"), // 棋盘
    hjmStatus = document.getElementById("gameStatus"), // 下棋状态
    hjmRestart = document.getElementById("gameRestart"); // 再来一盘
//事件实例化：
var EventUtil = {
    //添加注册事件处理的兼容写法
    addHandler: function (element, type, handler) {
        if (element.addEventListener) element.addEventListener(type, handler, false);
        else if (element.attachEvent) element.attachEvent("on" + type, handler);
        else element["on" + type] = handler;
    },
    //删除注册事件处理的兼容写法
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) element.removeEventListener(type, handler, false);
        else if (element.detachEvent) element.detachEvent("on" + type, handler);
        else element["on" + type] = null;
    },
    //获取事件类型的兼容写法
    getEvent: function (event) {
        return event ? event : window.event;
    },
    //获取发生事件的元素的兼容写法
    getTarget: function (event) {
        return event.target || event.srcElement;
    },

}
// 画棋盘格子
function drawGobang(n) {
    for (var x = 0; x < n; x++) {
        for (var y = 0; y < n; y++) {
            var block = document.createElement("div");
            block.className = "hjm_block";
            //x，y分别代表坐标点[在下面画棋子的时候当做坐标使用]
            block.id = "block_" + x + "_" + y;
            hjmBox.appendChild(block);
            //处理边缘的样式
            if (x == 0) block.className += " top";
            if (x == n - 1) block.className += " bottom";
            if (y == 0) block.className += " left";
            if (y == n - 1) block.className += " right";
        }
    }
}
//画棋子
function drawPiece() {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event),
        targetId = target.id,
        x = +targetId.split("_")[1],
        y = +targetId.split("_")[2];
        console.log(gobangArr[x]) //获取你点击的是哪一行数据
    //确保你点击的是格子
    if (targetId != "gameBox") {
        //检查发生事件的这个元素的类名是否存在“active”
        //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
        //如果要检索的字符串值没有出现，则该方法返回 -1。
        if (target.className.indexOf("active") < 0) { // 已经下过的棋盘位置不可再下
            target.className = target.className + " active " + color; // 画当前棋子			
            if (gobangArr[x]) {
                gobangArr[x][y] = color; // 存棋盘的数据(说明在此处下了一个什么子)
                chessWin(x, y, color);   // 判断是否赢
            } else open('鸿基梦提醒您',"错误 " + target.id + " " + x + " " + y); //错误信息		
            color = color == "black" ? "white" : "black"; //下次画另外一种颜色的棋子
            if (!win) logStatus(color); // 为获胜情况下显示提示文本
        }
    }
}
// 提醒文本
function logStatus(info) {
    if (color == "black") hjmStatus.innerHTML = "<p>轮到黑棋下</p>";
    else hjmStatus.innerHTML = "<p>轮到白棋下</p>";
}
/********************************算法判断（重要）***********************************************/
/**思路：
 * 首先设置count = 1。count的值代表在同一个方向连续在一起的棋子总数，达到5个则该方赢。
 * 水平方向上的设计：(根据数组中的颜色值来判断)
 * 1.按顺序遍历当前位置(x,y)棋子的前四个位置是否含相同颜色的棋子，若相同则count++，同时检测是否count == 5；
 * 2.一旦不相同退出循环；
 * 3.继续按顺序遍历(x,y)棋子的后四个位置是否含相同颜色的棋子，若相同，count++以及检测是否count == 5 。
 * 其它方向的设计大致相同（斜角的设置可以为 x+1;y+1判断）
 * 切记斜角判断（45°与135°）
 */
// 判断输赢（重点规则）
function chessWin(x, y, color) {
    var row, col,
        count = 1; // 连续同一个颜色棋子的个数
    // 垂直方向（考虑正方向与反方向：判断5行之内的棋子）
    for (row = x - 1; row >= 0 && row > x - 5; row--) {
        //通过数组中的color值判断
        if (gobangArr[row] && gobangArr[row][y] == color) {
            count++;
            ifWin(count, color);
        } else break;
    };
    for (row = x + 1; row < n && row < x + 5; row++) {
        if (gobangArr[row] && gobangArr[row][y] == color) {
            count++;
            ifWin(count, color);
        } else break;
    };
    //上述不满足的时候重新判断下面情况（由于上面改变了count，所以在此需要重置一下）
    count = 1;
    // 水平方向
    for (col = y - 1; col >= 0 && col > y - 5; col--) {
        if (gobangArr[x] && gobangArr[x][col] == color) {
            count++;
            ifWin(count, color);
        } else break;
    }
    for (col = y + 1; col < n && col < y + 5; col++) {
        if (gobangArr[x] && gobangArr[x][col] == color) {
            count++;
            ifWin(count, color);
        } else break;
    }
    count = 1;
    // 45°方向
    for (row = x - 1, col = y - 1; row >= 0 && col >= 0 && row > x - 5 && col > y - 5; row--, col--) {
        if (gobangArr[row] && gobangArr[row][col] == color) {
            count++;
            ifWin(count, color);
        } else break;
    }
    for (row = x + 1, col = y + 1; row < n && col < n && row < x + 5 && col < y + 5; row++, col++) {
        if (gobangArr[row] && gobangArr[row][col] == color) {
            count++;
            ifWin(count, color);
        } else break;
    }
    count = 1;
    // 135°方向
    for (row = x - 1, col = y + 1; row >= 0 && col < n && row > x - 5 && col < y + 5; row--, col++) {
        if (gobangArr[row] && gobangArr[row][col] == color) {
            count++;
            ifWin(count, color);
        } else break;
    }
    for (row = x + 1, col = y - 1; row < n && col >= 0 && row < x + 5 && col > y - 5; row++, col--) {
        if (gobangArr[row] && gobangArr[row][col] == color) {
            count++;
            ifWin(count, color);
        } else break;
    }
    count = 1;
}
//是否胜利
function ifWin(count, color) {
    if (count >= 5) { //棋子连珠等于5的时候为胜利(大于等于5是说明可能出现 1 1 1 0 1 1 1等情况)
        if (color == "black"){
            hjmStatus.innerHTML = "<p>黑棋赢了</p>";
            open('鸿基梦提醒您','黑棋赢了')
        }else{
            hjmStatus.innerHTML = "<p>白棋赢了</p>";
            open('鸿基梦提醒您','白棋赢了')
        }
        //胜利后不能再继续下棋
        win = true;
        EventUtil.removeHandler(hjmBox, "click", drawPiece);
    } else win = false;
}

// 重置数据，再来一盘
function resetGobang() {
    var x, y;
    // 清除数组数据(所有的点都为空)
    for (x = 0; x < n; x++) {
        var tempData = [];
        for (y = 0; y < n; y++) tempData.push("");
        gobangArr[x] = tempData;
    }
    // 设置默认数据
    color = "black";
    hjmStatus.innerHTML = "<p>默认黑棋先下</p>";
    EventUtil.addHandler(hjmBox, "click", drawPiece);
    // 清除棋子
    var divClassName,
        divGroup = hjmBox.getElementsByTagName("div"),
        len = divGroup.length;
    for (x = 0; x < len; x++) {
        if (typeof (divGroup[x]) == "object") {
            divClassName = divGroup[x].getAttribute("class");
            if (typeof (divClassName) == "string") {
                if (divClassName.indexOf("active white") > 0) {
                    // replace() 方法用于在字符串中用一些字符替换另一些字符
                    //替换掉相对应的棋子class名
                    divClassName = divClassName.replace("active white", "");
                    divGroup[x].setAttribute("class", divClassName);
                }
                if (divClassName.indexOf("active black") > 0) {
                    divClassName = divClassName.replace("active black", "");
                    divGroup[x].setAttribute("class", divClassName);
                }
            }
        }
    }
}
/******************************模态弹框****************************************/
var modal         = document.getElementById('modal'),
    modalMask     = document.getElementById('modalMask'),
    modalTitle    = document.getElementsByClassName('modal__title')[0],
    modalTxt      = document.getElementsByClassName('modal__bd')[0],
    modalPrimary  = document.getElementsByClassName('modal__btn_primary')[0],
    modalDefault  = document.getElementsByClassName('modal__btn_default')[0];

//带数据显示
function open(title,txt){
    modal.style.display   = 'block';
    modalTitle.innerHTML = title; 
    modalTxt.innerHTML    = txt; 
}
function close(){
    modal.style.display = 'none';
}
//确定弹框按钮事件（重新开始加关闭弹框）
function confirm(){
    close();
    resetGobang();
}
drawGobang(n) //初始化棋盘
resetGobang() //初始化对局开始
EventUtil.addHandler(hjmBox, "click", drawPiece);       // 点击棋盘，进行下棋
EventUtil.addHandler(hjmRestart, "click", resetGobang); // 添加重新开始事件
EventUtil.addHandler(modalMask, "click", close);        // 添加关闭弹框事件
EventUtil.addHandler(modalDefault, "click", close);     // 添加关闭弹框事件
EventUtil.addHandler(modalPrimary, "click", confirm);   // 添加关闭弹框加重新开始事件