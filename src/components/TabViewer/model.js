/**
 * Created by danielhuang on 1/29/18.
 */
import AllStories from '../../data/allstories.json';

const storyData = AllStories;
const formattedStoryData = arrOfObjToObj(storyData);

export function getStoryByID(story_id){
    return formattedStoryData[story_id]

}

function arrOfObjToObj(arrOfObj){
    var resultObj = {};

    arrOfObj.forEach((obj) => {
        resultObj[obj['story_id']] = obj;
    });

    return resultObj;
}