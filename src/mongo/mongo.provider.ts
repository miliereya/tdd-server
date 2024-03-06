import { MongoClient } from 'mongodb'
import { MONGODB_PROVIDER } from 'src/constants'

export const mongoDbProvider = {
	provide: MONGODB_PROVIDER,
	useFactory: async (): Promise<any> => {
		try {
			const client = await MongoClient.connect(process.env.MONGO_URI)
			return client.db('test')
		} catch (e) {
			throw e
		}
	},
}
