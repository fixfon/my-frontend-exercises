import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../server/db/client';

const getURL = async (req: NextApiRequest, res: NextApiResponse) => {
	console.log('Hitted getURL [slug].ts');
	const slug = req.query['slug'];

	if (!slug || typeof slug !== 'string') {
		res.statusCode = 404;
		res.send(JSON.stringify({ message: 'use slug' }));

		return;
	}

	const data = await prisma.shortLink.findFirst({
		where: {
			slug: {
				equals: slug,
			},
		},
	});

	if (!data) {
		res.statusCode = 404;
		res.send(JSON.stringify({ message: 'slug not found' }));

		return;
	}

	// This is vercel caching. It is not browser caching.
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Cache-Control', 's-maxage=10000000, stale-while-revalidate');

	return res.json(data);
	// return res.redirect(data.url);
};

export default getURL;
