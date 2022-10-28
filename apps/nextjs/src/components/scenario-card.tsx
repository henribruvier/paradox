import type {inferProcedureOutput} from '@trpc/server';
import type {AppRouter} from '@paradox/api';

type ScenarioCardProps = {
	scenario: inferProcedureOutput<AppRouter['scenario']['all']>[number];
};

export const ScenarioCard = ({scenario}: ScenarioCardProps) => {
	return (
		<div className='h-full  px-8 pt-16 pb-16 rounded-lg border-indigo-300 border overflow-hidden text-center relative'>
			<h2 className='tracking-widest text-xs title-font font-medium text-indigo-600 mb-1'>
				Scenario
			</h2>
			<h1 className='title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3'>
				{scenario.title}
			</h1>
			<p className='leading-relaxed mb-3'>{scenario.description}</p>
			{scenario.bestTime && (
				<p className='leading-relaxed mb-3'>
					Meilleur temps {scenario.bestTime / 60} mn
				</p>
			)}
			<a
				href={`/scenario/${scenario.id}`}
				className='flex items-center justify-center bg-indigo-500 text-white rounded-full py-2 px-4'
			>
				Learn More
				<svg
					className='w-4 h-4 ml-2'
					viewBox='0 0 24 24'
					stroke='currentColor'
					stroke-width='2'
					fill='none'
					stroke-linecap='round'
					stroke-linejoin='round'
				>
					<path d='M5 12h14'></path>
					<path d='M12 5l7 7-7 7'></path>
				</svg>
			</a>
		</div>
	);
};
