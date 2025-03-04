export interface IdOnly {
  id: string;
}

export interface SampleBody {
  id: number;
  page: number;
  additional: string;
}

export interface SampleDto {
  id: number;
  name: string;
}

export interface CreateSampleDto {
  name: string;
}