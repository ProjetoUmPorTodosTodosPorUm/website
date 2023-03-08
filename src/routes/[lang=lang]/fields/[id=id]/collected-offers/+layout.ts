import type { Load } from "@sveltejs/kit"
import { error } from '@sveltejs/kit'
import axios from '$lib/axios';
import Axios from 'axios';
import { fromPaginationToQuery } from "$lib/utils/functions";

export const load: Load = async ({ params }) => {
    let period: { [key: string]: string[] };
    let query = {
        field: params?.id,
    }

    try {
        period = (await axios.get(`/monthly-offer/period?${fromPaginationToQuery(query)}`)).data.data;
    } catch (err) {
        if (err instanceof Axios.AxiosError) {
            throw error(err.status || 500, {
                message: err.message,
            });
        }
        throw error(500, {
            message: err as string,
        });
    }

    return {
        period,
    }
}
