/**
 * Created by danielhuang on 1/21/18.
 */
import dataKeywords from '../../data/ckeywords.json'
import dataTango from '../../data/ctango_indices.json'
import dataETK from '../../data/cetk_indices.json'
import dataGenre from '../../data/cgenres.json'
import dataFieldtrips from '../../data/cfieldtrips.json'
import informants from '../../data/cinformants.json'
import storySearch from '../../data/cstories.json'
import places from '../../data/cplaces.json'

const data = {
    keywords:dataKeywords.keyword,
    tango:dataTango.tango_index,
    etk:dataETK.etk_index,
    genre:dataGenre.genre,
    fieldtrips:dataFieldtrips.fieldtrip,
    people: informants.informant,
    places: places.place,
    stories: storySearch.story
};

//return array of same key:pair value (i.e. gets me a list of all children of "Places")
function getChildren(list,key,value,isObj){
    var items=[];
    for(var i=0; i<list.length; i++){
        if(value === list[i][key]){
            if(isObj){
                items.push(list[i]);
            } else {
                items.push(list[i].name);
            }
        }
    }
    items.push('[Select]');
    return items;
}

//return array of values with the same key
function getSiblings(list,key,isObj) {
    if (key === 'MAIN' || key === 'TOPIC' || key === 'PPS' || key === '') {
        return list;
    }
    if (typeof list !== 'undefined' && typeof key !== 'undefined') {
        var prev = [];
        for (var i = 0; i < list.length; i++) {
            var curr = list[i][key];
            if (!prev.includes(curr)) {
                if(isObj){
                    prev.push(list[i])
                } else {
                    prev.push(curr);
                }
            }
        }
        prev.push('[Select]');
        return prev;
    }
    alert("Can't get siblings!");
}

export function getItems(path, listType){
    //2) clean the path
    var workingPath = path;
    var indexOfBlank = workingPath.indexOf("");
    if(indexOfBlank!==-1){
        workingPath.slice(indexOfBlank,indexOfBlank+1);
    }
    // console.log(path, listType);
    //3) call on helper to get list of objects
    var listOfItems = getItemsHelper(workingPath, listsModel['Main']);
    //4) have return array based on people, places, fieldtrips, stories
    if(listType==='stories'){
        console.log(listOfItems);
        if(listOfItems.stories.constructor === Array){
            //this is the situation when there's only 1 item in the list, it's just an object (i.e. "Rhymes" under Tango Indices)
            return listOfItems.stories;
        } else {
            return [listOfItems.stories];
        }
    }
}

function getItemsHelper(pathArr, obj) {
    console.log(obj);
    var storiesArray;
    var placesArray;
    var finalReturnObj;
    if (pathArr.length !== 1 && pathArr[0] !== "") {
        var listName = pathArr[0];
        for (var i = 0; i < obj.childArray.length; i++) {
            var str = obj.childArray[i];
            if (str === listName) {
                var newPath = pathArr.slice(1, pathArr.length+1);
                return getItemsHelper(newPath, listsModel[str]);
            }
        }
    } else {
        //this stuff looks for the last item in the pathname
        var listOfFinalStuff = obj.children;
        console.log('what we are looking for: ',obj);
        //filters the children down to only stuff in the last item in path name
        for(var k = 0; k<listOfFinalStuff.length; k++){
            if(listOfFinalStuff[k].name === pathArr[0] || listOfFinalStuff[k].heading_english === pathArr[0]) {
                    if('stories' in listOfFinalStuff[k]) {
                        storiesArray = listOfFinalStuff[k].stories.story;
                        placesArray = listOfFinalStuff[k].places.place
                    }
                }
            }
    }

    finalReturnObj = {stories: storiesArray, places: placesArray};
    if(finalReturnObj.stories!==undefined && finalReturnObj.places!==undefined){
        return finalReturnObj;
    }

}
//TODO: clean up undefined/empty values (i.e. last value of fieldtrip search results
export const listsModel = {
    'Main':{
        name:'Main',
        childArray:['Data Navigator','Topic & Index Navigator','[Select]'],
        children:[this['Data Navigator'],this['Topic & Index Navigator']],
        level:0
    },
    'Data Navigator':{
        name:'People, Places, Stories',
        childArray : ['People', 'Places', 'Stories','[Select]'],
        parent:this['Main'],
        children:[this['People']],
        level:1
    },
    'Topic & Index Navigator':{
        name:'Topic & Index Navigator',
        childArray:['ETK Indice', 'Tangherlini Indices', 'Genres', 'Fieldtrips','[Select]'],
        parent:this['Main'],
        children:[this['ETK'],this['Keywords'],this['Fieldtrips'],this['Genre'],this['Tangherlini Indices']],
        level:1
    },
    'People':{
        name:'People',
        childArray:getSiblings(data.people,'full_name', false),
        parent:this['Data Navigator'],
        children:getSiblings(data.people,'full_name',true),
        level:2
    },
    'Places':{
        name:'Places',
        childArray:getSiblings(data.places,'name', false),
        parent:this['Data Navigator'],
        children:getSiblings(data.places,'name',true),
        level:2
    },
    'Stories':{
        name:'Stories',
        childArray:getSiblings(data.stories,'full_name', false),
        parent:this['Data Navigator'],
        children:getSiblings(data.stories,'full_name',true),
        level:2
    },
    'ETK Indice':{
        name:'ETK Indice',
        childArray:getSiblings(data.etk,'heading_english', false),
        parent:this['Topic & Navigator'],
        children:getSiblings(data.etk,'heading_english',true),
        level:2
    },
    'Keywords':{
        name:'Keywords',
        childArray:getSiblings(data.keywords,'keyword_name'),
        parent:this['Topic & Navigator'],
        children:getSiblings(data.keywords,'keyword_name',true),
        level:2
    },
    'Fieldtrips':{
        name:'Fieldtrips',
        childArray:getSiblings(data.fieldtrips,'fieldtrip_name'),
        parent:this['Topic & Navigator'],
        children:getSiblings(data.fieldtrips,'fieldtrip_name',true),
        level:2
    },
    'Genres':{
        name:'Genres',
        childArray:getSiblings(data.genre,'name'),
        parent:this['Topic & Navigator'],
        children:getSiblings(data.genre,'name',true),
        level:2
    },
    'Tangherlini Indices':{
        name:'Tangherlini Indices',
        childArray:getSiblings(data.tango,'type'),
        parent:this['Topic & Navigator'],
        children:getSiblings(data.tango,'type',true),
        level:2
    },
    'People Classes':{
        name:'People Classes',
        childArray:getChildren(data.tango,'type','People Classes', false),
        parent:this['Topic & Navigator'],
        children:getChildren(data.tango,'type','People Classes',true),
        level:3
    },
    'Place Classes':{
        name:'Places',
        childArray:getChildren(data.tango,'type','Places Classes', false),
        parent:this['Topic & Navigator'],
        children:getChildren(data.tango,'type','Places Classes',true),
        level:3
    },
    'Tools, Items and Conveyances':{
        name:'Tools, Items and Conveyances',
        childArray:getChildren(data.tango,'type','Tools, Items and Conveyances', false),
        parent:this['Topic & Navigator'],
        children:getChildren(data.tango,'type','Tools, Items and Conveyances',true),
        level:3
    },
    'Supernatural Beings':{
        name:'Supernatural Beings',
        childArray:getChildren(data.tango,'type','Supernatural Beings', false),
        parent:this['Topic & Navigator'],
        children:getChildren(data.tango,'type','Supernatural Beings',true),
        level:3
    },
    'Animals':{
        name:'Animals',
        childArray:getChildren(data.tango,'type','Animals', false),
        parent:this['Topic & Navigator'],
        children:getChildren(data.tango,'type','Animals',true),
        level:3
    },
    'Action or events':{
        name:'Action or events',
        childArray:getChildren(data.tango,'type','Action or events', false),
        parent:this['Topic & Navigator'],
        children:getChildren(data.tango,'type','Action or events',true),
        level:3
    },
    'Time, Season, Weather':{
        name:'Time, Season, Weather',
        childArray:getChildren(data.tango,'type','Time, Season, Weather', false),
        parent:this['Topic & Navigator'],
        children:getChildren(data.tango,'type','Time, Season, Weather',true),
        level:3
    },
    'Resolution':{
        name:'Resolution',
        childArray:getChildren(data.tango,'type','Resolution', false),
        parent:this['Topic & Navigator'],
        children:getChildren(data.tango,'type','Resolution',true),
        level:3
    },
    'Stylistics':{
        name:'Stylistics',
        childArray:getChildren(data.tango,'type','Stylistics', false),
        parent:this['Topic & Navigator'],
        children:getChildren(data.tango,'type','Stylistics',true),
        level:3
    },
};