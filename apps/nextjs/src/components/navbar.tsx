import Link from 'next/link';
import {Button} from './button';

type NavbarProps = {};

export const Navbar = ({}: NavbarProps) => {
	return (
		<div className='w-full h-24 flex flex-row bg-slate-500 items-center text-lg px-4 justify-end'>
			<Link href='/book'>
				<a>
					<Button>Réserver</Button>
				</a>
			</Link>
		</div>
	);
};
