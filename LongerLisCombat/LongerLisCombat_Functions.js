//在进入菜单时检测数据
//因为和初始化数据一起进行，故不存在没初始化的情况。
function LongerLisCombatSettings_SettingsCheck(){

    let minap = 500;
    let maxap =20000;

    for(let obj in V.longercombat)
    {
        //处理Eden的特殊变量：hp,hourlust
        if(V.longercombat[obj].fullDescription ==="Eden")
        {
            if (V.longercombat[obj].hp === undefined || V.longercombat[obj].hp<600 || V.longercombat[obj].hp> 20000)
            V.longercombat[obj].hp = 600;

            if (V.longercombat[obj].hourlust === undefined || V.longercombat[obj].hourlust<0 || V.longercombat[obj].hourlust> 100)
            V.longercombat[obj].hourlust = 0;
        }
        //处理共通变量
        if (V.longercombat[obj].ap === undefined || V.longercombat[obj].ap<minap || V.longercombat[obj].ap> maxap)
        V.longercombat[obj].ap = minap;

        if (V.longercombat[obj].apnc === undefined || V.longercombat[obj].apnc<minap || V.longercombat[obj].apnc> maxap)
        V.longercombat[obj].apnc = minap;      
    }

    return"";//必须有返回值，否则会显示一些奇怪的东西
}
DefineMacroS("LongerLisCombatSettings_SettingsCheck", LongerLisCombatSettings_SettingsCheck);

//在战斗初始化时判断是否需要进行数值修正。
//为了绕过事件中的数值指定，这里只进行计算，而将实际的修改放到下游。
//会判断伊甸的HP修改（对多个伊甸也会生效）
//需要判断伊甸的激昂效果

//修改原则：反正只往高了改
function LongerLisCombat_StateCulculate(){
   
    if(V.longercombat === undefined)
    return"";

     //这里使用临时变量就好（那你上个版本留下的变量垃圾怎么办啊！啊？？）
    T.longercombat_finalAP = undefined;
    T.longercombat_finalHP =undefined;
    //这个要用到战斗结束，所以不能用临时变量（悲）
    V.longercombat_EdenAG =false ;
   

    let minap = 500;
    let minhp = 600;

    let edithp = false;
    let resultAp = 0;//其实是AP的加值
    let resultHp = [0,0,0,0,0,0];//这个倒是真的hp绝对值
    for (let i =0 ; i<V.enemyno ; i++)
    {
        for(let obj in V.longercombat)
        {
            if(V.NPCList[i].fullDescription === V.longercombat[obj].fullDescription)
            {
                let curap = Math.max( V.longercombat[obj].apnc , minap);
                if(V.trueconsensual === 1)
                curap = Math.max( V.longercombat[obj].ap , minap);

                //对伊甸的特殊处理：计算HP改变和法环模式。好麻烦！
                if(V.NPCList[i].fullDescription === "Eden")
                {
                   
                   let  curhp = Math.max(V.longercombat[obj].hp , minhp , V.NPCList[i].health);
                    if(V.longercombat_EdenRingMode)
                    {
                         curap *= 1000;
                         curhp *= 1000;
                         if(V.consensual !== 1)V.longercombat_EdenAG = true;
                    }

                    if(curhp > minhp)
                    {
                        edithp = true;
                        resultHp[i] = curhp;
                    }
                }

                if(curap > minap)
                {
                    resultAp += curap;
                    resultAp -= minap;
                }
                break;
            }
        }

        if(resultAp >0 )T.longercombat_finalAP = resultAp;
        if(edithp)  T.longercombat_finalHP = resultHp;
    }
    return"";
}
DefineMacroS("LongerLisCombat_StateCulculate", LongerLisCombat_StateCulculate);

//执行修改。看了一圈还是塞进effectsman里面罢
function LongerLisCombat_StateEdit(){

        if(T.longercombat_finalAP)
        {
            V.enemyarousalmax += T.longercombat_finalAP;
            T.longercombat_finalAP = undefined;
        }

        if(V.longercombat_EdenAG)
        {
            //关于激昂伊甸：在十分愤怒的情况下十分愤怒(啊？)
            //因为战斗开始前必然会消掉这个flag,所以留着也没差啦……但稳妥起见，还是用完就消掉吧
            V.enemyanger = 200;
            if(V.enemyarousal >= V.enemyarousalmax)
            V.longercombat_EdenAG = false;
        }

        if(T.longercombat_finalHP)
        {
            let summax = 0;
            let sum = 0;
            for(let i = 0 ;i < V.enemyno ;i++)
            {
                if (T.longercombat_finalHP[i] >0)
                {
				    V.NPCList[i].healthmax  = T.longercombat_finalHP[i];
                    V.NPCList[i].health  = T.longercombat_finalHP[i];
				    sum += T.longercombat_finalHP[i];
                    summax += T.longercombat_finalHP[i];
                }
			    else
                {
				    sum += V.NPCList[i].health;	
                    summax +=   V.NPCList[i].health;	
                }		
            }
            V.enemyhealthmax = summax ;
		    V.enemyhealth = sum;
		    T.longercombat_finalHP = undefined;
        }
        return"";

}

DefineMacroS("LongerLisCombat_StateEdit", LongerLisCombat_StateEdit);
