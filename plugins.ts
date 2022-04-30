import BlueBasePluginConfigPersist from '@bluebase/plugin-config-persist';
import BlueBasePluginJsonSchemaComponents from '@bluebase/plugin-json-schema-components';
import BlueBasePluginLauncher from '@bluebase/plugin-launcher';
import BlueBasePluginMaterialUI from '@bluebase/plugin-material-ui';
import BlueBasePluginResponsiveGrid from '@bluebase/plugin-responsive-grid';
import BlueBasePluginSettingsApp from '@bluebase/plugin-settings-app';
import { MaterialCommunityIcons } from '@bluebase/plugin-vector-icons';

import App1 from './demo/app1';
import App2 from './demo/app2';
import App3 from './demo/app3';
import App4 from './demo/app4';
import App5 from './demo/app5';
import DemoApp from './demo/plugin-settings-app';
import Plugin from './src';

export const plugins = [
	BlueBasePluginConfigPersist,
	BlueBasePluginJsonSchemaComponents,
	BlueBasePluginLauncher,
	BlueBasePluginMaterialUI,
	BlueBasePluginResponsiveGrid,
	MaterialCommunityIcons,
	Plugin,
	BlueBasePluginSettingsApp,

	DemoApp,
	App1,
	App2,
	App3,
	App4,
	App5,
];
