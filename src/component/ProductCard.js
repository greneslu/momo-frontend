import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grow from "@mui/material/Grow";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { updateProductState } from '../product';
import ProductUpdate from './ProductUpdate';
import { addFavor, getFavor } from '../favorite';

const ProductCard = ({ product, productsFetch, editable = false, link, favor = false }) => {
    const [color, setColor] = useState("")

    const handleFavor = () => {
        if (color === "") {
            setColor("error")
        } else {
            setColor("")
        }
        addFavor(product)
    }

    const handleState = (state) => {
        updateProductState(product)
            .then(data => {
                productsFetch()
            })
    }

    useEffect(() => {
        if (getFavor().find(item => item.id === product.id)) {
            setColor("error")
        }
    }, [])

    return (<>
        <Grow in={true}>
            <Card sx={{ maxWidth: 345, minHeight: 410 }}>
                {/* <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            /> */}
                <CardActionArea href={link ? `/product/${product.id}` : null}>
                    <CardMedia
                        component="img"
                        height="194"
                        image={product.cover}
                        src={product.cover}
                        // image="https://cf.shopee.tw/file/b5772fc8fe61728bd8afd0b135c54cf3_tn"
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {product && product.name.slice(0, 13)}
                        </Typography>
                        <br />
                        <Typography variant="body2" color="text.secondary">
                            {product && product.description.slice(0, 25)}
                        </Typography>
                        <br />
                        <Typography variant="h6" color="text.secondary">
                            ${product && product.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                {editable ?
                    <CardActions>
                        <Button disabled={product.state === 1 ? true : false} size="small" sx={{ color:"#f7bacf"}} onClick={() => handleState()}>上架</Button>
                        <Button disabled={product.state === 0 ? true : false} size="small" sx={{ color: "#f7bacf" }} onClick={() => handleState()}>下架</Button>
                        <ProductUpdate productsFetch={productsFetch} product={product}/>
                    </CardActions>
                    : null}
                {favor ? <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites ">
                        <FavoriteIcon color={color} onClick={handleFavor} />
                    </IconButton>
                </CardActions>
                    : null}
            </Card>
        </Grow>
    </>);
}

export default React.memo(ProductCard);