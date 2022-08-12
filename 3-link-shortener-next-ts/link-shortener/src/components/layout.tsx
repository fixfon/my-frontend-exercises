import Navbar from './navbar';
import Footer from './footer';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className='min-h-screen h-screen flex flex-col justify-between bg-gray-950 text-white'>
			<Navbar />
			{children}
			<Footer />
		</div>
	);
};

export default Layout