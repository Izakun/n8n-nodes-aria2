import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
	NodeApiError,
	NodeConnectionTypes,
	NodeOperationError,
} from 'n8n-workflow';

export class Aria2 implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Aria2',
		name: 'aria2',
		icon: { light: 'file:aria2.svg', dark: 'file:aria2.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Control your aria2 download utility through its JSON-RPC API',
		defaults: { name: 'aria2' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'aria2Api', required: true }],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Get Active Downloads', value: 'tellActive', action: 'Get active downloads' },
					{ name: 'Get Global Stats', value: 'getGlobalStat', action: 'Get global statistics' },
					{ name: 'Get Version', value: 'getVersion', action: 'Get the server version' },
					{ name: 'Get Waiting Downloads', value: 'tellWaiting', action: 'Get waiting downloads' },
				],
				default: 'getGlobalStat',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: { minValue: 1 },
				default: 50,
				description: 'Max number of results to return',
				displayOptions: { show: { operation: ['tellWaiting'] } },
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const credentials = await this.getCredentials('aria2Api', i);
				const baseURL = (credentials.baseUrl as string).replace(/\/+$/, '');
				const operation = this.getNodeParameter('operation', i) as string;
				const param = <T>(name: string, fallback?: T) =>
					this.getNodeParameter(name, i, fallback as T) as T;

				const token = credentials.secret ? [`token:${credentials.secret as string}`] : [];
				const EXTRA_BY_OP: Record<string, unknown[]> = {
					getGlobalStat: [],
					getVersion: [],
					tellActive: [],
					tellWaiting: [0, param<number>('limit', 50)],
				};
				const extra = EXTRA_BY_OP[operation];
				if (extra === undefined) {
					throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`, {
						itemIndex: i,
					});
				}

				const response = (await this.helpers.httpRequestWithAuthentication.call(this, 'aria2Api', {
					method: 'POST' as IHttpRequestMethods,
					baseURL,
					url: '/jsonrpc',
					body: {
						jsonrpc: '2.0',
						id: 'n8n',
						method: `aria2.${operation}`,
						params: [...token, ...extra],
					},
					json: true,
				} as IHttpRequestOptions)) as IDataObject;

				const result = response?.result;
				if (Array.isArray(result)) {
					for (const element of result) {
						returnData.push({ json: element as IDataObject, pairedItem: { item: i } });
					}
				} else {
					returnData.push({
						json: (typeof result === 'object' && result !== null
							? result
							: { result }) as IDataObject,
						pairedItem: { item: i },
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
					continue;
				}
				throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
