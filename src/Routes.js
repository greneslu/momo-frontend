import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signin from './component/Signin';
import Signup from './component/Signup';
import Home from './component/Home';
import Product from './component/Product';
import ExternalTable from './component/ExternalTable';
import Products from './component/Products';
import Checkout from './component/Checkout';
import MemberCenter from './component/MemberCenter';
import CommentDialog from './component/CommentDialog';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                {/* <Route path="/shop" exact component={Shop} /> */}
                <Route path="/checkout" exact component={Checkout} />
                <Route path="/products/:categoryId" exact component={Products} />
                {/* <Route path="/products/:keyword" exact component={Products} /> */}
                <Route path="/products" exact component={Products} />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/memberCenter" exact component={MemberCenter} />
                {/* <Route path="/products" exact component={Products} /> */}
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                {/* <Route path="/user/dashboard" exact component={Dashboard} />
                <Route path="/profile/:userId" exact component={Profile} /> */}
                <Route path="/comment/:productId" exact component={CommentDialog}></Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;

