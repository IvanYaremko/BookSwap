import { observer } from "mobx-react-lite";
import React from "react";
import { useState } from 'react';
import { Item, Search } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useStore } from "../../app/stores/Store";
import { Book } from "../../app/models/Book";


export default observer(function CustomSearch() {
    const [results, setResults] = useState<Book[]>()
    const [value, setValue] = useState('');
    const { bookStore } = useStore()
    const { marketBooks } = bookStore

    const resultRenderer = () => (
        <>
            <Item.Group divided>
                <Item>
                    <Item.Image
                        size='tiny'
                        src={results![0].image}
                        as={Link} to={`/books/${results![0].id}`}
                    />
                     <Item.Content verticalAlign='middle'>
                                <Item.Header as={Link} to={`/books/${results![0].id}`} >{results![0].title}</Item.Header>
                                <Item.Content> {results![0].author} </Item.Content>
                            </Item.Content>
                </Item>
            </Item.Group>
        </>

    )

    const handleSearchChange = (e: any) => {
        let value = e.target.value;
        setValue(value);
        var match = Array.from(marketBooks.values()).filter(book => book.title === value)

        setResults(match);
    }

    return (
        <>
            <Search
                onSearchChange={handleSearchChange}
                noResultsMessage="No book found."
                resultRenderer={resultRenderer}
                results={results}
                value={value}
            />
        </>
    )
})


