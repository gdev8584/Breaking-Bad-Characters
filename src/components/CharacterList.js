import React from 'react'
import CharacterItem from './characterlist_asserts/CharacterItem'
import Spinner from './characterlist_asserts/Spinner'

const CharacterList = ({ items, isLoading }) => {
  return isLoading ? (
    <Spinner />
  ) : (
    <section className='cards'>
      {items.map((item) => (
        <CharacterItem key={item.char_id} item={item}></CharacterItem>
      ))}
    </section>
  )
}

export default CharacterList