'use client';

type Props = {
  error: Error;
};

const Error = ({ error }: Props) => {
  return <p>{error.message}</p>;
};

export default Error;
