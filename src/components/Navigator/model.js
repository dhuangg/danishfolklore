/**
 * Created by danielhuang on 1/21/18.
 */
import dataKeywords from '../../data/ckeywords.json'
import dataTango from '../../data/ctango_indices.json'
import dataETK from '../../data/cetk_indices.json'
import dataGenre from '../../data/cgenres.json'
import dataFieldtrips from '../../data/cfieldtrips.json'

const data = {
    keywords:dataKeywords.keyword,
    tango:dataTango.tango_index,
    etk:dataETK.etk_index,
    genre:dataGenre.genre,
    fieldtrips:dataFieldtrips.fieldtrip
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
        return prev;
    }
    alert("Can't get siblings!");
}

export function getStories(path){
    var workingPath = path;
    var indexOfBlank = workingPath.indexOf("");
    if(indexOfBlank!==-1){
        workingPath.slice(indexOfBlank,indexOfBlank+1);
    }
    var storiesAndPlaces = getStoriesPlacesHelper(workingPath, listsModel['Main']);
    return storiesAndPlaces.stories
}

function getStoriesPlacesHelper(pathArr, obj) {
    var storiesArray;
    var placesArray;
    var finalReturnObj;
    if (pathArr.length !== 1 && pathArr[0] !== "") {
        var listName = pathArr[0];
        for (var i = 0; i < obj.childArray.length; i++) {
            var str = obj.childArray[i];
            if (str === listName) {
                var newPath = pathArr.slice(1, pathArr.length+1);
                return getStoriesPlacesHelper(newPath, listsModel[str]);
            }
        }
    } else {
        //this stuff looks for the last item in the pathname
        var listOfFinalStuff = obj.children;
        //TODO: figure out why ETK indices aren't displaying
        //filters the children down to only stuff in the last item in path name
        for(var k = 0; k<listOfFinalStuff.length; k++){
            if(listOfFinalStuff[k].name === pathArr[0]){
                storiesArray = listOfFinalStuff[k].stories.story;
                placesArray = listOfFinalStuff[k].places.place
            }
        }
    }
    finalReturnObj = {stories: storiesArray, places: placesArray};
    if(finalReturnObj.stories!==undefined && finalReturnObj.places!==undefined){
        return finalReturnObj;
    }

}

export const listsModel = {
    'Main':{
        name:'Main',
        childArray:['Data Navigator','Topic & Index Navigator'],
        children:[this['Data Navigator'],this['Topic & Index Navigator']],
        level:0
    },
    'Data Navigator':{
        name:'People, Places, Stories',
        childArray : ['People', 'Places', 'Stories'],
        parent:this['Main'],
        level:1
    },
    'Topic & Index Navigator':{
        name:'Topic & Index Navigator',
        childArray:['ETK Indice', 'Tangherlini Indices', 'Genres', 'Fieldtrips'],
        parent:this['Main'],
        children:[this['ETK'],this['Keywords'],this['Fieldtrips'],this['Genre'],this['Tangherlini Indices']],
        level:1
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
    'People':{
        name:'People',
        childArray:getChildren(data.tango,'type','People', false),
        parent:this['Topic & Navigator'],
        children:getChildren(data.tango,'type','People',true),
        level:3
    },
    'Places':{
        name:'Places',
        childArray:getChildren(data.tango,'type','Places', false),
        parent:this['Topic & Navigator'],
        children:getChildren(data.tango,'type','Places',true),
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