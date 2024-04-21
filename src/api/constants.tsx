import axios from "axios";

export async function getMetricMap(){
    try {
        const response = await axios.get(
          'http://localhost:8000/constants/metric_map/',
          {headers: {'Content-Type': 'application/json',}},  
        );           
        return response.data;
    } catch (e) {
        return;
    }
  }
