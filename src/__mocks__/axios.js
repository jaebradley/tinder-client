const response = { data: { token: 'token' } };
const clientResponseData = 'foobar';
const clientResponse = { data: clientResponseData };

const mockPost = jest.fn();
const mockCreate = jest.fn();
const mockInstanceMethod = jest.fn();

mockPost.mockReturnValue(Promise.resolve(response));
mockCreate.mockReturnValue(Promise.resolve(mockInstanceMethod));
mockInstanceMethod.mockReturnValue(Promise.resolve(clientResponse));

const post = mockPost;
const create = mockCreate;

const axios = {
  post,
  create,
};

export {
  mockPost,
  mockCreate,
  mockInstanceMethod,
  clientResponseData,
};

export default axios;
