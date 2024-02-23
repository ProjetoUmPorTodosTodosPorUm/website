import type { FieldDto } from './field.dto'

export type CollaboratorDto = {
    id: string;
    title: string;
    description: string;
    image?: string;

    createdAt: Date;
    updatedAt: Date;
    deleted?: Date;

    fieldId?: string;
    field?: FieldDto;
}