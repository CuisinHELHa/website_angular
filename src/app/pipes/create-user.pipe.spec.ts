import { CreateUserPipe } from './create-user.pipe';

describe('CreateUserPipe', () => {
  it('create an instance', () => {
    const pipe = new CreateUserPipe();
    expect(pipe).toBeTruthy();
  });
});
