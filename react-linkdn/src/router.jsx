
import { createBrowserRouter, Link, useRouteError } from 'react-router-dom';
import Layout from './theme/layout';
import Home from './theme/home';
import TaskPage from './theme/task_page';
import NotFound from './theme/not_found';

function RouteError() {
  const error = useRouteError();
  return (
    <section className="not-found">
      <h1>Something went wrong</h1>
      <pre>{String(error?.message || error)}</pre>
      <Link to="/">Back to the dashboard</Link>
    </section>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,          
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Home /> },                 
      { path: 'tasks/:folder/*', element: <TaskPage /> }, 
      { path: '*', element: <NotFound /> },            
    ],
  },
]);