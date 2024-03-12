import {
    PaginationData,
    PaginationResponse
} from '../../interfaces/pagination';
import { User } from '../../interfaces/user';
import { client } from '../api';

const path = 'users';

export async function list(pagination?: PaginationData) {
    await new Promise((res) => setTimeout(res, 1000));

    let requestPath = path;

    if (pagination) {
        const { page, perPage } = pagination;
        requestPath = `${requestPath}?_page=${page}&_per_page=${perPage}`;
    }

    const { data } = await client.get<PaginationResponse<User>>(requestPath);
    return data;
}
