import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { useState, useEffect } from 'react';

let count = 0;

const fetchMock = (): Promise<string> => {
  count++;

  return new Promise((resolve) => {
    if (count > 3) {
      resolve('finished');
    } else {
      resolve('loading');
    }
  });
};

function PollingPage() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const subscription = interval(1000)
      .pipe(switchMap(() => fetchMock()))
      .subscribe({
        next: (result: string) => {
          if (result === 'finished') {
            subscription.unsubscribe();
            setMessage('Finished');
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
      {!message && !error ? <div>Loading</div> : null}
      {error ? <div>Error</div> : null}
      {message ? <div>{message}</div> : null}
    </div>
  );
}

export default PollingPage;
