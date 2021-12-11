//jshint esversion:9
import { TIMEOUT_SECS } from "./config.js"; //10 secs


const timeout = function (s=TIMEOUT_SECS) {
    return new Promise(function (_, reject) {
      setTimeout(()=> {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };



export const getJSON = async function (url) {
    try {
        //1 Fetch API
    const res = await Promise.race([fetch(url),timeout()]); // Race against fetch & the timeout() 
    const data = await res.json();

    if (!res.ok) throw new Error(` Data Message: ${data.message} response Status ${res.status}`);
        return data;
    } catch (err) {
        throw err; // throw an error / propagate to the function upstream that called this function e.g the promise from model.js
    }
  
};