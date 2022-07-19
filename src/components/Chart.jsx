import ApexCharts from "apexcharts";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const getData = (index, weather) => {
    let times = [
        [],[]
    ];
    let data = [
        [],[]
    ];
    const time = new Date().toLocaleTimeString([], { hour: "2-digit" }).split(" ");
    let flag = true
    let count = 0;
    let t = time[1];
    for(let i = (+time[0]); i <=12; i++){
        times[0].push(i+" "+t);
        data[0].push(weather.hourly[count].temp+"°C");
        count++;
        if(flag&&i===12&&time[1]==="AM") {i = 0; flag=false;t = "PM"}
    }
    t = "AM"
    for(let i = 1; i <=12; i++){
        times[1].push(i+" "+t);
        data[1].push(weather.hourly[count].temp+"°C");
        count++;
        if(!flag&&i===12) {i=0; flag=true; t = "PM"}
    }
    return {times, data}
}

export const Chart = ({index})=>{
    const {weather_onecall} = useSelector(store=>store.weather);
    const {times,data}=useMemo(()=>getData(index, weather_onecall),[weather_onecall,index]);
   let options = {
    series: [{
    name: 'temperature(°C)',
    data: data[index]
  }],
    chart: {
    height: 350,
    type: 'area'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    categories: index===0?times[0]:times[1],
  },
  yaxis:{
    labels:{
        show:false,
    }
  },
  tooltip: {
    x: {
      format: 'HH'
    },
  },
  };  
}