import { Org } from 'api/orgs/types';

export interface PostGroupRequest {
  name: string;
  type: string;
  isActive: boolean;
  organizationId: string;
  image?: File | string;
  deleteImage: boolean;
}

export type UpdateGroupRequest = PostGroupRequest & {
  groupId: string;
};

export interface Group {
  _id: string;
  type: string;
  name: string;
  isActive: boolean;
  organization: Org;
  studentCount: number;
  image?: string;
}

export interface GroupsResponse {
  result: Group[];
  total: number;
}
