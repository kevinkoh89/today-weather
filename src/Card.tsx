import { StyledCard, ItemRow, Item } from './CommonStyle'
import { Weather } from './App'
interface IWeatherResult {
    data: Weather
}

const Card: React.FC<IWeatherResult> = ({
    data
}) => {
    const { state, country, weather, weatherDesc, tempMin, tempMax, humidity, dateTime } = data;
    return <StyledCard>
        <ItemRow>
            <Item>{state}, {country}</Item>
        </ItemRow>
        <ItemRow>
            <Item higlight={'Y'}>{weather}</Item>
        </ItemRow>
        <ItemRow>
            <Item>Description:</Item>
            <Item>{weatherDesc}</Item>
        </ItemRow>
        <ItemRow>
            <Item>Temperature:</Item>
            <Item>{tempMin}~{tempMax}</Item>
        </ItemRow>
        <ItemRow>
            <Item>Humidity:</Item>
            <Item>{humidity}</Item>
        </ItemRow>
        <ItemRow>
            <Item>Time:</Item>
            <Item>{dateTime}</Item>
        </ItemRow>
    </StyledCard>

}

export default Card