import React, { useState, useEffect } from 'react';

const CatImageFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchCatImages = async (pageNumber) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=5&page=${pageNumber}&order=Desc`);
      if (!response.ok) throw new Error('Failed to fetch');
      
      const result = await response.json();
      setData(prevData => [...prevData, ...result]); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchCatImages(page);
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {data.map((cat, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <img src={cat.url} alt="cat" style={{ width: '100%', height: 'auto' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatImageFetcher;
