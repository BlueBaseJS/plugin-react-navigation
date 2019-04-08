import { BootOptions } from '@bluebase/core';
import DemoApp from './plugin-settings-app';
import commonBootOptions from '../common/bluebase';
import deepmerge from 'deepmerge';

/**
 * Add your platform specific configs here.
 * We keep all the universal (cross platform) configs in
 * the common folder, and extend them here.
 */
const bootOptions: Partial<BootOptions> = {

	plugins: [DemoApp],

};

export default deepmerge(commonBootOptions, bootOptions);
