import Main from '@/pages/main/Main.tsx';
import PageNotFound from '@/pages/pageNotFound/pageNotFound.tsx';
import Preview from '@/pages/preview/Preview.tsx';
import { Layout } from '@/widgets/layouts/Layout.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Preview />,
    children: [],
  },
  {
    path: '/main',
    element: <Layout />,
    children: [
      {
        path: '/main',
        element: <Main />,
      },
    ],
  },
  {
    path: '/*',
    element: <PageNotFound />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
