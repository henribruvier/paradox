import type {inferProcedureOutput} from '@trpc/server';
import type {AppRouter} from '@paradox/api';

type ScenarioCardProps = {
	scenario: inferProcedureOutput<AppRouter['scenario']['all']>[number];
};

export const ScenarioCard = ({scenario}: ScenarioCardProps) => {
	return (
		<div className='p-4 border-2 border-gray-500 rounded-lg max-w-2xl'>
			<h2 className='text-2xl font-bold text-gray-800'>{scenario.title}</h2>
			<p className='text-gray-600'>{scenario.description}</p>
		</div>
	);
};
