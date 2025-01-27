import { Student } from "api/students/types";

export interface PostOrgRequest {
  name: string;
  type: string;
  isActive: boolean;
  image?: File | string;
  deleteImage: boolean;
}

export type UpdateOrgRequest = PostOrgRequest & {
  organizationId: string;
};

export interface Org {
  _id: string;
  name: string;
  type: OrgsType;
  isActive: boolean;
  students: Student[];
  image?: string;
  groupCount: number;
  organizationAdmins: {
    _id: string;
    name: string;
    email: string;
  }[];
}

export type OrgsType = {
  _id: string;
  name: string;
};
