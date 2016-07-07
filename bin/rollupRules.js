'use strict';

/*
 * A suite will pass if all its tests pass
 * A suite will fail if at least one of its tests fails
 * A suite will be cancelled if no tests fail and at least one test is cancelled
 */
exports.mustPassAll = function(suite)
{
	var childStatus = 'passed';
	for(var i=0; i<suite.tests.length; i++){
		if(suite.tests[i].status === 'failed'){
			childStatus = 'failed';
			break;
		}
		else if(suite.tests[i].status === 'cancelled'){
			childStatus = 'cancelled';
		}
	}

	return suite.status || childStatus;
};
