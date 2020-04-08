import React from 'react'
import { BrowserRouter, Switch, Route, Link, useRouteMatch } from 'react-router-dom'
// import Button from "antd/es/button";
import { Button } from 'antd'
import useCounterModel from './models/counter'
import Account from './pages/account'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Button type="primary">这是个AntD的测试Button</Button>
          <Link to='/account'>My Profile</Link>
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/account">
          <Account />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

function Users() {
  // In v5, nested routes are rendered by the child component, so
  // you have <Switch> elements all over your app for nested UI.
  // You build nested routes and links using match.url and match.path.
  let match = useRouteMatch()
  const counter = useCounterModel()
  return (
    <div>
      <nav>
        <Link to={`${match.url}/me`}>My Profile</Link>
      </nav>

      <Switch>
        <Route path={`${match.path}/me`}>
          <p>{counter.count}</p>
          <Button onClick={counter.increment}>Increment</Button>
        </Route>
        <Route path={`${match.path}/:id`}>2234</Route>
      </Switch>
    </div>
  )
}

export default App
