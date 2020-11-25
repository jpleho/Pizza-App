import './style/main.scss';
import { Menu } from './components/menu/menu'
import { List } from './components/restaurants/list'
import Cart from './components/cart/cart'
import Checkout from './components/checkout/checkout'
import Confirmation from './components/checkout/confirmation'
import Reorder from './components/checkout/reorder'
import { connect } from 'react-redux'
import { data } from './config'
import SpatialNavigation from 'react-js-spatial-navigation'
import {
  Switch,
  Route,
  useRouteMatch,
  withRouter
} from "react-router-dom";

function App(props) {
  let match = useRouteMatch();
  const { clearCache } = props

  return (
    <div className="App">
      <SpatialNavigation>
        <Menu />
        <Switch>
          <Route path={`${match.path}cart`}>
            <Cart />
          </Route>
          <Route path={`${match.path}checkout`}>
            <Checkout />
          </Route>
          <Route path={`${match.path}your-order`}>
            <Confirmation />
          </Route>
          <Route path={`${match.path}reorder`}>
            <Reorder />
          </Route>
          <Route path={`${match.path}`}>
            <List items={data.restaurants} />
          </Route>
        </Switch>
      </SpatialNavigation>
      <button className="clear-cache" onClick={clearCache}>clear cache</button>
    </div>
  );
}

const mapStateToProps = (state, props) => ({
  step: state.step
})

const mapDispatchToProps = dispatch => {
  return {
    setStep: () => dispatch({ type: 'SET_STEP', payload: { step: Math.random() } }),
    clearCache: () => dispatch({ type: 'CLEAR_CACHE' }),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))

