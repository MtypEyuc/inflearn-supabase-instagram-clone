'use server'

import {createServerSupabaseClient} from "../utils/supabase/server";

function handleError(error) {
    if (error) {
        console.error(error);
        throw error;
    }

}
export async function searchMovies({search, page, pageSize}) {
    const supabase = await createServerSupabaseClient();

    const { data , error , count } = await supabase
        .from("movie")
        .select("*")
        .like("title", `%${search}%`)
        .range((page - 1) * pageSize, page * pageSize - 1);


    const hasNextPage = count > page * pageSize;

    if (error) {
        console.error(error);
        return {
            data: [],
            count: 0,
            page: null,
            pageSize: null,
            error,
        };
    }

    return {
        data,
        page,
        pageSize,
        hasNextPage,
    };
}

export async function getFavoriteMovie() {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
        .from("favorite_movie")
        .select("*")
        .eq("favorite", true)

    handleError(error);

    return data;
}

export async function getMovie(id) {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
        .from("movie")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    handleError(error);

    return data;
}