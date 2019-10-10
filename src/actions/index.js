import jsonPlaceholder from '../apis/jsonPlaceholder';

const fetchPostsAndUsers = () => async (dispatch, getState) => {
	await dispatch(fetchPosts());
	let userIds = [ ...new Set(getState().posts.map(({ userId }) => userId)) ];
	userIds.forEach((id) => dispatch(fetchUser(id)));
};

const fetchPosts = () => async (dispatch) => {
	const { data } = await jsonPlaceholder.get('/posts');
	dispatch({
		type: 'FETCH_POSTS',
		payload: data
	});
};

const fetchUser = (id) => async (dispatch) => {
	const { data } = await jsonPlaceholder.get(`/users/${id}`);
	dispatch({
		type: 'FETCH_USER',
		payload: data
	});
};

export { fetchPosts, fetchUser, fetchPostsAndUsers };
