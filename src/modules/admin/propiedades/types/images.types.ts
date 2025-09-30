export type SaveImage = {
	id_propiedad: number;
	url: string;
	principal: boolean;
};

export interface ImageFile {
	id: string;
	file: File;
	url: string;
	principal: boolean;
}
