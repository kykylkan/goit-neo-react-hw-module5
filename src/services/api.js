import axios from 'axios';

const token = import.meta.env.VITE_TMDB_TOKEN;

export const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

export const withImage = (path) => (path ? `${IMG_BASE}${path}` : null);

// API functions
export const getTrending = async () => {
  const { data } = await tmdb.get('/trending/movie/day?language=en-US');
  return data.results || [];
};

export const searchMovies = async (query) => {
  const { data } = await tmdb.get('/search/movie', {
    params: { query, include_adult: false, language: 'en-US', page: 1 },
  });
  return data.results || [];
};

export const getMovieDetails = async (id) => {
  const { data } = await tmdb.get(`/movie/${id}`, { params: { language: 'en-US' } });
  return data;
};

export const getMovieCredits = async (id) => {
  const { data } = await tmdb.get(`/movie/${id}/credits`, {
    params: { language: 'en-US' },
  });
  return data.cast || [];
};

export const getMovieReviews = async (id) => {
  const { data } = await tmdb.get(`/movie/${id}/reviews`, {
    params: { language: 'en-US', page: 1 },
  });
  return data.results || [];
};
