import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getLocation, getOnecall } from "../redux.js/weather_onecall/action";
import { Chart } from "./Chart";
import { GetAllData, getDAta } from "../redux.js/debouncing/action";
import CircularProgress from "@mui/material/CircularProgress";
import { Map } from "./Map";
import { Sunchart } from "./Sunchart";

const getAllDays = () => {
  const weakday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let arr = [];

  const d = new Date();

  const day = weakday[d.getDay()];

  weakday.filter((ele, ind) => {
    if (day === ele) {
      for (let i = 0; i < 8; i++) arr.push(weakday[(ind + i) % 7]);
    }

    return 1;
  });

  return arr;
};

export const Home = () => {
  const dispatch = useDispatch();
  const days = getAllDays();
  const [locationSt, setLocationSt] = useState(true);
  const [searchModel, setSearchModel] = useState(false);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function success(position) {
      if (locationSt) {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      }
    });
    dispatch(getLocation(lat, lon));
    dispatch(getOnecall(lat, lon));
  }, [dispatch, lat, locationSt, lon]);

  const { curr_location } = useSelector((store) => store.weather);
  const { weather_onecall } = useSelector((store) => store.weather);

  const searchCity = (e) => {
    let value = document.getElementById("location_in").value;
    if (value.length > 0) {
      dispatch(getDAta(value));
    }
  };
  const { get_data_success, get_data_loading } = useSelector(
    (store) => store.debouncing
  );
  useEffect(() => {
    if (get_data_success.length) {
      dispatch(GetAllData(get_data_success));
      setSearchModel(true);
    }
  }, [dispatch, get_data_success]);
  const debounce = (func, delay) => {
    setTimeout(() => {
      func();
    }, delay);
  };
  const { all_city_data } = useSelector((store) => store.debouncing);

  return (
    <>       
    <div className="App">
      <div
        className="search_div"
        style={{ outline: focused ? "1.5px solid rgb(255, 129, 169)" : "" }}
      >
        <div>
          <svg
            width="30px"
            height="60px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"            
          >
            <path
              d="M17.5834 5.16602C14.5001 2.08268 9.50008 2.08268 6.41675 5.16602C3.33341 8.24935 3.33341 13.3327 6.41675 16.416L12.0001 21.9993L17.5834 16.3327C20.6667 13.3327 20.6667 8.24935 17.5834 5.16602ZM12.0001 12.416C11.0834 12.416 10.3334 11.666 10.3334 10.7493C10.3334 9.83268 11.0834 9.08268 12.0001 9.08268C12.9167 9.08268 13.6667 9.83268 13.6667 10.7493C13.6667 11.666 12.9167 12.416 12.0001 12.416Z"
              fill="#000000"
            ></path>
          </svg>
        </div>
        <div style={{ flexGrow: 1 }}>
          <input
            type="text"
            id="location_in"
            onInput={(e) => debounce(searchCity, 1000)}
            placeholder={curr_location}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>

        <div style={{ marginLeft: "auto" }}>
          <svg
            version="1.1"
            id="Layer_1"
            x="0px"
            y="0px"
            width="30px"
            height="25px"
            viewBox="0 0 122.879 119.799"
            enableBackground="new 0 0 122.879 119.799"
          >
            <g>
              <path d="M49.988,0h0.016v0.007C63.803,0.011,76.298,5.608,85.34,14.652c9.027,9.031,14.619,21.515,14.628,35.303h0.007v0.033v0.04 h-0.007c-0.005,5.557-0.917,10.905-2.594,15.892c-0.281,0.837-0.575,1.641-0.877,2.409v0.007c-1.446,3.66-3.315,7.12-5.547,10.307 l29.082,26.139l0.018,0.016l0.157,0.146l0.011,0.011c1.642,1.563,2.536,3.656,2.649,5.78c0.11,2.1-0.543,4.248-1.979,5.971 l-0.011,0.016l-0.175,0.203l-0.035,0.035l-0.146,0.16l-0.016,0.021c-1.565,1.642-3.654,2.534-5.78,2.646 c-2.097,0.111-4.247-0.54-5.971-1.978l-0.015-0.011l-0.204-0.175l-0.029-0.024L78.761,90.865c-0.88,0.62-1.778,1.209-2.687,1.765 c-1.233,0.755-2.51,1.466-3.813,2.115c-6.699,3.342-14.269,5.222-22.272,5.222v0.007h-0.016v-0.007 c-13.799-0.004-26.296-5.601-35.338-14.645C5.605,76.291,0.016,63.805,0.007,50.021H0v-0.033v-0.016h0.007 c0.004-13.799,5.601-26.296,14.645-35.338C23.683,5.608,36.167,0.016,49.955,0.007V0H49.988L49.988,0z M50.004,11.21v0.007h-0.016 h-0.033V11.21c-10.686,0.007-20.372,4.35-27.384,11.359C15.56,29.578,11.213,39.274,11.21,49.973h0.007v0.016v0.033H11.21 c0.007,10.686,4.347,20.367,11.359,27.381c7.009,7.012,16.705,11.359,27.403,11.361v-0.007h0.016h0.033v0.007 c10.686-0.007,20.368-4.348,27.382-11.359c7.011-7.009,11.358-16.702,11.36-27.4h-0.006v-0.016v-0.033h0.006 c-0.006-10.686-4.35-20.372-11.358-27.384C70.396,15.56,60.703,11.213,50.004,11.21L50.004,11.21z" />
            </g>
          </svg>
        </div>
      </div>
      {weather_onecall.daily ? (
        <div className="days">
          {days.map((el, ind) => (
            <div
              onClick={() => setIndex(ind)}
              key={ind}
              className="day"
              style={{
                border: `1.6px solid ${index === ind ? "orange" : "white"}`,
                borderRadius: '5px'
              }}
            >
              <p style={{ color:'green', fontSize: "20px", fontWeight: "600" }}>{el}</p>
              {weather_onecall.daily ? (
                <>
                  <p>
                    <span>
                      {Math.round(weather_onecall.daily[ind].temp.max)}°
                    </span>
                    <span style={{ color: "gray" }}>
                      {Math.round(weather_onecall.daily[ind].temp.min)}°
                    </span>
                  </p>
                  <img
                    src={
                      weather_onecall.daily[ind].weather[0].main === "Clouds"
                        ? "https://cdn-icons-png.flaticon.com/512/1146/1146856.png"
                        : weather_onecall.daily[ind].weather[0].main === "Rain"
                        ? "https://cdn-icons-png.flaticon.com/512/1146/1146858.png"
                        : weather_onecall.daily[ind].weather[0].main === "Clear"
                        ? "https://cdn-icons-png.flaticon.com/512/890/890347.png"
                        : ""
                    }
                    alt=""
                  />
                  <p style={{color:'blue', fontSize: "14px" }}>
                    {weather_onecall.daily[ind].weather[0].main}
                  </p>
                </>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}     
      <div className="temp_var">
        <div
          style={{
            fontSize: "60px",
            display: "flex",
            fontWeight: "600",
            width: "220px",
            justifyContent: "space-between",
          }}
        >
          {weather_onecall.daily ? (
            <>
              {Math.round(weather_onecall.daily[index].temp.max)}°C
              <img
                style={{ width: "60px", height: "60px" }}
                src={
                  weather_onecall.daily[index].weather[0].main === "Clouds"
                    ? "https://cdn-icons-png.flaticon.com/512/1146/1146856.png"
                    : weather_onecall.daily[index].weather[0].main === "Rain"
                    ? "https://cdn-icons-png.flaticon.com/512/1146/1146858.png"
                    : weather_onecall.daily[index].weather[0].main === "Clear"
                    ? "https://cdn-icons-png.flaticon.com/512/890/890347.png"
                    : ""
                }
                alt=""
              />
            </>
          ) : (
            ""
          )}
        </div>

        {weather_onecall.hourly ? <Chart index={index} /> : ""}

        {weather_onecall.daily ? (
          <>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  width: "50%",
                  backgroundColor: "#d64bf929",
                  borderRadius: "5px",
                  padding: "10px",
                  margin: "5px",
                  fontSize: "16px",
                  lineHeight: "18.4px",
                }}
              >
                <div style={{ fontWeight: "700", lineHeight: "18.4px" }}>
                  Pressure
                </div>
                <div className="pressure">{weather_onecall.daily[index].pressure} hpa</div>
              </div>
              <div
                style={{
                  width: "50%",
                  backgroundColor: "#d64bf929",
                  borderRadius: "5px",
                  padding: "10px",
                  margin: "5px",
                  fontSize: "16px",
                  lineHeight: "18.4px",
                }}
              >
                <div style={{ fontWeight: "700" }}>Humidity</div>
                <div className="humidity">{weather_onecall.daily[index].humidity}%</div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                fontSize: "16px",
                lineHeight: "18.4px",
              }}
            >
              <div>
                <div style={{color:'blue', fontWeight: "700" }}>Sunrise</div>
                <div>
                  {new Date(
                    +weather_onecall.daily[index].sunrise * 1000
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <div>
                <div style={{ color:'blue', fontWeight: "700" }}>Sunset</div>
                <div>
                  {new Date(
                    +weather_onecall.daily[index].sunset * 1000
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {weather_onecall.daily?<div>
          <Sunchart/>
        </div>:""}
      </div>

      {get_data_loading ? (
        <div className="search_model">
          <CircularProgress />
        </div>
      ) : (
        ""
      )}
      {all_city_data && searchModel ? (
        <div className="search_model">
          {all_city_data.map((el, i) => (
            <div
              onClick={() => {
                if (el.coord) {
                  setLat(el.coord.lat);
                  setLon(el.coord.lon);
                  document.getElementById("location_in").value = "";
                  setLocationSt(false);
                  setSearchModel(false);
                } else {
                  dispatch(get_data_loading());
                }
              }}
              key={i}
              style={{
                padding: "10px",
                borderBottom: "1px solid gray",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontSize: "16px", lineHeight: "18.4px" }}>
                <span style={{ fontWeight: "700" }}>
                  {el.name ? el.name.split(", ")[0] : el.split(", ")[0]},{" "}
                </span>
                <span>
                  {el.name ? el.name.split(", ")[1] : el.split(", ")[1]}
                </span>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ fontSize: "16px", lineHeight: "18.4px" }}>
                  <div style={{ fontWeight: "700" }}>
                    {el.main ? Math.round(el.main.temp) : "IN"}° C
                  </div>
                  <div>{el.weather ? el.weather[0].main : ""}</div>
                </div>
                <div>
                  {el.weather ? (
                    <img
                      style={{ height: "35px" }}
                      src={
                        el.weather[0].main === "Clouds"
                          ? "https://cdn-icons-png.flaticon.com/512/1146/1146856.png"
                          : el.weather[0].main === "Rain"
                          ? "https://cdn-icons-png.flaticon.com/512/1146/1146858.png"
                          : el.weather[0].main === "Clear"
                          ? "https://cdn-icons-png.flaticon.com/512/890/890347.png"
                          : el.weather[0].main === "Mist"
                          ? "https://cdn-icons-png.flaticon.com/512/4005/4005817.png"
                          : el.weather[0].main === "Haze"
                          ? "https://cdn-icons-png.flaticon.com/512/1779/1779807.png"
                          : ""
                      }
                      alt=""
                    />
                  ) : (
                    <img
                      style={{ height: "35px" }}
                      src="https://cdn-icons.flaticon.com/png/512/5217/premium/5217790.png?token=exp=1656103750~hmac=2996b4a7a8bb1c0999af4f4782620f6d"
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
       <div>
        <Map />
      </div>
    </div>
    </>
  );
};
