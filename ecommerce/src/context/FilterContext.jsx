import { createContext, useContext, useState } from "react"

const FilterContext = createContext()

export function FilterProvider({ children }) {

  const [selectedCategory, setSelectedCategory] =
    useState("")

  const [searchQuery, setSearchQuery] =
    useState("")

  return (

    <FilterContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery
      }}
    >

      {children}

    </FilterContext.Provider>
  )
}

export function useFilter() {
  return useContext(FilterContext)
}