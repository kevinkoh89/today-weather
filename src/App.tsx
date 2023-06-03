import { useState } from 'react'
import { fetcher, convertDate } from './helper'
import SearchForm from './SearchForm'
import Card from './Card'
import { BlockTitle, BlockContainer, NotFound, NoRecord } from './CommonStyle'
import './App.css'
import SearchHistory, { SearchHistoryData } from './SearchHistory'

export interface Weather {
  state: string,
  country: string,
  weather: string,
  weatherDesc: string,
  tempMin: string,
  tempMax: string,
  humidity: string,
  dateTime: string,
}

export interface IDefaultSearch {
  city: string,
  country: string
}

const App = () => {

  const [weatherResult, setWeatherResult] = useState<Weather | null | undefined>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryData[] | []>([]);
  const [defaultSearch, setDefaultSearch] = useState<IDefaultSearch>();

  const handleSubmit = async (v: IDefaultSearch) => {
    console.log({ v })
    const { city, country } = v;
    let query = `${city}${country}`

    if (city !== '' && country !== '') {
      query = city.concat(',', country)
    }

    if (query !== '') {
      const url = `//api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=bdc75be0e6df295868d30a6faf2acee8`
      const lonLatdata = await fetcher(url);
      if (lonLatdata[0] && lonLatdata.length > 0) {
        const { lon, lat, name, country } = lonLatdata[0]
        const weatherData = await fetcher(`//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bdc75be0e6df295868d30a6faf2acee8`);
        setWeatherResult({
          state: name,
          country: country,
          weather: weatherData.weather[0].main,
          weatherDesc: weatherData.weather[0].description,
          tempMin: weatherData.main.temp_min,
          tempMax: weatherData.main.temp_max,
          humidity: weatherData.main.humidity,
          dateTime: convertDate(weatherData.dt, false, 'dateTime')
        })
        setSearchHistory((prev: React.SetStateAction<SearchHistoryData[] | []>) => {
          const p = prev as SearchHistoryData[];
          const newHistory: SearchHistoryData = {
            id: (new Date()).toString(),
            state: name,
            country: country,
            time: convertDate(Math.floor(Date.now() / 1000), true, 'time'),
            query: { city: name, country }
          }
          return ([...p, newHistory])
        })
      } else {
        setWeatherResult(undefined)
      }
    }
  }

  const deleteHistoryHandler = (historyId: string) => {
    setSearchHistory((prev: React.SetStateAction<SearchHistoryData[]>) => {
      const filteredHistory = prev as SearchHistoryData[];
      return filteredHistory.filter((p: SearchHistoryData) => p.id !== historyId)
    })
  }

  const searchHistoryHandler = (query: IDefaultSearch) => {
    handleSubmit(query)
    setDefaultSearch(query)
  }

  const onClearHandler = () => {
    setWeatherResult(null)
  }

  return (
    <div>
      <BlockTitle>Today's Weather</BlockTitle>
      <SearchForm handleSubmit={handleSubmit} defaultSearch={defaultSearch} onClear={onClearHandler} />
      <BlockContainer>
        {weatherResult ? <Card data={weatherResult} /> :
          weatherResult === undefined ?
            <NotFound>
              Not Found
            </NotFound>
            : <NoRecord>Start searching</NoRecord>
        }
      </BlockContainer>
      <BlockTitle>Search History</BlockTitle>
      <BlockContainer>
        {searchHistory && searchHistory.length > 0 ? <SearchHistory data={searchHistory} onDelete={deleteHistoryHandler} onSearch={searchHistoryHandler} />
          : <NoRecord>No Record</NoRecord>}
      </BlockContainer>
    </div>
  )
}

export default App
