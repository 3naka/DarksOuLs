//尝试在凌晨时对艾弗里进行自动投喂
//艾弗里会优先吃自己想吃的菜。
function AutoCleanFeedAvery() {
    if (V.avery_fate === "saved" || V.avery_fate === "ascended") {
        if (V.avery_mansion.food && V.plants[V.avery_mansion.food.name].amount > 0) {
            V.plants[V.avery_mansion.food.name].amount -= 1;
        }
        else if (V.plants.steak.amount > 0) { V.plants.steak.amount -= 1; }
        else if (V.plants.soufflé.amount > 0) { V.plants.soufflé.amount -= 1; }
        else if (V.plants.linguine.amount > 0) { V.plants.linguine.amount -= 1; }
        else {
            let foods = Object.keys(Object.fromEntries(
                Object.entries(setup.plants)
                    .filter(([key, value]) =>
                        value.type === "food" &&
                        V.plants[key].amount > 0 &&
                        !value.special.includes("drink")
                    ).sort(([, a], [, b]) => b.difficulty - a.difficulty)
            ));
            if (foods.length < 1) {
                V.avery_mansion.rage.dinner_missed++;
            }
            else {
                V.plants[foods[0]].amount -= 1;
            }
        }

    }
    else {
        V.avery_mansion.rage.dinner_missed++;
    }
    wikifier("avery_food_select");
    return "";
}

//把农场处理也js化吧，所有数据处理放在一起好了
//被这个truffles和truffle气笑了
function AutoCleanFarm() {
    if(V.farm && V.farm.tower_guard && V.farm.tower_guard_skill && V.farm.tower_guard_skill >= 1000)
    {
        if(V.farm.beasts && V.farm.beasts.horses) V.farm.beasts.horses = 30;
        if(V.farm.beasts && V.farm.beasts.pigs) V.farm.beasts.pigs = 30;
        if(V.farm.beasts && V.farm.beasts.cattle) V.farm.beasts.cattle = 30;
        if(V.farm.beasts && V.farm.beasts.dogs) V.farm.beasts.dogs = 30;
        if (V.farm_stage >= 5 && V.farm.aggro)V.farm.aggro = 0;
        //V.farm_attack_timer = 30;
    }

    if(V.farm && V.farm.stock)
    {
        Object.entries(V.farm.stock).forEach(([key, value]) => {
            if(value>0) {
                let Tkey = key;
                if(key === "eggs") Tkey = "chicken_egg";
                else if (key === "milk") Tkey = "bottle_of_milk";
                else if (key === "truffles") Tkey = "truffle";
                wikifier("tending_give",Tkey,value);
                V.farm.stock[key] = 0;
            }
  
        });
    }
}


