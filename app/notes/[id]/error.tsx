'use client';

type Props = {
  error: Error;
};

const ErrorDetailsClient = ({ error }: Props) => {
  return (
    <>
      <p>Could not fetch note details. {error.message}</p>
    </>
  );
};

export default ErrorDetailsClient;
