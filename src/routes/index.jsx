import { Routes as Switch, Route } from 'react-router-dom';

import InitiativeList from '../pages/InitiativeList';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact element={<InitiativeList />} />
    </Switch>
  );
}
