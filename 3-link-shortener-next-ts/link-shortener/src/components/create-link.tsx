import type { NextPage } from 'next';
import { useState } from 'react';
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import debounce from 'lodash/debounce';
import { trpc } from '../common/client/trpc';
import copy from 'copy-to-clipboard';

type Form = {
	slug: string;
	url: string;
};

const CreateLinkForm: NextPage = () => {
	console.log('Hitted CreateLinkForm create-link.tsx');
	// const [copied, setCopied] = useState(false);
	const [form, setForm] = useState<Form>({ slug: '', url: '' });
	const url = window.location.origin.split('//').slice(1) + '/';

	const slugCheck = trpc.useQuery(['slugCheck', { slug: form.slug }], {
		refetchOnReconnect: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
	const createSlug = trpc.useMutation(['createSlug']);

	const input =
		'text-black my-1 p-2 bg-white border shadow-sm placeholder-slate-400 focus:outline-none focus:border-blue-920 focus:ring-blue-950 block w-full rounded-md sm:text-sm focus:ring-1';

	const slugInput = classNames(input, {
		'focus:border-red-500': slugCheck.isFetched && slugCheck.data!.used,
		'focus:ring-red-500': slugCheck.isFetched && slugCheck.data!.used,
		'border-blue-920': slugCheck.isFetched,
		'border-red-500': slugCheck.isFetched && slugCheck.data!.used,
		'text-red-500': slugCheck.isFetched && slugCheck.data!.used,
	});

	const disabledButton = 'bg-gray-500 cursor-not-allowed opacity-50';

	if (createSlug.status === 'success') {
		return (
			<>
				<h2 className='mb-4 text-xl'>copied to clipboard</h2>
				<div className='flex justify-center items-center'>
					<h1>{`https://${url}${form.slug}`}</h1>
					<button
						type='button'
						className='rounded bg-blue-920 hover:bg-blue-950 py-1.5 px-1 font-semibold cursor-pointer ml-2 transition-colors duration-200'
						onClick={() => {
							// setCopied(true);
							copy(`https://${url}${form.slug}`);
						}}>
						copy again
					</button>
				</div>
				<button
					type='button'
					value='Reset'
					className='rounded bg-blue-920 hover:bg-blue-950 py-1.5 px-5 font-semibold cursor-pointer m-5 transition-colors duration-200'
					onClick={() => {
						createSlug.reset();
						setForm({ slug: '', url: '' });
					}}>
					create another
				</button>
			</>
		);
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				copy(`https://${url}${form.slug}`);
				createSlug.mutate({ ...form });
			}}
			className='flex flex-col justify-center h-[75vh] sm:w-2/3 md:w-1/2 lg:w-1/3'>
			<div className='flex items-center justify-center'>
				<input
					type='url'
					onChange={(e) => setForm({ ...form, url: e.target.value })}
					placeholder='your url'
					className={input + ' w-3/4 border-blue-920'}
					required></input>
			</div>
			<div className='flex items-center'>
				<span>{url}</span>
				<input
					type='text'
					onChange={(e) => {
						setForm({ ...form, slug: e.target.value });
						debounce(slugCheck.refetch, 100);
					}}
					minLength={1}
					placeholder='jawa!'
					className={slugInput}
					value={form.slug}
					pattern={'^[-a-zA-Z0-9]+$'}
					title='Only alphanumeric character and hypens are allowed. No spaces.'
					required></input>
				<button
					type='button'
					className='rounded bg-blue-920 py-1.5 px-1 font-semibold cursor-pointer ml-2 hover:bg-blue-950 transition-colors duration-200'
					onClick={() => {
						const slug = nanoid(10);
						setForm({
							...form,
							slug,
						});
						slugCheck.refetch();
					}}>
					random
				</button>
			</div>
			{slugCheck.data?.used && (
				<span className='font-normal mt-2 text-center text-red-500'>
					Slug already in use.
				</span>
			)}
			<button
				type='submit'
				className={
					'w-1/4 self-center mt-4 rounded bg-blue-920 p-2 font-semibold cursor-pointer  hover:bg-blue-950 transition-colors duration-200 disabled:bg-blue-980 disabled:cursor-not-allowed disabled:opacity-50'
				}
				disabled={slugCheck.isFetched && slugCheck.data!.used}>
				create
			</button>
		</form>
		// TODO: add rules and show save links if login
	);
};

export default CreateLinkForm;
