export const loadPageStarted = (start, end) => ({
  type: loadPageStarted,
  start,
  end
});

export const loadPageSucceeded = (data, start, end) => ({
  type: loadPageSucceeded,
  data,
  start,
  end
});

const API_URL = 'https://pokeapi.co/api/v1';
const PAGE_SIZE = 25;

export const loadPage = (start = 0, end = start + PAGE_SIZE) => (
  dispatch,
  getState
) => {
  dispatch(loadPageStarted(start, end));
  fetch(`${API_URL}/pokemon/?limit=${end - start}&offset=${start}`)
    .then(response => response.json())
    .then(data => {
      dispatch(loadPageSucceeded(data.objects, start, end));
    });
};
