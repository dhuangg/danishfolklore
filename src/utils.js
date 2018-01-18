/**
 * Created by danielhuang on 1/14/18.
 */
//return array of same key:pair value (i.e. gets me a list of all children of "Places")
export function getChildren(list,key,value){
    var items=[];
    for(var i=0; i<list.length; i++){
        if(value === list[i][key]){
            items.push(list[i]);
        }
    }
    return items;
}