import { MemoryUserRepository } from './implementations/memory-user-repository'

const userRepository = new MemoryUserRepository();

export { userRepository }
