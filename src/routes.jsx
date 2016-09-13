import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostIndex from './components/postIndex';
import PostNew from './components/postNew';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={PostIndex} />
    <Route path="posts/new" component={PostNew} />
  </Route>
);

export default routes;
