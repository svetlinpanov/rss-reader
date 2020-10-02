/**
 *
 * Asynchronously loads the component for OverviewPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
