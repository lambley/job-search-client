const repeatElements = (element: any, times: number): any[] => {
  if (element === null || element === undefined || times < 0) {
    return [];
  }

  return Array(times).fill(element);
};

export { repeatElements };
