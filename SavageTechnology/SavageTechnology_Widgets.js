//凑合用下的功能，就不变色了！
const ShowAp = ()=>
{
    let result ="";
    if (V.enemyarousalmax<= 0)
    return result;
    result += `AP：${Math.round(V.enemyarousal)}(${Math.round(V.enemyarousalmax)})   |   `;
    return result;
}

DefineMacroS('ShowAp', ShowAp)

const ShowHp= ()=>
{
    let result ="";
    if (V.enemyhealthmax<= 0)
    return result;
    result += `HP：${Math.round(V.enemyhealth)}(${Math.round(V.enemyhealthmax)})   |   `;
    return result;
}

DefineMacroS('ShowHp', ShowHp)

const ShowAG= ()=>
{
    let result ="";
    if (V.enemyangermax<= 0)
    return result;
    result += `AG：${Math.round(V.enemyanger)}(${Math.round(V.enemyangermax)})   |   `;
    return result;
}

DefineMacroS('ShowAG', ShowAG)