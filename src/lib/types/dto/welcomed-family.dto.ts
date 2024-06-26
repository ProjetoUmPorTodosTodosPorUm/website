import type { FieldDto } from './field.dto'

export type WelcomedFamilyDto = {
	id: string
	familyName: string
	representative: string
	observation: string

	createdAt: Date
	updatedAt: Date
	deleted?: Date

	fieldId?: string
	field?: FieldDto
}
