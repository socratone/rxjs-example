import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { useState, useEffect } from 'react';

let count = 0;

const fetchMock = (): Promise<string> => {
  count++;

  return new Promise((resolve, reject) => {
    if (count > 3) {
      resolve('ok');
    } else {
      resolve('loading');
    }
  });
};

function PollingPage() {
  const [data, setData] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const subscription = interval(1000)
      .pipe(switchMap(() => fetchMock()))
      .subscribe({
        next: (result: string) => {
          if (result === 'ok') {
            subscription.unsubscribe();
            setData(result);
          }
        },
        error: () => {
          setError(true);
        },
      });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      {error && <div>Error</div>}
      {data && <div>Data: {data}</div>}
    </div>
  );
}

export default PollingPage;
