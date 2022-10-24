import type {inferProcedureOutput} from '@trpc/server';
import type {AppRouter} from '@paradox/api';
import {ScenarioCard} from './scenario-card';

type BookScenarioProps = {
	scenario: inferProcedureOutput<AppRouter['scenario']['all']>[number];
};

export const BookScenario = ({scenario}: BookScenarioProps) => {
	return (
		<div>
			<ScenarioCard scenario={scenario} />
		</div>
	);
};
