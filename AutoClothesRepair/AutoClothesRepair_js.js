//还是上js遍历吧，复制粘贴6遍太傻逼了
//和重构机制不一样的是，连体衣服的上装和下装分开算钱
function AutoClothesRepairJS(showlog) {

    let result = "";
    if(!V.clothingrebuy) return result;
    let sum = 0;
    let keys = ["over_upper", "over_lower", "upper", "lower", "under_upper", "under_lower"];
    keys.forEach((key, num) => {
        if (V.worn[key].name !== "naked" && V.worn[key].integrity <= 0 && !V.worn[key].type.includes("binding") && !V.worn[key].cursed) {
            let setupitem = getSetupClothing(key, V.worn[key]);
            if (setupitem && setupitem.shop.length >0)
            {
                let cost = Math.trunc(tailorClothingCost(V.worn[key], key) * 1.5);
                if (V.worn[key].outfitSecondary !== undefined || V.worn[key].outfitPrimary !== undefined)
                    cost = Math.trunc(cost / 2);
                if (cost <= V.money)
                {
                    if (V.combat)
                    {
                        if (V.AutoClothesRepair == undefined) { V.AutoClothesRepair = {}; }
                        V.AutoClothesRepair[key] = { index: V.worn[key].index, colour: V.worn[key].colour, accessory_colour: V.worn[key].accessory_colour, cost: cost };
                    }
                    else
                    {
                        let integritymax = 200;
                        if (setupitem.integrity_max) integritymax = setupitem.integrity_max;
                        V.worn[key].integrity = integritymax;
                        result += V.worn[key].cn_name_cap;
                        result += "、";
                        sum += cost;
                    }
                }
            }
        };
    });

    if (result || sum)
    {
        result = result.slice(0, -1);
        result = "<span class=\"grey\">你的" + result + "已经修复";
        if (sum > 0)
        {
            result = result + "，共花费<span class=\"gold\">£" + sum / 100 + "</span>。</span><br>";
            wikifier("money", -sum, "clothes");
        }
        else
            result += "。</span><br>";
    }
    if (showlog !== "no_text")
        return result;
    else
        return "";
}
DefineMacroS('AutoClothesRepairJS', AutoClothesRepairJS);

//战后穿衣也用js吧
function AutoClothesRepairJS_AfterCombat() {
    let result = "";
    if(!V.clothingrebuy) return result;
    if (V.AutoClothesRepair !== undefined) {
        let sum = 0;
        Object.entries(V.AutoClothesRepair).forEach(([key, value]) =>
        {
            wikifier("equipClothesItemFromDefault", key, value.index, value.colour, value.accessory_colour);
            result += V.worn[key].cn_name_cap;
            result += "、";
            sum += value.cost;
        });
        if (result)
        {
            result = result.slice(0, -1);
            result = "<span class=\"grey\">你的" + result + "已经修复";
            if (sum > 0) {
                result = result + "，共花费<span class=\"gold\">£" + sum / 100 + "</span>。</span><br>";
                wikifier("money", -sum, "clothes");
            }
            else
                result += "</span>。</span><br>";
        }
        delete V.AutoClothesRepair;
    }
    return result;
}
DefineMacroS('AutoClothesRepairJS_AfterCombat', AutoClothesRepairJS_AfterCombat);
