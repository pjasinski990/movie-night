import React, { useState } from "react";
import { useMovies } from "../context/MovieContext.tsx";
import { postMovie } from "../lib/backendService.ts";
import { toast } from "react-toastify";
import { ChevronDown } from "lucide-react";
import { Movie } from "../lib/models/movie.ts";
import { useDropzone } from "react-dropzone";

const dropzoneAcceptedFiles = {
    'image/png': ['.png'],
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/gif': ['.gif'],
    'image/webp': ['.webp'],
    'image/svg+xml': ['.svg'],
    'image/bmp': ['.bmp'],
    'image/tiff': ['.tif', '.tiff']
};

export const MovieForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState<number | undefined>(undefined);
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState<number | undefined>(undefined);
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
            console.log(error);
            toast.error('Failed to upload poster');
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: dropzoneAcceptedFiles, multiple: false });

    const clearForm = () => {
        setTitle('');
        setYear(undefined);
        setDescription('');
        setDuration(undefined);
        setPosterUrl('');
    };

    const handleAddMovie = async (newMovie: Movie) => {
        try {
            validateMovie(newMovie);
            const res = await postMovie(newMovie);
            setMovies([...movies, res]);
            toast.success('Movie added successfully');
            clearForm();
            setFolded(true);
        } catch (error: any) {
            console.error('Failed to add movie:', error);
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
                        <div className="flex-grow mt-2">
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
                                value={year ?? ''}
                                inputMode={'numeric'}
                                step="1"
                                min="1888"
                                onChange={e => {
                                    const value = e.target.value;
                                    if (value === '') {
                                        setYear(undefined);
                                    } else {
                                        const parsed = parseInt(value, 10);
                                        if (!isNaN(parsed)) {
                                            setYear(parsed);
                                        }
                                    }
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
                                value={duration ?? ''}
                                inputMode={'numeric'}
                                step="1"
                                min="1"
                                onChange={e => {
                                    const value = e.target.value;
                                    if (value === '') {
                                        setDuration(undefined);
                                    } else {
                                        const parsed = parseInt(value, 10);
                                        if (!isNaN(parsed)) {
                                            setDuration(parsed);
                                        }
                                    }
                                }}
                                className="movie-form-input w-full mt-2"
                            />
                        </div>
                        <div
                            {...getRootProps()}
                            className="m-4 p-2 dropzone movie-form-dropzone max-w-[20%]"
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
                            const newMovie: Movie = {
                                title,
                                year,
                                description,
                                duration,
                                posterUrl,
                            };
                            handleAddMovie(newMovie).then();
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
        throw ('Movie requires the title');
    } else if (!newMovie.year) {
        throw ('Movie requires the year of production');
    } else if (!newMovie.duration) {
        throw ('Movie requires the duration');
    } else if (!newMovie.posterUrl) {
        throw ('Movie requires the poster');
    }
}
