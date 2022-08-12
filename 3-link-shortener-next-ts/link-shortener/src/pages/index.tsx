import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Layout from '../components/layout';

const CreateLinkForm = dynamic(() => import('../components/create-link'), {
	ssr: false,
});

const Home: NextPage = () => {
	return (
		<Suspense>
			<Layout>
				<div className='flex flex-col justify-center items-center'>
					<CreateLinkForm />
				</div>
			</Layout>
		</Suspense>
	);
};

export default Home;
