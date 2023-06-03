import styled, { css } from 'styled-components'

const BlockTitle = styled.div`
    font-weight: bold;
    font-size: 16px;
    border-bottom: solid 2px #FFFFFF;
    margin-bottom: 10px;
    padding: 10px 0;
`
const BlockContainer = styled.div`
    margin: 10px 0;
    padding: 10px;
`
const StyledForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`
const StyledLabel = styled.label`
    flex: 0 1 275px;
`
const StyledInput = styled.input`
    margin: 0 10px;
    height: 42px;
    padding: 5px 10px;
    box-sizing: border-box;
`
const ButtonWrapper = styled.div`
   button + button {
    margin-left: 5px;   
   }
`
const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 320px;
    padding: 10px;
    border: solid 1px black;
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
`
const NotFound = styled.div`
    border: solid 1px #FF0000;
    background: #FFCCCB;
    padding: 5px;
    color: #000000;
`
const NoRecord = styled.div`
    font-size: 16px;
    text-align: center;
    padding: 5px;
    color: #808080;
`
interface IItemRow {
    bordered?: string;
}
const ItemRow = styled.div<IItemRow>`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: 5px;
    ${({ bordered }) => bordered === 'Y' && 'border-bottom: solid 1px grey'};
    :first-child {
        flex: 1 1 auto;
    }
`
interface IItem {
    higlight?: string;
}
const Item = styled.div<IItem>`
    display: flex;
    vertical-align: middle;
    align-self: center;
    flex: 0 0 200px;
    ${({ higlight }) => {
        switch (higlight) {
            case 'Y':
                return css`
                        font-size: 30px;
                        font-weight: bold;
                    `;
            default:
                return
        }
    }}
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 10px auto;
`


export { BlockTitle, BlockContainer, NotFound, NoRecord, StyledForm, StyledLabel, StyledInput, ButtonWrapper, StyledCard, ItemRow, Item, Wrapper } 