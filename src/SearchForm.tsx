import { useState, useEffect } from 'react'
import { StyledInput, StyledLabel, StyledForm, ButtonWrapper } from './CommonStyle'
import { IDefaultSearch } from './App'

interface ISearchForm {
    defaultSearch: IDefaultSearch | undefined;
    handleSubmit: (v: IDefaultSearch) => void;
    onClear: () => void;
}

const SearchForm: React.FC<ISearchForm> = ({
    defaultSearch,
    handleSubmit,
    onClear
}) => {

    const [formState, setFormState] = useState<IDefaultSearch>({
        city: "",
        country: ""
    });

    useEffect(() => {
        if (defaultSearch) {
            setFormState(defaultSearch)
        }
    }, [defaultSearch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formState);
        handleSubmit(formState)
    }
    const onClearHandler = () => {
        setFormState({
            city: "",
            country: ""
        })
        onClear()
    }

    return (
        <StyledForm onSubmit={onSubmit}>
            <StyledLabel>
                City:
                <StyledInput type="text" name="city" value={formState.city} onChange={handleChange} />
            </StyledLabel>
            <StyledLabel htmlFor="country">
                Country:
                <StyledInput type="text" name="country" value={formState.country} onChange={handleChange} />
            </StyledLabel>
            <ButtonWrapper>
                <button onClick={() => onSubmit}>Serach</button>
                <button onClick={onClearHandler} >Clear</button>
            </ButtonWrapper>
        </StyledForm>
    )
}

export default SearchForm