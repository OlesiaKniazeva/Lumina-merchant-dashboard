import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const usePagination = (initialPage = 1, initialAdsPerPage = 10) => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const page = Number(queryParams.get('page')) || initialPage;
  const adsPerPage = Number(queryParams.get('adsPerPage')) || initialAdsPerPage;

  const [currentPage, setCurrentPage] = useState(page);
  const [currentAdsPerPage, setCurrentAdsPerPage] = useState(adsPerPage);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', String(currentPage));
    params.set('adsPerPage', String(currentAdsPerPage));
    navigate(`?${params.toString()}`); // Update the URL
  }, [currentPage, currentAdsPerPage, navigate]);

  const handleAdsPerPageChange = (count: number) => {
    setCurrentAdsPerPage(count);
    setCurrentPage(1);
  };

  return {
    page: currentPage,
    adsPerPage: currentAdsPerPage,
    setPage: setCurrentPage,
    handleAdsPerPageChange,
  };
};

export default usePagination;
