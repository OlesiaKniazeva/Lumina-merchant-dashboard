import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const usePagination = (initialPage = 1, initialAdsPerPage = 10) => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  const [currentPage, setCurrentPage] = useState(
    Number(queryParams.get('page')) || initialPage,
  );
  const [currentAdsPerPage, setCurrentAdsPerPage] = useState(
    Number(queryParams.get('adsPerPage')) || initialAdsPerPage,
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentParams = new URLSearchParams(location.search);
    const urlPage = Number(currentParams.get('page'));
    const urlAdsPerPage = Number(currentParams.get('adsPerPage'));

    if (urlPage !== currentPage || urlAdsPerPage !== currentAdsPerPage) {
      params.set('page', String(currentPage));
      params.set('adsPerPage', String(currentAdsPerPage));
      navigate(`?${params.toString()}`);
    }
  }, [currentPage, currentAdsPerPage, navigate, location.search]);

  const handleAdsPerPageChange = (count: number) => {
    setCurrentAdsPerPage(count);
    setCurrentPage(1);
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  return {
    page: currentPage,
    adsPerPage: currentAdsPerPage,
    setPage: setCurrentPage,
    handleAdsPerPageChange,
    resetPage,
  };
};

export default usePagination;
