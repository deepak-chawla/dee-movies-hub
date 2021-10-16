import { Button, createMuiTheme, ThemeProvider, TextField, Tabs, Tab } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import Card from '../../components/Card/Card';
import Paginat from '../../components/Pagination/Pagination';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark'
    },
    primary: {
        main: "#fff"
    }
});

export default function Search() {

    const [searchText, setSearchText] = useState("");
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();

    const fetchSearch = async () => {
        try {
            const { data } = await axios.get(`
        https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&query=${searchText}&include_adult=false`);
            setContent(data.results);
            setNumOfPages(data.total_pages)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
    }, [type, page]);

    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{ display: 'flex', margin: '15px 0' }}>
                    <TextField
                        variant='filled'
                        className="searchBox"
                        style={{ flex: 1 }}
                        label='Search'
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button variant='contained' onClick={fetchSearch}
                        style={{ marginLeft: 10 }}><SearchIcon /></Button>
                </div>
                <Tabs
                    value={type}
                    indicatorColor="primary"
                    style={{ paddingBottom: 5 }}
                    aria-label="disabled tabs example"
                    onChange={((event, newValue) => {
                        setType(newValue);
                        setPage(1);
                    })}
                >
                    <Tab style={{ width: "50%" }} label="Search Movies" />
                    <Tab style={{ width: "50%" }} label="Search TV Series" />
                </Tabs>
                <div className='container'>
                    {
                        content && content.map((c) =>
                            <Card key={c.id}
                                id={c.id}
                                name={c.name || c.title}
                                poster={c.poster_path}
                                vote={c.vote_average}
                                release={c.first_air_date || c.release_date}
                                media={type ? "tv" : "movie"}
                            />
                        )
                    }
                    {searchText &&
                        !content &&
                        (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
                </div>
                {numOfPages > 1 && (
                    <Paginat setPage={setPage} numOfPages={numOfPages} />
                )}
            </ThemeProvider>
        </div>
    )
}
