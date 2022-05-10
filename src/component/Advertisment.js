import styled from 'styled-components'

const Element = ({ className }) => (
    <div className={className}>
        <div className="ad1">
            <img className="adImg"
                src="https://picsum.photos/250/250"
                alt="" />
            <button type="button" className="btn-close adBtn" aria-label="Close"></button>
        </div>
        <div className="ad2">
            <img src="https://picsum.photos/250/250"
                alt="" className="adImg" />
            <button type="button" className="btn-close adBtn" aria-label="Close"></button>
        </div>
    </div>
)

const Advertisment = styled(Element)`
.ad1{
    position: fixed;right:80px;top:150px;
}
.ad2{
    position: fixed;right:80px;top:400px;
}
.adImg{
    width:200px;height:200px;
}
.adBtn{
    position: absolute;right:15px;top:7px;
}
`

export default Advertisment;