import React, { useState } from "react";
import { useMovies } from "../context/MovieContext.tsx";
import { postMovie } from "../lib/backendService.ts";
import { toast } from "react-toastify";
import { ChevronDown } from "lucide-react";
import { Movie } from "../lib/models/movie.ts";
import { useDropzone } from "react-dropzone";

export const MovieForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState<number|undefined>(undefined);
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState<number|undefined>(undefined);
    const [posterUrl, setPosterUrl] = useState('');

    const [folded, setFolded] = useState(true);
    const { movies, setMovies } = useMovies();

    const onDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setPosterUrl(data.url);
        } catch (error) {
            console.log(error)
        }
    };
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleAddMovie = (newMovie: Movie) => {
        try {
            validateMovie(newMovie)
            postMovie(newMovie)
                .then(res => setMovies([...movies, res]))
                .catch(err => console.log(err));
            toast.success('Movie added successfully');
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    return (
        <div className={'movie-form'}>
            <div
                className={`movie-form-heading ${folded ? 'py-2' : 'py-4'}`}
                onClick={() => setFolded(!folded)}
            >
                <h2 className={`text-xl font-semibold text-white`}>Add a New Movie</h2>
                <ChevronDown
                    className={`w-10 transition-transform duration-300 ${folded ? '' : 'rotate-180'}`}
                />
            </div>
            <div className={`transition-height duration-300 ${folded ? 'max-h-0 overflow-hidden' : 'max-h-screen'}`}>
                <div className="p-4 pt-0 flex flex-col space-y-4">
                    <div className="flex flex-row items-stretch space-x-3">
                        <div className="flex-grow">
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="movie-form-input w-full mt-2"
                            />
                            <input
                                type="number"
                                placeholder="Year of production"
                                value={year}
                                inputMode={'numeric'}
                                onChange={e => {
                                    setYear(parseInt(e.target.value))
                                }}
                                className="movie-form-input w-full mt-2"
                            />
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="movie-form-input w-full mt-2"
                                rows={2}
                            />
                            <input
                                type="number"
                                placeholder="Duration (minutes)"
                                value={duration}
                                inputMode={'numeric'}
                                onChange={e => setDuration(parseInt(e.target.value))}
                                className="movie-form-input w-full mt-2"
                            />
                        </div>
                        <div
                            {...getRootProps()}
                            className="m-4 mt-2 p-2 dropzone cursor-pointer max-w-[20%] flex border-2 border-dashed rounded"
                        >
                            <input {...getInputProps()} />
                            {posterUrl ? (
                                <img
                                    src={posterUrl}
                                    alt="Poster Preview"
                                    className="movie-poster w-full h-full object-cover rounded"
                                />
                            ) : (
                                <p>Drag & drop an image, or click to select one</p>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            const newMovie = {
                                title,
                                year,
                                description,
                                duration,
                                posterUrl,
                            }
                            handleAddMovie(newMovie)
                        }}
                        className="movie-form-submit-button w-full"
                    >
                        Add Movie
                    </button>
                </div>
            </div>
        </div>
    );
};

function validateMovie(newMovie: Movie) {
    if (!newMovie.title) {
        throw ('Movie requires title')
    }
    else if (!newMovie.year) {
        throw ('Movie requires year of production')
    }
    if (!newMovie.duration) {
        throw ('Movie requires duration')
    }
    else if (!newMovie.posterUrl) {
        throw ('Movie requires a poster')
    }
}
