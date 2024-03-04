export type FieldDto = {
	id: string
	continent: string
	country: string
	state: string
	abbreviation: string
	designation: string
	mapLocation?: any
	mapArea?: any[]
	collectionPoints?: any[]
	streetRelation?: string[]

	createdAt: Date
	updatedAt: Date
	deleted?: Date
}
