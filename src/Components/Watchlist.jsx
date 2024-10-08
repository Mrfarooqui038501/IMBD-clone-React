import React, { useEffect, useState } from 'react'
import genreids from '../Components/Constants';

const ALL_GENRES = 'All genres';

const getGenreName = genre_id => {
  console.log(genreids[genre_id] || 'NA')
  return genreids[genre_id] || 'NA';
}


function WatchList() {
  const [watchList, setWatchList] = useState([]);

  const [searchedStr, setSearch] = useState('');
  const [genreList, setGenreList] = useState([ALL_GENRES, 'Action', 'Animation', 'Horror'])
  const [currGenre, setCurrGenre] = useState(ALL_GENRES);

  useEffect(() => {
    let moviesFromLS = localStorage.getItem('movies');
    if (moviesFromLS) {
      setWatchList(JSON.parse(moviesFromLS));
    }
  }, [])

  // to set the genre filter options.
  useEffect(() => {
    let tempArr = watchList.map((movie) => {
      return getGenreName(movie.genre_ids[0])
    })

    // FIND UNIQUES OF AN ARRAY. 
    // REMOVE DUPLICATES IN ARRAY.
    let temp = new Set(tempArr);

    setGenreList([ALL_GENRES, ...temp])

    console.log('genres present:', tempArr)
  }, [watchList])

  const handleAscRatings = () => {
    console.log('Asc sort');
    let sortedOrder = watchList.sort((a, b) => a.vote_average - b.vote_average);

    setWatchList([...sortedOrder])

    // [{title, vote_average: 7}, {vote_average: 5}]
  }

  const handleDescRatings = () => {
    console.log('Desc sort');
    let sortedOrder = watchList.sort((a, b) => b.vote_average - a.vote_average);

    setWatchList([...sortedOrder])
  }

  const removeFromWatchList = movieObj => {
    const filteredMovies = watchList.filter((watchListMovie) => {
      return movieObj.id !== watchListMovie.id
    })
    setWatchList(filteredMovies);
    // localStorage.setItem('movies', JSON.stringify(filteredMovies))
  }


  return (
    <>
      {/* Genres */}
      <div className='flex justify-center m-4'>
        {
          genreList.map(genre => {
            return <div className={
              currGenre === genre
                ? 'flex justify-center items-center bg-blue-500 h-8 w-[300px] text-white font-bold rounded-xl mx-4 cursor-pointer'
                : 'flex justify-center items-center bg-gray-500 h-8 w-[300px] text-white font-bold rounded-xl mx-4 cursor-pointer'
            }
              onClick={() => setCurrGenre(genre)}>
              {genre}
            </div>
          })
        }
      </div>

      {/* Search field:: */}
      <div className='flex justify-center my-5'>
        <input
          placeholder='search movies'
          type='text'
          value={searchedStr}
          onChange={(e) => setSearch(e.target.value)}
          className='h-8 w-[300px] bg-gray-200 px-4 outline-none border border-slate-700'
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm
  text-gray-500">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-4 font-medium text-gray-900">Name</th>
              <th>
                <div className="flex">
                  <i className='fa-solid fa-arrow-up cursor-pointer pr-1' onClick={handleAscRatings}></i>
                  <div>Ratings</div>
                  <i className='fa-solid fa-arrow-down cursor-pointer pl-1' onClick={handleDescRatings}></i>
                </div>
              </th>
              <th>
                <div className="flex">
                  <div>Popularity</div>
                </div>
              </th>
              <th>
                <div className="flex">
                  <div>Genre</div>
                </div>
              </th>
              <th>
                <div className="flex">
                  <div>Delete</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {watchList
              .filter(movie => {
                if (currGenre === ALL_GENRES) {
                  return true
                } else {
                  return currGenre === getGenreName(movie.genre_ids[0])
                }
              })
              .filter((movie) => movie.title.toLowerCase().includes(searchedStr.toLowerCase()))
              .map((movie) => {
                return (<tr className="hover:bg-gray-50">
                  <td className="flex items-center px-6 py-4 font-normal text-gray-900">
                    <img className="h-[6rem] w-[10rem] object-fit" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                    <div className="font-medium text-gray-700 text-sm">{movie.title}</div>
                  </td>
                  <td className="pl-6 py-4">{movie.vote_average}</td>
                  <td className="pl-6 py-4">{movie.popularity}</td>
                  <td className="pl-2 py-4">{getGenreName(movie.genre_ids[0])}</td>
                  <td className="pl-2 py-4 text-red-500" onClick={() => removeFromWatchList(movie)}>Delete</td>
                </tr>)
              })}

          </tbody>
        </table>
      </div>
    </>
  );
}
export default WatchList;