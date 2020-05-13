import axios from "axios";
import { SEARCH, RES_SEARCH, ERR_SEARCH } from "./constants";

const API_PLANETS = "https://swapi.dev/api/planets/";


export const searchPlanets = name => {
  const request = axios.get(`${API_PLANETS}?search=${name}`);

  return function (dispatch) {
    dispatch({
      type: SEARCH
    });

    return request
      .then(res => {
        dispatch({
          type: RES_SEARCH,
          payload: doArraySort(res.data.results)
        });
      })
      .catch(err => {
        dispatch({
          type: ERR_SEARCH,
          payload: err
        });
      });
  };
};


const doArraySort =(array =[])=>{

  if(array && array.length > 0){

    array.sort(function(a, b) {
      return b.population - a.population  ;
    })
  }
  
  array.forEach(element => {
    
    if(parseInt(element.population , 10)  >= 100000000000){

      element.css_notifier = "blue-high";
    }
    else if(parseInt(element.population, 10)  >= 50000000000 && parseInt(element.population)  < 100000000000){

      element.css_notifier = "yellow-mid";
    }
    else if(parseInt(element.population, 10)  >= 10000000000 && parseInt(element.population)  < 50000000000){

      element.css_notifier = "green-low ";
    }
    else {

      element.css_notifier = "green-low ";
    }

    

  });

  return array;
}
