import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class Aria2Api implements ICredentialType {
	name = 'aria2Api';

	displayName = 'Aria2 API';

	icon = 'file:aria2Api.svg' as const;

	documentationUrl = 'https://aria2.github.io/manual/en/html/aria2c.html#rpc-interface';

	// aria2 JSON-RPC passes its secret as the first param ("token:<secret>"),
	// which the node prepends, so there is no generic authenticate block.
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'http://aria2:6800',
			required: true,
			description: 'Base URL of the aria2 RPC endpoint (e.g. http://aria2:6800). No trailing slash.',
		},
		{
			displayName: 'RPC Secret',
			name: 'secret',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'aria2 RPC secret token (--rpc-secret). Leave empty if none is set.',
		},
	];
}
