(() => {
$(document).one(":storyready", function () {
window.DOL.setup.specialClothesSets.familiar_collar.text = "VP99";
window.DOL.setup.specialClothesSets.familiar_collar.requirements = ()=>{return true;};
let obj = window.DOL.setup.clothes.neck.find(obj => obj.name === "familiar collar"); 
if(obj)
    {
        obj.cn_name_cap = "<span class=\"vp99\">VP99项圈典藏限量款</span>";
        obj.description = "小镇无人不知无人不晓的传奇项圈，激活后会电击所有胆敢冒犯的人。伊甸看了会沉默，雷米看了会流泪。约旦看了会膜拜，哈珀看了会下跪。"
        obj.type = ["eerie","enchanting"];
    }
        // 后执行函数，引擎初始化完毕后会执行此处内容
        //console.log('MyMod_script_preload_example.js', ' 在接收到JQuery的storyready事件时，说明SC2引擎已经启动完毕，所有的加载工作已经结束，使用上面的updatePassageData方法更新后的内容也不会再被引擎加载 ');
        // console.log('MyMod_script_preload_example.js', '  ');
    });
})();