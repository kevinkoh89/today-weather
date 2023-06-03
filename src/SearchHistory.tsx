import { Wrapper, ItemRow, Item } from './CommonStyle'
import { IDefaultSearch } from './App'

export interface SearchHistoryData {
    id: string,
    state: string,
    country: string,
    time: string,
    query: IDefaultSearch
}

interface IWeatherResult {
    data: SearchHistoryData[] | [];
    onDelete: (historyId: string) => void;
    onSearch: (query: IDefaultSearch) => void;
}

const SearchHistory: React.FC<IWeatherResult> = ({ data, onDelete, onSearch }) => {

    const RowData = ({ data, index }: { data: SearchHistoryData, index: number }) => {
        const { id, state, country, time, query } = data;
        return <ItemRow bordered={'Y'} key={state}>
            <Item>{index + 1}. {state}, {country}</Item>
            <Item>{time}</Item>
            <Item><button onClick={() => onSearch(query)} >Search</button><button onClick={() => onDelete(id)} >Delete</button></Item>
        </ItemRow>
    }
    return <Wrapper>
        {data && data.map((value: SearchHistoryData, index: number) => {
            return <RowData data={value} index={index} />
        })}
    </Wrapper>

}

export default SearchHistory