import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';

const Unauthorized : NextPage = () => {
  const router = useRouter();
  const { message } = router.query;
  return (
    <Layout title="Unauthorized Page">
      <h1 className="text-xl">Access Denied</h1>
      {message && <div className="mb-4 text-red-500">{message}</div>}
    </Layout>
  );
};

export default Unauthorized;
