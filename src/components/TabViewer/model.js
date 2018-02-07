/**
 * Created by danielhuang on 1/29/18.
 */
import AllStories from '../../data/allstories.json';
import PeopleData from '../../data/cinformants.json';

const peopleData = arrOfObjToObj(PeopleData.informant,'person_id');
const storyData = AllStories;
const formattedStoryData = arrOfObjToObj(storyData,'story_id');

export function getStoryByID(story_id){
    return formattedStoryData[story_id]
}

export function getPeopleByID(person_id){
    console.log('Get People by ID',peopleData[person_id]);
}

function arrOfObjToObj(arrOfObj, id){
    var resultObj = {};

    arrOfObj.forEach((obj) => {
        resultObj[obj[id]] = obj;
    });
    return resultObj;
}