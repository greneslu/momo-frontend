// import React from 'react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

const Element = ({ className, categoryId, setFilterArr }) => {
    const [checkArr, setCheckArr] = useState([
        { id: "0", checked: false },
        { id: "1", checked: false },
        { id: "2", checked: false },
        { id: "3", checked: false },
        { id: "4", checked: false },
        { id: "5", checked: false },
        { id: "6", checked: false },
        { id: "7", checked: false },
        { id: "8", checked: false },
        { id: "9", checked: false },
        { id: "10", checked: false },
        { id: "11", checked: false },
        { id: "12", checked: false },
    ])

    const handleChange = (e) => {
        const arr = [
            { id: "0", checked: false },
            { id: "1", checked: false },
            { id: "2", checked: false },
            { id: "3", checked: false },
            { id: "4", checked: false },
            { id: "5", checked: false },
            { id: "6", checked: false },
            { id: "7", checked: false },
            { id: "8", checked: false },
            { id: "9", checked: false },
            { id: "10", checked: false },
            { id: "11", checked: false },
            { id: "12", checked: false },
        ]
        if (arr.find(apple => apple.id === e.target.id)) {

            const index = arr.indexOf(arr.find(item => item.id === e.target.id))
            arr[index] = { ["id"]: e.target.id, ["checked"]: e.target.checked }
        }
        setCheckArr(arr)
        setFilterArr(arr)
    }

    useEffect(() => {
        const arr = [...checkArr]

        const obj = arr.find(item => item.id === categoryId)
        const index = arr.indexOf(obj)
        arr[index] = {
            ...obj,
            checked: true
        }
        setCheckArr(arr)
        setFilterArr(arr)
    }, [])
    return (
        <div className={className}>
            <section id="sidebar">
                <div class="pb-2 ml-2">
                    <h4 id="burgundy">Filters</h4>
                </div>
                <div class="py-2 ml-3">
                    <h6 class="font-weight-bold">分類</h6>
                    <div id="orange"><span class="fa fa-minus"></span></div>
                    <form>
                        <div class="form-group"> <input type="checkbox" id="0" onChange={handleChange} checked={checkArr[0].checked} /> <label for="0">女生衣著</label> </div>
                        <div class="form-group"> <input type="checkbox" id="1" onChange={handleChange} checked={checkArr[1].checked} /> <label for="1">男生衣著</label> </div>
                        <div class="form-group"> <input type="checkbox" id="2" onChange={handleChange} checked={checkArr[2].checked} /> <label for="2">運動/健身</label> </div>
                        <div class="form-group"> <input type="checkbox" id="3" onChange={handleChange} checked={checkArr[3].checked} /> <label for="3">男女鞋</label> </div>
                        <div class="form-group"> <input type="checkbox" id="4" onChange={handleChange} checked={checkArr[4].checked} /> <label for="4">電腦週邊</label> </div>
                        <div class="form-group"> <input type="checkbox" id="5" onChange={handleChange} checked={checkArr[5].checked} /> <label for="5">美妝保養</label> </div>
                        <div class="form-group"> <input type="checkbox" id="6" onChange={handleChange} checked={checkArr[6].checked} /> <label for="6">服飾飾品</label> </div>
                        <div class="form-group"> <input type="checkbox" id="7" onChange={handleChange} checked={checkArr[7].checked} /> <label for="7">手機相機</label> </div>
                        <div class="form-group"> <input type="checkbox" id="8" onChange={handleChange} checked={checkArr[8].checked} /> <label for="8">家電影音</label> </div>
                        <div class="form-group"> <input type="checkbox" id="9" onChange={handleChange} checked={checkArr[9].checked} /> <label for="9">居家生活</label> </div>
                        <div class="form-group"> <input type="checkbox" id="10" onChange={handleChange} checked={checkArr[10].checked} /> <label for="10">寵物</label> </div>
                        <div class="form-group"> <input type="checkbox" id="11" onChange={handleChange} checked={checkArr[11].checked} /> <label for="11">戶外/旅行</label> </div>
                        <div class="form-group"> <input type="checkbox" id="12" onChange={handleChange} checked={checkArr[12].checked} /> <label for="12">書籍</label> </div>
                    </form>
                </div>
                {/* <div class="py-2 border-bottom ml-3">
                    <h6 class="font-weight-bold">Accompainments</h6>
                    <div id="orange"><span class="fa fa-minus"></span></div>
                    <form>
                        <div class="form-group"> <input type="checkbox" id="tea" /> <label for="tea">Tea Cakes</label> </div>
                        <div class="form-group"> <input type="checkbox" id="cookies" /> <label for="cookies">Cookies</label> </div>
                        <div class="form-group"> <input type="checkbox" id="pastries" /> <label for="pastries">Pastries</label> </div>
                        <div class="form-group"> <input type="checkbox" id="dough" /> <label for="dough">Cookie Dough</label> </div>
                        <div class="form-group"> <input type="checkbox" id="choco" /> <label for="choco">Chocolates</label> </div>
                    </form>
                </div> */}
                <div class="py-2 ml-3">
                    <h6 class="font-weight-bold">Top Offers</h6>
                    <div id="orange"><span class="fa fa-minus"></span></div>
                    <form>
                        <div class="form-group"> <input type="checkbox" id="25off" /> <label for="25">25% off</label> </div>
                        <div class="form-group"> <input type="checkbox" id="5off" /> <label for="5off" id="off">5% off</label> </div>
                    </form>
                </div>
            </section>
        </div >

    )
}

const Filter = styled(Element)`
* {
    box-sizing: border-box
}

#burgundy {
    color: rgb(153, 40, 59)
}

#orange,
select,
.btn {
    color: orange
}

.form-group {
    margin-bottom: 5px
}

label {
    padding-left: 10px
}

.form-group:last-child {
    margin-bottom: 0
}

h6 {
    margin-bottom: 0px
}

@media(min-width:1200px) {
    
    .text {
        display: none
    }

    #sidebar {
        padding: 20px;
        float: left;
        position: absolute;
        top: 20%;
    }
}

@media(min-width:992px) and (max-width:1199px) {
    .text {
        display: none
    }

    #sidebar {
        padding: 20px;
        float: left;
        position: absolute;
        top: 20%;
    }
}

@media(min-width:768px) and (max-width:991px) {
    .text {
        display: none
    }

    #sidebar {
        padding: 20px;
        float: left;
        position: absolute;
        top: 20%;
    }
}

@media(min-width:576px) and (max-width:767px) {
    .text {
        display: none
    }
    #sidebar {
        padding: 20px;
        float: left;
        position: absolute;
        top: 20%;
    }
    #off {
        padding-left: 2px
    }
    
}

@media(max-width:575px) {
    #sidebar {
        display: none
    }
}
`

export default Filter;