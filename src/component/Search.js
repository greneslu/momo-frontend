// import React from 'react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

const Element = ({ className }) => {
    return (
        <div className={className}>
            <form className="d-flex mt-3 search">
                <input className="form-control me-2" type="search" placeholder="請輸入關鍵字" aria-label="Search" />
                <button className="btn pinkBtn" type="submit">搜尋</button>
            </form>
        </div >

    )
}

const Search = styled(Element)`
.search{
    margin:20px auto;
    width:30%;
}
.pinkBtn{
    border:solid 2px pink;
    color:pink;
    white-space: nowrap;
}
`

export default Search;