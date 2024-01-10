//获取指定项圈序列。
//通过两个参数进行获取：EendRingType,accessory
//前者是我自定义的项圈的属性，类型为String，目前共6：cat,cow,fox,classic,bird,wolf,
function EdenRing_GetEdenRingIndex(ringType , accessory = 0)
{
	//console.log(`接收到类型：${ringType}`);
    let obj = setup.clothes.neck.find(obj => (obj.EdenRingType === ringType &&  obj.accessory == accessory));
	//console.log(`获取到编号：${obj.index}`);
    return obj.index;
}

//通过pc的转化类型（表象）来获取对应项圈。
//参（抄）考（的）万圣节服装代码。
function EdenRing_GetEdenRingIndexByTF(accessory = 0)
{
    T.tf = checkTFparts();

    let ringtype = "classic";

    if (T.tf.catEars && T.tf.catTail) 
        ringtype = "cat";
    else if (T.tf.cowHorns && T.tf.cowTail)
        ringtype = "cow";
    else if (T.tf.foxEars && T.tf.foxTail)
        ringtype = "fox";
    else if (T.tf.birdWings && T.tf.birdEyes)
        ringtype = "bird";
    else if (T.tf.foxEars && T.tf.foxTail)
        ringtype = "wolf";
    return EdenRing_GetEdenRingIndex(ringtype ,accessory);
}


//直接给pc穿戴指定项圈
//如果脖子上是不可取的东西则破坏掉，否则送回衣柜，拒绝败家。(开启强制破坏模式以及特殊规则除外)
//如果ringType 为"TF"则根据pc转化类型穿戴。
function EdenRing_ForceNeckwear(ringType = "TF" , accessory = 1, forcebreak = false)
{
    //脱掉旧的
    if(V.worn.neck.name !== "naked")
    {
        //破坏的特殊规则：如果是有伊甸相片的同心项链，那么绝对不会被破坏
        //反之是别人的相片，那就绝对会被破坏（什么人啊，心眼好小！）
        let breakcheck = false ;
        if(V.worn.neck.name === "love locket")
            breakcheck = V.worn.neck.photo === "Eden";
        else 
            breakcheck = V.worn.neck.cursed || forcebreak || V.worn.neck.EdenRingType;
        //如果不破坏就送回衣柜
        if(!breakcheck)
        wikifier("storeItem", "wardrobe" , "neck");
    }
    //穿上新的
    if (ringType==="TF")
    wikifier("equipClothesItemFromDefault" , "neck",EdenRing_GetEdenRingIndexByTF(accessory));
    else
    wikifier("equipClothesItemFromDefault" , "neck",EdenRing_GetEdenRingIndex(ringType ,accessory));
    return "" ;
}
DefineMacroS("EdenRing_ForceNeckwear", EdenRing_ForceNeckwear);


//给项圈添加/移除栓绳。
//原理是这样：其实有无栓绳是两件衣服，切换就是把原来的破坏换成新的
//为什么原代码要用名字判断，而不能像我一样配置个关联衣物index的属性呢。。。（其实我没配置，因为index是浮动的）
function EdenRing_SwitchLeash(leashtype = 2)
{
    if (!V.worn.neck.EdenRingType) return"";
    if(leashtype === 2 || leashtype !== V.worn.neck.accessory)
    wikifier("equipClothesItemFromDefault" , "neck",EdenRing_GetEdenRingIndex(V.worn.neck.EdenRingType , !V.worn.neck.accessory));
    return "" ;
}
DefineMacroS("EdenRing_SwitchLeash", EdenRing_SwitchLeash);

//简单的随机抽选台词
//快住手，你这样越写越复杂了喂喂
function EdenRing_RandomLog(data)
{
   return  data[Math.floor(Math.random() * data.length)];

}
DefineMacroS("EdenRing_RandomLog", EdenRing_RandomLog);
