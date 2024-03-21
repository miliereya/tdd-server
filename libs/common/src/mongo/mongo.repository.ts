import { BadRequestException, NotFoundException } from '@nestjs/common'
import { MongoClient, Db, Filter } from 'mongodb'

export class MongoRepository {
	client: MongoClient
	db: Db

	constructor(defaultDb: string = 'test') {
		this.connect(defaultDb)
	}

	private async connect(defaultDb: string) {
		try {
			this.client = await MongoClient.connect(
				process.env.MONGO_TDD_DATA_URI
			)
			this.setDb(defaultDb)
		} catch (e) {
			console.log(e)
		}
	}

	setDb(db: string) {
		this.db = this.client.db(db)
	}

	// CRUD

	async create(data: any, collection: string, db?: string) {
		try {
			if (db) this.setDb(db)
			await this.db.collection(collection).insertOne(data)
		} catch (e) {
			console.log(e)
		}
	}

	async find<T>(filter: Filter<T>, collection: string, db?: string) {
		if (db) this.setDb(db)
		const data = await this.db.collection(collection).findOne<T>(filter)

		if (!data) throw new NotFoundException()
		return data
	}

	async findMany<T>(filter: Filter<T>, collection: string, db?: string) {
		if (db) this.setDb(db)
		return await this.db.collection(collection).find<T[]>(filter).toArray()
	}

	async replace<T>(
		filter: Filter<T>,
		data: any,
		collection: string,
		db?: string
	) {
		if (db) this.setDb(db)

		try {
			await this.db.collection(collection).replaceOne(filter, data)
		} catch (e) {
			throw new BadRequestException()
		}
	}

	async delete<T>(filter: Filter<T>, collection: string, db?: string) {
		if (db) this.setDb(db)

		await this.db.collection(collection).deleteOne(filter)
	}
}
