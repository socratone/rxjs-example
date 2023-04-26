import { Observable } from 'rxjs';

const fetchSuccessMock = () => {
  return new Observable((observer) => {
    setTimeout(() => {
      observer.next('ok');
    }, 1000);
  });
};

const fetchErrorMock = () => {
  return new Observable((observer) => {
    setTimeout(() => {
      observer.error('failed');
    }, 1000);
  });
};

const PromisePage = () => {
  const handleSuccessClick = () => {
    const result = fetchSuccessMock();
    result.subscribe((x) => console.log('result:', x));
  };

  const handleErrorClick = () => {
    const result = fetchErrorMock();
    result.subscribe({ error: (error) => console.log('error:', error) });
  };

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <button onClick={handleSuccessClick}>fetch success</button>
      <button onClick={handleErrorClick}>fetch error</button>
    </div>
  );
};

export default PromisePage;
