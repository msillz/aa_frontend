import axios from "axios";


function tryRefreshAuthKey(){
  console.log(localStorage.getItem('refresh_token'));
}


export async function verifyToken(callback){
  try {
      const response = await axios.get(
        'http://localhost:8000/token/verify/',
        {headers: {'Content-Type': 'application/json',}},  
      );           

      if (response.status === 200) {
          callback(true);
      } else{
        callback(false);
      }
  } catch (e) {
      return;
  }
}

/////////////////////////////////
/* Axios Interceptor Functions */
/////////////////////////////////

// Add a request interceptor
axios.interceptors.request.use(function (config) {

  // Do something before request is sent
  const token = localStorage.getItem('access_token');
  if(token){
    config.headers['Authorization'] = 'Bearer '+localStorage.getItem('access_token');
  } else{
    tryRefreshAuthKey();
  }
  return config;

}, function (error) {
  // Do something with request error
  console.log("REQUEST ERROR");
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if(error.response.status === 401){
    tryRefreshAuthKey();
  } else{
    return Promise.reject(error);
  }
});