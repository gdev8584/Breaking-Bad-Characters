import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import Header from './components/Header'
import CharacterList from './components/CharacterList'
import Search from './components/Search'
import './App.css'

const App = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(()=>{
    const getComments = async () => {
      const res = await fetch(`https://breakingbadapi.com/api/characters?name=${query}&&page=1&limit=4&offset=0`)
      const data = await res.json();
      setItems(data)
      setIsLoading(false)
    }
    getComments();
  },[query])

  const queryFunction = (q) =>{
    setQuery(q.toLowerCase())
  }

  const fetchComment = async (currPage) => {
    const res = await fetch(`https://breakingbadapi.com/api/characters?&page=${currPage}&limit=4&offset=${((currPage-1)*4)}`)
    const data = await res.json();
    return data
  }

  const handlePageClick = async (data)=>{
    // console.log(data.selected)
    let currPage = data.selected + 1
    const commentsFromServ = await fetchComment(currPage);
    setItems(commentsFromServ)
    setIsLoading(false)
  }
  
  return (
    <div className='container'>
      <Header />
      <Search getQuery={queryFunction} />
      <CharacterList isLoading={isLoading} items={items} />

      <ReactPaginate 
        previousLabel={'Previous'}
        pageCount={15}
        nextLabel={'Next'}
        breakLabel={'...'}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center' } //containerclass is bootstrap unorder list class
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        //active class
        activeClassName={'active'}
      />

    <div class="card-footer text-muted text-center">
       @2022 Design and Developed by Devanand Giri
    </div>
    </div>
  )
}

export default App

