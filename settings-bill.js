module.exports = function SettingsBill() {

    let smsCost;
    let callCost;
    let warningLevel;
    let criticalLevel; 

    var smsTotals = 0;
    var callTotals = 0;
    var grandTotals = 0;

    let actionList = [];

    function setSettings (settings) {

        console.log(settings);

        smsCost = Number(settings.smsCost);
        callCost = Number(settings.callCost);
        warningLevel = settings.warningLevel;
        criticalLevel = settings.criticalLevel;
    }

    function getSettings
    () {
        return {
            smsCost,
            callCost,
            warningLevel,
            criticalLevel
        }
    }

    function recordAction(action) {
        var cost = 0;
        if (action === 'SMS'){
         smsTotals += smsCost;
         grandTotals += smsCost;
         cost =  smsCost;
          //adding onto the global variable "cost" in order to keep record in the list

        }
        else if (action === 'Call'){
            callTotals += callCost;
            grandTotals += callCost;
            cost = callCost ;
            //adding onto the global variable "cost" in order to keep record in the list
        }

        actionList.push({
            type: action,
            cost,
            timestamp: new Date()
        });
    }

    function actions(){
        return actionList;
    }

    function actionsFor(type){
        const filteredActions = [];

        // loop through all the entries in the action list 
        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            // check this is the type we are doing the total for 
            if (action.type === type) {
                // add the action to the list
                filteredActions.push(action);
            }
        }

        return filteredActions;

        // return actionList.filter((action) => action.type === type);
    }

    function getTotal(type) {
        let total = 0;
        // loop through all the entries in the action list 
        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            // check this is the type we are doing the total for 
            if (action.type === type) {
                // if it is add the total to the list
                total += action.cost;
            }
        }
        return total;

        // the short way using reduce and arrow functions

        // return actionList.reduce((total, action) => { 
        //     let val = action.type === type ? action.cost : 0;
        //     return total + val;
        // }, 0);
    }

    function totals() {
        return {
            smsTotals,
            callTotals,
            grandTotals 

        }
    }

    function hasReachedWarningLevel(){
        const total = getTotal();
        const reachedWarningLevel = total >= warningLevel 
            && total < criticalLevel;

        return reachedWarningLevel;
    }

    function hasReachedCriticalLevel(){
        const total = getTotal();
        return total >= criticalLevel;
    }
function forColor(){
    if(hasReachedCriticalLevel()){
        return danger ;
    }
    if(hasReachedWarningLevel()){
        return warning ;
    }
}
    return {
        setSettings,
        getSettings,
        recordAction,
        actions,
        actionsFor,
        totals,
        forColor,
        getTotal,
        hasReachedWarningLevel,
        hasReachedCriticalLevel
    }
}