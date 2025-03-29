"use client";

import MovieCard from "./movie-card";
import {getFavoriteMovie} from "../actions/movieActions";
import { Spinner } from "@material-tailwind/react";
import { useState, useEffect } from "react";

export default function FavoriteMovieCardList() {
    const [movies, setMovies] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchMovies = async () => {
            setIsFetching(true);
            setError(null);
            try {
                const data = await getFavoriteMovie(); // 페이지와 사이즈 설정
                setMovies(data);
            } catch (err) {
                setError("영화 데이터를 불러오는 데 실패했습니다.");
            } finally {
                setIsFetching(false);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="w-full h-full">

            {isFetching && <Spinner />}


            {error && <p className="text-red-500">{error}</p>}


            <div className="grid gap-4 md:grid-cols-4 grid-cols-3">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    !isFetching && <p>영화 목록이 없습니다.</p>
                )}
            </div>
        </div>
    );
}
